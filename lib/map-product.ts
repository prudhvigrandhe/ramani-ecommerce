import type { Product } from "./types";

type SupabaseProduct = {
  id: number;
  name: string;
  description: string | null;

  price: number;
  original_price: number;

  rating: number;

  image: string;
  image_path: string |null;

  stock: boolean | null;

  category_id: number;

  // Homepage Sections
  is_trending: boolean | null;
  is_best_seller: boolean | null;
  is_new_arrival: boolean | null;

  categories?: {
    id: number;
    name: string;
  } | null;
};

export function mapProduct(product: SupabaseProduct): Product {
  return {
    id: product.id,

    name: product.name,

    description: product.description ?? "",

    category: product.categories?.name ?? "",
    categoryId: product.category_id,

    price: product.price,
    originalPrice: product.original_price,

    rating: Number(product.rating),

    image: product.image,
    image_path: product.image_path ?? "",

    stock: product.stock ?? true,

    // Homepage Sections
    is_trending: product.is_trending ?? false,
    is_best_seller: product.is_best_seller ?? false,
    is_new_arrival: product.is_new_arrival ?? false,

    badge:
      product.original_price > product.price
        ? `${Math.round(
            ((product.original_price - product.price) /
              product.original_price) *
              100
          )}% OFF`
        : undefined,
  };
}