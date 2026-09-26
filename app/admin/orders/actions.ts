"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin/auth";
import { razorpay } from "@/lib/razorpay";
import { refundPayment } from "@/lib/razorpay-refund";

const allowedTransitions: Record<string, string[]> = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Packed", "Cancelled"],
  Packed: ["Shipped"],
  Shipped: ["Delivered"],
  Delivered: [],
  Cancelled: [],
};

export async function updateOrderStatus(
  orderId: number,
  newStatus: string
) {
  await requireAdmin();

  /*
   * Cancellation has special payment + inventory handling.
   */
  if (newStatus === "Cancelled") {
    await cancelOrder(orderId);
    return;
  }

  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("id, order_status")
    .eq("id", orderId)
    .single();

  if (fetchError || !order) {
    throw new Error("Order not found.");
  }

  const currentStatus = order.order_status;

  if (currentStatus === newStatus) {
    return;
  }

  const allowedNextStatuses =
    allowedTransitions[currentStatus];

  if (!allowedNextStatuses) {
    throw new Error("Invalid current order status.");
  }

  if (!allowedNextStatuses.includes(newStatus)) {
    throw new Error(
      `Cannot change order status from ${currentStatus} to ${newStatus}.`
    );
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update({
      order_status: newStatus,
    })
    .eq("id", orderId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidateOrderPaths(orderId);
}

async function cancelOrder(orderId: number) {
  /*
   * Prepare cancellation atomically:
   * - verify cancellable status
   * - restore inventory
   * - mark order Cancelled
   * - mark paid payment Refund Pending
   */
  const { data: cancellation, error: cancellationError } =
    await supabaseAdmin.rpc(
      "prepare_order_cancellation",
      {
        p_order_id: orderId,
      }
    );

  if (cancellationError) {
    console.error(
      "ORDER CANCELLATION PREPARATION ERROR:",
      cancellationError
    );

    const message = cancellationError.message ?? "";

    if (message.includes("ORDER_NOT_CANCELLABLE:")) {
      const currentStatus =
        message.split("ORDER_NOT_CANCELLABLE:")[1];

      throw new Error(
        `Cannot cancel an order with status ${currentStatus}.`
      );
    }

    if (message.includes("ORDER_NOT_FOUND")) {
      throw new Error("Order not found.");
    }

    throw new Error(
      "Unable to prepare order cancellation."
    );
  }

  if (cancellation?.already_refunded) {
    revalidateOrderPaths(orderId);
    return;
  }

  /*
   * Fetch the order after the cancellation preparation.
   */
  const { data: order, error: orderError } =
    await supabaseAdmin
      .from("orders")
      .select(
        "id, order_status, payment_status, total, razorpay_payment_id"
      )
      .eq("id", orderId)
      .single();

  if (orderError || !order) {
    throw new Error(
      "Order was cancelled, but the payment details could not be loaded."
    );
  }

  /*
   * Orders that were never paid do not need a refund.
   */
  if (order.payment_status !== "Refund Pending") {
    revalidateOrderPaths(orderId);
    return;
  }

  const paymentId = order.razorpay_payment_id;

  if (!paymentId) {
    console.error(
      "CANCELLED ORDER HAS NO RAZORPAY PAYMENT ID:",
      orderId
    );

    throw new Error(
      "Order was cancelled, but the payment ID is missing. Please contact support."
    );
  }

  try {
    /*
     * Always ask Razorpay for the current payment state first.
     *
     * This prevents a second refund if the previous refund
     * succeeded but our database update failed.
     */
    const payment = await razorpay.payments.fetch(
      paymentId
    );

    const originalAmount = Math.round(
      Number(order.total) * 100
    );

    const amountRefunded = Number(
      payment.amount_refunded ?? 0
    );

    const remainingRefundAmount =
      originalAmount - amountRefunded;

    /*
     * Razorpay already shows the payment as fully refunded.
     */
    if (remainingRefundAmount <= 0) {
      await markPaymentRefunded(orderId);

      revalidateOrderPaths(orderId);
      return;
    }

    /*
     * Refund only what is still outstanding.
     */
    await refundPayment(
      paymentId,
      remainingRefundAmount,
      "Customer order cancelled by Ramani admin."
    );

    /*
     * Confirm Razorpay actually reflects the refund
     * before updating our database.
     */
    const updatedPayment =
      await razorpay.payments.fetch(paymentId);

    const updatedAmountRefunded = Number(
      updatedPayment.amount_refunded ?? 0
    );

    if (updatedAmountRefunded < originalAmount) {
      throw new Error(
        "Refund was initiated but is not yet fully reflected by Razorpay."
      );
    }

    await markPaymentRefunded(orderId);

    revalidateOrderPaths(orderId);
  } catch (refundError) {
    console.error(
      "ORDER CANCELLATION REFUND ERROR:",
      refundError
    );

    /*
     * The order remains:
     *
     * order_status   = Cancelled
     * payment_status = Refund Pending
     *
     * Inventory has already been restored exactly once.
     *
     * A future retry can safely attempt the refund again.
     */
    throw new Error(
      "Order was cancelled and stock was restored, but the refund could not be completed automatically. Please retry the cancellation refund."
    );
  }
}

async function markPaymentRefunded(orderId: number) {
  const { error } = await supabaseAdmin
    .from("orders")
    .update({
      payment_status: "Refunded",
    })
    .eq("id", orderId)
    .eq("order_status", "Cancelled")
    .eq("payment_status", "Refund Pending");

  if (error) {
    console.error(
      "ORDER REFUNDED STATUS UPDATE ERROR:",
      error
    );

    /*
     * IMPORTANT:
     * Razorpay has already refunded the payment.
     * We must not attempt another refund.
     */
    throw new Error(
      "Payment was refunded, but the order payment status could not be updated."
    );
  }
}

function revalidateOrderPaths(orderId: number) {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/orders");
}