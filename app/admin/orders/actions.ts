"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin/auth";
import { cancelOrder } from "@/lib/orders/cancel-order";

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
   * Cancellation uses the shared cancellation engine.
   */
  if (newStatus === "Cancelled") {
    await cancelOrder(
      orderId,
      "Ramani order cancelled by admin."
    );

    revalidateOrderPaths(orderId);

    return;
  }

  const { data: order, error: fetchError } =
    await supabase
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
    throw new Error(
      "Invalid current order status."
    );
  }

  if (!allowedNextStatuses.includes(newStatus)) {
    throw new Error(
      `Cannot change order status from ${currentStatus} to ${newStatus}.`
    );
  }

  const { error: updateError } =
    await supabase
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

function revalidateOrderPaths(orderId: number) {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/orders");
}