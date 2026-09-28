import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getOrder(id: number) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}