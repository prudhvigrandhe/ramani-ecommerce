import { supabaseAdmin } from "@/lib/supabase-admin";
import { razorpay } from "@/lib/razorpay";
import { refundPayment } from "@/lib/razorpay-refund";

export async function cancelOrder(
  orderId: number,
  refundReason = "Ramani order cancelled by customer."
) {
  /*
   * Prepare cancellation atomically:
   *
   * - verifies order can be cancelled
   * - restores exact inventory
   * - marks order Cancelled
   * - marks paid orders Refund Pending
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

  /*
   * Already completely refunded.
   */
  if (cancellation?.already_refunded) {
    return {
      cancelled: true,
      refunded: true,
      alreadyRefunded: true,
    };
  }

  /*
   * Load the order after cancellation preparation.
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
   * Unpaid orders don't need a refund.
   */
  if (order.payment_status !== "Refund Pending") {
    return {
      cancelled: true,
      refunded: false,
      alreadyRefunded: false,
    };
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
     * Check Razorpay before issuing a refund.
     *
     * This prevents duplicate refunds if Razorpay already
     * processed the refund but our database update failed.
     */
    const payment =
      await razorpay.payments.fetch(paymentId);

    const originalAmount = Math.round(
      Number(order.total) * 100
    );

    const amountRefunded = Number(
      payment.amount_refunded ?? 0
    );

    const remainingRefundAmount =
      originalAmount - amountRefunded;

    /*
     * Already fully refunded.
     */
    if (remainingRefundAmount <= 0) {
      await markPaymentRefunded(orderId);

      return {
        cancelled: true,
        refunded: true,
        alreadyRefunded: true,
      };
    }

    /*
     * Refund only the remaining amount.
     */
    await refundPayment(
      paymentId,
      remainingRefundAmount,
      refundReason
    );

    /*
     * Confirm Razorpay reflects the complete refund.
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

    return {
      cancelled: true,
      refunded: true,
      alreadyRefunded: false,
    };
  } catch (refundError) {
    console.error(
      "ORDER CANCELLATION REFUND ERROR:",
      refundError
    );

    /*
     * Important:
     *
     * The order remains Cancelled.
     * Inventory has already been restored.
     * Payment remains Refund Pending.
     *
     * Retrying this function is safe because it checks
     * Razorpay's actual refund amount first.
     */
    throw new Error(
      "Order was cancelled and stock was restored, but the refund could not be completed automatically. Please try again."
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
     * Razorpay has already refunded the payment.
     * Never issue another refund.
     */
    throw new Error(
      "Payment was refunded, but the order payment status could not be updated."
    );
  }
}