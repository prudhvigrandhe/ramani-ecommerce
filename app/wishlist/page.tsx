"use client";

import Link from "next/link";

import ProductGrid from "@/components/products/product-grid";
import { useWishlistStore } from "@/store/wishlist-store";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500">
            {items.length} item
            {items.length !== 1 && "s"} saved
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-24">
          <div className="text-6xl">
            ❤️
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            Your wishlist is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Save your favourite products here.
          </p>

          <Link
            href="/products"
            className="mt-8 rounded-xl bg-[#5B214B] px-6 py-3 font-medium text-white transition hover:bg-[#431736]"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </main>
  );
}