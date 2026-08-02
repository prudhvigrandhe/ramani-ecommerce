"use client";

import { useCheckoutStore } from "@/store/checkout-store";

export default function AddressForm() {
  const {
    customerName,
    phone,
    email,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    setField,
  } = useCheckoutStore();

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Shipping Address
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <input
          type="text"
          placeholder="Full Name"
          value={customerName}
          onChange={(e) => setField("customerName", e.target.value)}
          required
          className="rounded-xl border p-3 outline-none focus:border-[#5B214B]"
        />

<input
  type="tel"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) =>
    setField(
      "phone",
      e.target.value.replace(/\D/g, "").slice(0, 10)
    )
  }
  maxLength={10}
  required
  className="rounded-xl border p-3 outline-none focus:border-[#5B214B]"
/>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setField("email", e.target.value)}
          className="rounded-xl border p-3 outline-none focus:border-[#5B214B] md:col-span-2"
        />

        <input
          type="text"
          placeholder="House No, Street, Area"
          value={addressLine1}
          onChange={(e) => setField("addressLine1", e.target.value)}
          required
          className="rounded-xl border p-3 outline-none focus:border-[#5B214B] md:col-span-2"
        />

        <input
          type="text"
          placeholder="Apartment, Landmark (Optional)"
          value={addressLine2}
          onChange={(e) => setField("addressLine2", e.target.value)}
          className="rounded-xl border p-3 outline-none focus:border-[#5B214B] md:col-span-2"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setField("city", e.target.value)}
          required
          className="rounded-xl border p-3 outline-none focus:border-[#5B214B]"
        />

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setField("state", e.target.value)}
          required
          className="rounded-xl border p-3 outline-none focus:border-[#5B214B]"
        />

<input
  type="text"
  inputMode="numeric"
  placeholder="Pincode"
  value={pincode}
  onChange={(e) =>
    setField(
      "pincode",
      e.target.value.replace(/\D/g, "").slice(0, 6)
    )
  }
  maxLength={6}
  required
  className="rounded-xl border p-3 outline-none focus:border-[#5B214B]"
/>

      </div>
    </div>
  );
}