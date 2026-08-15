"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(
  orderId: number,
  newStatus: string
) {
  console.log("Server Action Running", orderId, newStatus);

  // Get current order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("order_status")
    .eq("id", orderId)
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  // Update order status
  const { error: updateError } = await supabase
    .from("orders")
    .update({
      order_status: newStatus,
    })
    .eq("id", orderId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  // Only reduce inventory once
  if (
    order.order_status !== "Confirmed" &&
    newStatus === "Confirmed"
  ) {
    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("product_id, size")
      .eq("order_id", orderId);

    if (itemsError) {
      throw new Error(itemsError.message);
    }

    for (const item of items) {
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("available_sizes")
        .eq("id", item.product_id)
        .single();

      if (productError) continue;

      const updatedSizes = (product.available_sizes || []).filter(
        (size: string) => size !== item.size
      );

      await supabase
        .from("products")
        .update({
          available_sizes: updatedSizes,
        })
        .eq("id", item.product_id);
    }
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath(`/admin/orders/${orderId}`);
}