import type { Product } from "./types";

type SupabaseProduct = {
  id: number;
  name: string;
  description: string | null;

  price: number;
  original_price: number;

  rating: number;

  image: string;
  images: string[] | null;

  stock: boolean | null;
  available_sizes: string[] | null;
  size_stock: Record<string, number> | null;

  fabric: string | null;
  fit: string | null;
  occasion: string | null;
  sleeve: string | null;
  wash_care: string | null;
  color: string | null;
  pattern: string | null;
  sku: string | null;

  category_id: number;

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
    images: product.images ?? [],

    stock: product.stock ?? true,
    availableSizes: product.available_sizes ?? [],
    sizeStock: product.size_stock ?? {},

    fabric: product.fabric ?? "",
    fit: product.fit ?? "",
    occasion: product.occasion ?? "",
    sleeve: product.sleeve ?? "",
    washCare: product.wash_care ?? "",
    color: product.color ?? "",
    pattern: product.pattern ?? "",
    sku: product.sku ?? "",

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