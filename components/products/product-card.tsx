"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Product } from "@/lib/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
    const [liked, setLiked] = useState(false);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

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
  
  <button
  onClick={(e) => {
    e.preventDefault();
    setLiked(!liked);
  }}
  className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow transition hover:scale-110 md:right-3 md:top-3 md:p-2"
>
  <Heart
    className={`h-5 w-5 transition ${
      liked
        ? "fill-red-500 text-red-500"
        : "text-gray-700"
    }`}
  />
</button>
  
          <span className="absolute left-2 top-2 rounded-full bg-[#5B214B] px-2 py-1 text-[10px] font-semibold text-white md:left-3 md:top-3 md:px-3 md:text-xs">
            {discount}% OFF
          </span>
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
              onClick={(e) => e.preventDefault()}
              className="rounded-full bg-[#5B214B] p-2 text-white transition hover:bg-[#431736] md:p-3"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}