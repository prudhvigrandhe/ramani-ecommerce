import { supabase } from "@/lib/supabase";

export async function getOrders(search?: string) {
  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (search) {
    query = query.or(
      `order_number.ilike.%${search}%,customer_name.ilike.%${search}%,phone.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}