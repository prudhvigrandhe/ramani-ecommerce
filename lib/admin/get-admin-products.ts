import { supabase } from "@/lib/supabase";
import { mapProduct } from "@/lib/map-product";

const PAGE_SIZE = 10;

export async function getAdminProducts(page: number = 1) {
  const safePage = Math.max(1, page);

  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("products")
    .select(
      `
      *,
      categories(name)
      `,
      { count: "exact" }
    )
    .order("id")
    .range(from, to);

  if (error) {
    console.error(error);

    return {
      products: [],
      totalProducts: 0,
      totalPages: 1,
      currentPage: safePage,
    };
  }

  const products = data.map((product) => ({
    ...mapProduct(product),
    category: product.categories?.name ?? "",
  }));

  const totalProducts = count ?? 0;
  const totalPages = Math.max(
    1,
    Math.ceil(totalProducts / PAGE_SIZE)
  );

  return {
    products,
    totalProducts,
    totalPages,
    currentPage: safePage,
  };
}