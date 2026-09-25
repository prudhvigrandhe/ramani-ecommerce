"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import WishlistButton from "@/components/ui/wishlist-button";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  /*
   * Only sizes with actual stock should be considered
   * available for the quick-add bag button.
   */
  const inStockSizes = Object.entries(product.sizeStock ?? {})
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

  const handleQuickAdd = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    /*
     * If there is only one possible size,
     * add it directly to the cart.
     */
    if (inStockSizes.length === 1) {
      const size = inStockSizes[0];

      addToCart(product, 1, size);

      toast.success(
        `${product.name} added to cart`
      );

      return;
    }

    /*
     * Multiple sizes available:
     * customer needs to choose a size first.
     */
    router.push(`/products/${product.id}`);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="block"
    >
      <div className="group overflow-hidden rounded-2xl border bg-white shadow-md transition duration-300 hover:-translate-y-3 hover:shadow-2xl sm:rounded-3xl">

        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:640px)50vw,(max-width:768px)50vw,25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {/* View Details - Desktop */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">

            <div className="hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium shadow-lg sm:flex">
              <Eye className="h-5 w-5" />
              View Details
            </div>

          </div>

          {/* Wishlist */}
          <div className="absolute right-1.5 top-1.5 sm:right-3 sm:top-3">
            <WishlistButton product={product} />
          </div>

          {/* Badge */}
          {badge ? (
            <span
              className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[9px] font-bold tracking-wide shadow-md sm:left-3 sm:top-3 sm:px-3 sm:text-[11px] ${badge.className}`}
            >
              {badge.text}
            </span>
          ) : (
            <span className="absolute left-2 top-2 rounded-full bg-[#5B214B] px-2 py-1 text-[10px] font-semibold text-white shadow-lg sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
              {discount}% OFF
            </span>
          )}

        </div>

        {/* Product Details */}
        <div className="space-y-1.5 p-2.5 sm:space-y-2 sm:p-5">

          <p className="text-[10px] text-gray-500 sm:text-sm">
            {product.category}
          </p>

          <h3 className="line-clamp-2 text-xs font-semibold sm:text-base">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-sm font-bold sm:text-lg">
              ₹{product.price}
            </span>

            <span className="text-[10px] text-gray-400 line-through sm:text-sm">
              ₹{product.originalPrice}
            </span>
          </div>

          <div className="flex items-center justify-between">

            {/* Rating */}
            <div className="flex items-center gap-0.5 text-yellow-500 sm:gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-500 sm:h-4 sm:w-4" />

              <span className="text-xs sm:text-sm">
                {product.rating}
              </span>
            </div>

            {/* Quick Add To Cart */}
            <button
              type="button"
              disabled={!hasStock}
              onClick={handleQuickAdd}
              aria-label={
                !hasStock
                  ? "Out of stock"
                  : inStockSizes.length === 1
                  ? "Add to cart"
                  : "Select size"
              }
              className={`rounded-full p-1.5 text-white transition sm:p-3 ${
                !hasStock
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[#5B214B] hover:bg-[#431736]"
              }`}
            >
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

          </div>
        </div>
      </div>
    </Link>
  );
}