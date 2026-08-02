"use client";

import { Banknote, Smartphone } from "lucide-react";
import { useState } from "react";

export default function PaymentMethod() {
  const [method, setMethod] = useState("cod");

  const options = [
    {
      id: "cod",
      title: "Cash on Delivery",
      icon: <Banknote className="h-5 w-5" />,
    },
    {
      id: "upi",
      title: "UPI Payment",
      icon: <Smartphone className="h-5 w-5" />,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Payment Method
      </h2>

      <div className="space-y-4">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setMethod(option.id)}
            className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
              method === option.id
                ? "border-[#5B214B] bg-[#5B214B]/5"
                : "hover:border-[#5B214B]"
            }`}
          >
            {option.icon}

            <span className="font-medium">
              {option.title}
            </span>
          </button>
        ))}
      </div>

      <input
        type="hidden"
        name="payment_method"
        value={method}
      />
    </div>
  );
}