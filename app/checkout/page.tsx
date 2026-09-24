"use client";

import AddressForm from "@/components/checkout/address-form";
import PaymentMethod from "@/components/checkout/payment-method";
import CheckoutOrderSummary from "@/components/checkout/order-summary";
import PlaceOrder from "@/components/checkout/place-order";
import Script from "next/script";

export default function CheckoutPage() {
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
  
      <main className="mx-auto max-w-7xl px-4 py-12">
  
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5B214B]">
            Secure Checkout
          </p>
  
          <h1 className="mt-2 text-5xl font-bold">
            Checkout
          </h1>
  
          <p className="mt-3 text-gray-500">
            Complete your order by filling in your shipping and payment details.
          </p>
        </div>
  
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
  
          <div className="space-y-8">
            <AddressForm />
            <PaymentMethod />
          </div>
  
          <div>
            <CheckoutOrderSummary />
            <PlaceOrder />
          </div>
  
        </div>
  
      </main>
    </>
  );
}