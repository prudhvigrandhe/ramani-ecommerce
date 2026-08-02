"use client";

import Image from "next/image";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function PaymentQR() {
  const [copied, setCopied] = useState(false);

  const upiId = "ramaniethnics@upi"; // <-- Change to your real UPI ID

  function copyUPI() {
    navigator.clipboard.writeText(upiId);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold">
        Complete Your Payment
      </h2>

      <p className="mt-3 text-gray-500">
        Scan the QR code using any UPI app.
      </p>

      <div className="mt-8 flex justify-center">

        <Image
          src="/images/payment/upi-qr.png"
          alt="UPI QR"
          width={260}
          height={260}
          className="rounded-2xl border"
        />

      </div>

      <div className="mt-8 rounded-xl bg-gray-50 p-4">

        <p className="text-sm text-gray-500">
          UPI ID
        </p>

        <div className="mt-2 flex items-center justify-between">

          <span className="font-semibold">
            {upiId}
          </span>

          <button
            onClick={copyUPI}
            className="flex items-center gap-2 rounded-lg bg-[#5B214B] px-4 py-2 text-white"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>

        </div>

      </div>

      {copied && (
        <p className="mt-4 flex items-center justify-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          UPI ID Copied
        </p>
      )}

      <button className="mt-8 w-full rounded-xl bg-[#5B214B] py-4 font-semibold text-white transition hover:opacity-90">
        I've Completed Payment
      </button>

    </div>
  );
}