"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import WishlistButton from "@/components/ui/wishlist-button";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  let badge = null;

if (product.availableSizes.length === 0) {
  badge = {
    text: "OUT OF STOCK",
    className: "bg-red-600 text-white",
  };
} else if (product.is_best_seller) {
  badge = {
    text: "BEST SELLER",
    className: "bg-amber-100 text-amber-700 border border-amber-300",
  };
} else if (product.is_new_arrival) {
  badge = {
    text: "NEW",
    className: "bg-blue-100 text-blue-700 border border-blue-300",
  };
} else if (product.is_trending) {
  badge = {
    text: "TRENDING",
    className: "bg-orange-100 text-orange-700 border border-orange-300",
  };
}

  return (
    <Link
      href={`/products/${product.id}`}
      className="block"
    >
      <div className="group overflow-hidden rounded-3xl border bg-white shadow-md transition duration-300 hover:-translate-y-3 hover:shadow-2xl">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px)50vw,25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">

<div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium shadow-lg md:px-5 md:py-3">
  <Eye className="h-5 w-5" />
  View Details
</div>

</div>
  
<div className="absolute right-2 top-2 md:right-3 md:top-3">
  <WishlistButton product={product} />
</div>
  
{badge ? (
  <span
    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shadow-md ${badge.className}`}
  >
    {badge.text}
  </span>
) : (
  <span className="absolute left-2 top-2 rounded-full bg-[#5B214B] px-3 py-1 text-xs font-semibold text-white shadow-lg md:left-3 md:top-3">
    {discount}% OFF
  </span>
)}
        </div>
  
        <div className="space-y-2 p-3 md:p-5">
        <p className="text-xs text-gray-500 md:text-sm">
            {product.category}
          </p>
  
          <h3 className="line-clamp-2 text-sm font-semibold md:text-base">
            {product.name}
          </h3>
  
          <div className="flex items-center gap-2">
          <span className="text-base font-bold md:text-lg">
              ₹{product.price}
            </span>
  
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          </div>
  
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500" />
              <span className="text-sm">
                {product.rating}
              </span>
            </div>
  
            <button
  disabled={product.availableSizes.length === 0}
  onClick={(e) => e.preventDefault()}
  className={`rounded-full p-2 text-white transition md:p-3 ${
    product.availableSizes.length === 0
      ? "cursor-not-allowed bg-gray-400"
      : "bg-[#5B214B] hover:bg-[#431736]"
  }`}
>
  <ShoppingBag className="h-5 w-5" />
</button>
          </div>
        </div>
      </div>
    </Link>
  );
}