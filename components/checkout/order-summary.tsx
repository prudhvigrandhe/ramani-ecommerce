"use client";

import { useCartStore } from "@/store/cart-store";

export default function CheckoutOrderSummary() {
  const totalItems = useCartStore((state) => state.totalItems());
  const subtotal = useCartStore((state) => state.totalPrice());

  const shipping = subtotal > 0 ? 0 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax + shipping;

  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">
            FREE
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>₹{tax}</span>
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