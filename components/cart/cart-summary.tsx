"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export default function CartSummary() {
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());

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
          <span>₹{totalPrice}</span>
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
          <span>₹{totalPrice}</span>
        </div>

      </div>

      <Link
        href="/checkout"
        className="mt-8 block rounded-xl bg-[#5B214B] py-4 text-center font-semibold text-white transition hover:bg-[#431736]"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}