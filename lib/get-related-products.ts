import { supabase } from "./supabase";
import { mapProduct } from "./map-product";

export async function getRelatedProducts(
  category: string,
  currentId: number
) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories(name)
      `
    );

  if (error) {
    console.error(error);
    return [];
  }

  return data
    .map((product) => ({
      ...mapProduct(product),
      category: product.categories?.name ?? "",
    }))
    .filter(
      (product) =>
        product.category === category &&
        product.id !== currentId
    )
    .slice(0, 4);
}