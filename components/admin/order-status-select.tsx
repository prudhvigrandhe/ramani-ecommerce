"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
  orderId: number;
  currentStatus: string;
};

const statuses = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: Props) {
  const router = useRouter();

  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function updateStatus() {
    if (status === currentStatus) return;

    try {
      setLoading(true);
      setMessage("");

      const { error } = await supabase
        .from("orders")
        .update({
          order_status: status,
        })
        .eq("id", orderId);

      if (error) throw error;

      setMessage("✅ Order status updated successfully!");

      router.refresh();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to update order status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Order Status
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border px-4 py-2 focus:border-[#5B214B] focus:outline-none"
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          onClick={updateStatus}
          disabled={loading || status === currentStatus}
          className="rounded-lg bg-[#5B214B] px-6 py-2 font-semibold text-white transition hover:bg-[#431736] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            message.startsWith("✅")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}