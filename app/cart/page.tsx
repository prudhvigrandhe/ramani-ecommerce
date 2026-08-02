"use client";

import CartItemCard from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import EmptyCart from "@/components/cart/empty-cart";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Shopping Cart
        </h1>

        <p className="mt-2 text-gray-500">
          Review your selected items before checkout.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

        <div className="space-y-6">
          {items.map((item) => (
            <CartItemCard
              key={`${item.id}-${item.size}`}
              item={item}
            />
          ))}
        </div>

        <CartSummary />

      </div>
    </main>
  );
}