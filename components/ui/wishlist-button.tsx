"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import { Product } from "@/lib/types";
import { useWishlistStore } from "@/store/wishlist-store";

type Props = {
  product: Product;
  className?: string;
};

export default function WishlistButton({
  product,
  className = "",
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist
  );

  const isWishlisted = useWishlistStore((state) =>
    state.isWishlisted(product.id)
  );

  if (!mounted) {
    return (
      <button
        type="button"
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ${className}`}
      >
        <Heart className="h-5 w-5 text-gray-600" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        toggleWishlist(product);
      }}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 ${className}`}
    >
      <Heart
        className={`h-5 w-5 transition ${
          isWishlisted
            ? "fill-red-500 text-red-500"
            : "text-gray-600"
        }`}
      />
    </button>
  );
}