import { supabaseAdmin } from "@/lib/supabase-admin";
import { mapProduct } from "@/lib/map-product";

export async function getAdminProduct(id: number) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      `
      *,
      categories(name)
      `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    ...mapProduct(data),
    category: data.categories?.name ?? "",
  };
}