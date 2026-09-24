import { supabase } from "@/lib/supabase";

export async function getDashboardStats() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, customer_name, total, payment_status, order_status, created_at"
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Failed to fetch dashboard orders:", error);
    throw new Error(error.message);
  }

  const allOrders = orders ?? [];

  const totalOrders = allOrders.length;

  const totalRevenue = allOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const pendingOrders = allOrders.filter(
    (order) => order.order_status === "Pending"
  ).length;

  const deliveredOrders = allOrders.filter(
    (order) => order.order_status === "Delivered"
  ).length;

  const recentOrders = allOrders.slice(0, 5);

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    deliveredOrders,
    recentOrders,
  };
}