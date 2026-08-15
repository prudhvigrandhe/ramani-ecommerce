"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { placeOrder } from "@/lib/orders/place-order";

import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { toast } from "sonner";

export default function PlaceOrder() {
  const router = useRouter();

  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

const removeUnavailableItems = useCartStore(
  (state) => state.removeUnavailableItems
);

  const checkout = useCheckoutStore();

  const [loading, setLoading] = useState(false);

  const isFormValid =
    checkout.customerName.trim().length > 0 &&
    /^[0-9]{10}$/.test(checkout.phone) &&
    checkout.addressLine1.trim().length > 0 &&
    checkout.city.trim().length > 0 &&
    checkout.state.trim().length > 0 &&
    /^[0-9]{6}$/.test(checkout.pincode) &&
    cartItems.length > 0;

  async function handlePlaceOrder() {
    if (loading) return;

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !checkout.customerName ||
      !checkout.phone ||
      !checkout.addressLine1 ||
      !checkout.city ||
      !checkout.state ||
      !checkout.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(checkout.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(checkout.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      const result = await placeOrder(checkout, cartItems);

      clearCart();
      checkout.reset();

      router.push(`/order-success?order=${result.orderNumber}`);
    } catch (error: any) {
        console.error(error);
      
        if (
          error.message === "OUT_OF_STOCK"
        ) {
          removeUnavailableItems(
            error.items.map((item: any) => ({
              id: item.id,
              size: item.size,
            }))
          );
      
          toast.error(
            "Some items were removed because they are no longer available."
          );
      
          return;
        }
      
        toast.error(
          error.message || "Failed to place order."
        );
      }finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <button
        onClick={handlePlaceOrder}
        disabled={loading || !isFormValid}
        className="w-full rounded-xl bg-[#5B214B] py-4 font-semibold text-white transition hover:bg-[#431736] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>

      {!isFormValid && (
        <p className="text-center text-sm text-gray-500">
          Please complete all required fields to place your order.
        </p>
      )}
    </div>
  );
}