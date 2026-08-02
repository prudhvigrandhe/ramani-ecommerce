import { supabase } from "./supabase";
import { mapProduct } from "./map-product";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories(name)
    `
    )
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((product) => ({
    ...mapProduct(product),
    category: product.categories?.name ?? "",
  }));
}