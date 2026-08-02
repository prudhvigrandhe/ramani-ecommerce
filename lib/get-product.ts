import { supabase } from "./supabase";
import { mapProduct } from "./map-product";

export async function getProduct(id: number) {
  const { data, error } = await supabase
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