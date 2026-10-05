"use client";

import { useEffect } from "react";

import CartItemCard from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import EmptyCart from "@/components/cart/empty-cart";
import { useCartStore } from "@/store/cart-store";
import { getProduct } from "@/lib/get-product";

export default function CartPage() {
  const items = useCartStore(
    (state) => state.items
  );

  const syncProducts = useCartStore(
    (state) => state.syncProducts
  );

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const productIds = [
      ...new Set(
        items.map((item) => item.id)
      ),
    ];

    let cancelled = false;

    async function syncCartProducts() {
      const products = await Promise.all(
        productIds.map((id) => getProduct(id))
      );

      if (cancelled) {
        return;
      }

      const availableProducts =
        products.filter(
          (product): product is NonNullable<
            typeof product
          > => product !== null
        );

      if (availableProducts.length > 0) {
        syncProducts(availableProducts);
      }
    }

    syncCartProducts();

    return () => {
      cancelled = true;
    };
  }, [items, syncProducts]);

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