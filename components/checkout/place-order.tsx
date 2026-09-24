"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ORDER_TOKENS_KEY = "ramani-order-tokens";

export default function PlaceOrder() {
  const router = useRouter();

  const cartItems = useCartStore((state) => state.items);
  const removeUnavailableItems = useCartStore(
    (state) => state.removeUnavailableItems
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const checkout = useCheckoutStore();

  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isFormValid =
    hydrated &&
    checkout.customerName.trim().length > 0 &&
    /^[0-9]{10}$/.test(checkout.phone) &&
    checkout.addressLine1.trim().length > 0 &&
    checkout.city.trim().length > 0 &&
    checkout.state.trim().length > 0 &&
    /^[0-9]{6}$/.test(checkout.pincode) &&
    cartItems.length > 0;

  function saveOrderToken(token: string) {
    try {
      const existingRaw = localStorage.getItem(ORDER_TOKENS_KEY);

      let existingTokens: string[] = [];

      if (existingRaw) {
        const parsed = JSON.parse(existingRaw);

        if (Array.isArray(parsed)) {
          existingTokens = parsed.filter(
            (item): item is string => typeof item === "string"
          );
        }
      }

      const updatedTokens = [
        token,
        ...existingTokens.filter((existingToken) => existingToken !== token),
      ].slice(0, 20);

      localStorage.setItem(
        ORDER_TOKENS_KEY,
        JSON.stringify(updatedTokens)
      );
    } catch (error) {
      console.error("Could not save order access token:", error);
    }
  }

  async function handlePlaceOrder() {
    if (loading) return;

    if (!hydrated) {
      toast.error("Please wait a moment and try again.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (
      !checkout.customerName.trim() ||
      !checkout.phone ||
      !checkout.addressLine1.trim() ||
      !checkout.city.trim() ||
      !checkout.state.trim() ||
      !checkout.pincode
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(checkout.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(checkout.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartItems.map((item) => ({
            id: item.id,
            size: item.size,
            quantity: item.quantity,
          })),
          customer: {
            customerName: checkout.customerName,
            phone: checkout.phone,
            email: checkout.email,
            addressLine1: checkout.addressLine1,
            addressLine2: checkout.addressLine2,
            city: checkout.city,
            state: checkout.state,
            pincode: checkout.pincode,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "OUT_OF_STOCK" && data.items) {
          removeUnavailableItems(
            data.items.map((item: any) => ({
              id: item.id,
              size: item.size,
            }))
          );

          toast.error(
            "Some items are no longer available. Your cart has been updated."
          );

          setLoading(false);
          return;
        }

        if (data.error === "INSUFFICIENT_STOCK" && data.items) {
          toast.error(
            "Some items have limited stock available. Please update your cart."
          );

          setLoading(false);
          return;
        }

        throw new Error(data.error || "Unable to start payment.");
      }

      if (!window.Razorpay) {
        throw new Error(
          "Payment system is still loading. Please try again."
        );
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Ramani",
        description: "Ramani Fashion Order",
        order_id: data.razorpayOrderId,

        prefill: {
          name: checkout.customerName,
          email: checkout.email || "",
          contact: checkout.phone,
        },

        notes: {
          customer_name: checkout.customerName,
        },

        theme: {
          color: "#5B214B",
        },

        handler: async function (paymentResponse: any) {
          try {
            toast.info("Payment received. Verifying payment...");

            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,
                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,
                razorpay_signature:
                  paymentResponse.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              console.error(
                "ORDER COMPLETION FAILED:",
                verifyData
              );

              throw new Error(
                verifyData.error ||
                  "Payment was successful, but we could not complete your order."
              );
            }

            if (
              !verifyData.success ||
              !verifyData.completed
            ) {
              throw new Error(
                "Payment was verified, but order completion was not confirmed."
              );
            }

            if (!verifyData.customerAccessToken) {
              console.error(
                "Missing customer access token:",
                verifyData
              );

              throw new Error(
                "Order was created, but we could not secure your order access."
              );
            }

            // Save the private order access token on this device.
            saveOrderToken(verifyData.customerAccessToken);

            clearCart();

            toast.success("Order placed successfully!");

            const orderNumber = verifyData.orderNumber;

            if (orderNumber) {
              router.push(
                `/order-success?order=${encodeURIComponent(
                  orderNumber
                )}`
              );
            } else {
              router.push("/order-success");
            }
          } catch (error: any) {
            console.error(
              "PAYMENT VERIFICATION / ORDER ERROR:",
              error
            );

            toast.error(
              error?.message ||
                "Payment was received, but we could not complete the order. Please contact support."
            );

            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.info("Payment cancelled.");
          },
        },
      };

      const razorpayCheckout = new window.Razorpay(options);

      razorpayCheckout.on(
        "payment.failed",
        function (response: any) {
          console.error(
            "RAZORPAY PAYMENT FAILED:",
            response
          );

          setLoading(false);

          toast.error(
            response?.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpayCheckout.open();
    } catch (error: any) {
      console.error("PAYMENT ERROR:", error);

      toast.error(
        error?.message ||
          "Unable to start payment. Please try again."
      );

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
        {loading ? "Processing Order..." : "Pay & Place Order"}
      </button>

      {!isFormValid && (
        <p className="text-center text-sm text-gray-500">
          Please complete all required fields to place your
          order.
        </p>
      )}
    </div>
  );
}