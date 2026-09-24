"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";

export async function updateOrderStatus(
  orderId: number,
  newStatus: string
) {
  await requireAdmin();
  console.log("Server Action Running", orderId, newStatus);

  const allowedStatuses = [
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (!allowedStatuses.includes(newStatus)) {
    throw new Error("Invalid order status.");
  }

  const { error } = await supabase
    .from("orders")
    .update({
      order_status: newStatus,
    })
    .eq("id", orderId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/orders");
}