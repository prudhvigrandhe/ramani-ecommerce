"use client";

import { CreditCard } from "lucide-react";

export default function PaymentMethod() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Payment Method
      </h2>

      <div className="flex items-center gap-4 rounded-xl border border-[#5B214B] bg-[#5B214B]/5 p-4">
        <CreditCard className="h-5 w-5 text-[#5B214B]" />

        <div>
          <p className="font-medium">
            Online Payment
          </p>

          <p className="mt-1 text-sm text-gray-500">
            UPI, Credit Card, Debit Card, Net Banking & Wallets
          </p>
        </div>
      </div>
    </div>
  );
}