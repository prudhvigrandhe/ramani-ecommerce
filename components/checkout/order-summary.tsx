"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutOrderSummary() {
  const totalItems = useCartStore((state) => state.totalItems());
  const subtotal = useCartStore((state) => state.totalPrice());

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const displayedItems = hydrated ? totalItems : 0;
  const displayedSubtotal = hydrated ? subtotal : 0;

  const shipping = 0;
  const tax = 0;
  const total = displayedSubtotal + shipping + tax;

  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{displayedItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{displayedSubtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">
            FREE
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
}