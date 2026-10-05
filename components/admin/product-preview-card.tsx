"use client";

import { Star } from "lucide-react";
import { Product } from "@/lib/types";

type Props = {
  product: Product;
};

export default function ProductPreviewCard({
  product,
}: Props) {
  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const inStockSizes = Object.entries(
    product.sizeStock ?? {}
  )
    .filter(([, stock]) => Number(stock) > 0)
    .map(([size]) => size);

  const hasStock = inStockSizes.length > 0;

  let badge = null;

  if (!hasStock) {
    badge = {
      text: "OUT OF STOCK",
      className: "bg-red-600 text-white",
    };
  } else if (product.is_best_seller) {
    badge = {
      text: "BEST SELLER",
      className:
        "bg-amber-100 text-amber-700 border border-amber-300",
    };
  } else if (product.is_new_arrival) {
    badge = {
      text: "NEW",
      className:
        "bg-blue-100 text-blue-700 border border-blue-300",
    };
  } else if (product.is_trending) {
    badge = {
      text: "TRENDING",
      className:
        "bg-orange-100 text-orange-700 border border-orange-300",
    };
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Product Preview
        </p>

        <p className="mt-1 text-sm text-gray-500">
          How this product currently appears in the store.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-md">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}

          {/* Badge */}
          {badge ? (
            <span
              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shadow-md ${badge.className}`}
            >
              {badge.text}
            </span>
          ) : (
            <span className="absolute left-3 top-3 rounded-full bg-[#5B214B] px-3 py-1 text-xs font-semibold text-white shadow-lg">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-3 p-5">
          <p className="text-sm text-gray-500">
            {product.category}
          </p>

          <h3 className="text-lg font-semibold">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              ₹{product.price}
            </span>

            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />

            <span className="text-sm">
              {product.rating}
            </span>
          </div>

          {/* Available Sizes */}
          {inStockSizes.length > 0 && (
            <div className="pt-2">
              <p className="mb-2 text-xs font-semibold text-gray-500">
                Available Sizes
              </p>

              <div className="flex flex-wrap gap-2">
                {inStockSizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-lg border px-3 py-1.5 text-xs font-medium"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!hasStock && (
            <p className="pt-2 text-sm font-semibold text-red-600">
              Currently out of stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}