"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/app/admin/orders/actions";

type Props = {
  orderId: number;
  currentStatus: string;
};

const allowedTransitions: Record<string, string[]> = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Packed", "Cancelled"],
  Packed: ["Shipped"],
  Shipped: ["Delivered"],
  Delivered: [],
  Cancelled: [],
};

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: Props) {
  const router = useRouter();

  const availableStatuses =
    allowedTransitions[currentStatus] ?? [];

  const [status, setStatus] = useState(
    availableStatuses[0] ?? currentStatus
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const canUpdate = availableStatuses.length > 0;
  const isCancelling = status === "Cancelled";

  async function handleSave() {
    if (!canUpdate || status === currentStatus) {
      return;
    }

    if (isCancelling) {
      const confirmed = window.confirm(
        "Cancel this order?\n\n" +
          "If the order has been paid, Ramani will attempt to refund the payment.\n" +
          "The purchased inventory will also be restored.\n\n" +
          "Continue?"
      );

      if (!confirmed) {
        return;
      }
    }

    try {
      setLoading(true);
      setMessage("");

      await updateOrderStatus(orderId, status);

      if (isCancelling) {
        setMessage(
          "✅ Order cancelled. Refund processed successfully."
        );
      } else {
        setMessage(
          "✅ Order status updated successfully!"
        );
      }

      router.refresh();

      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ Failed to update order status."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Order Status
      </h2>

      {!canUpdate ? (
        <p className="text-sm text-gray-500">
          This order has reached its final status.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-4 sm:flex-row">
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              disabled={loading}
              className="rounded-lg border px-4 py-2 focus:border-[#5B214B] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              {availableStatuses.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            <button
              onClick={handleSave}
              disabled={loading}
              className={`rounded-lg px-6 py-2 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                isCancelling
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#5B214B] hover:bg-[#431736]"
              }`}
            >
              {loading
                ? "Processing..."
                : isCancelling
                  ? "Cancel Order"
                  : "Save"}
            </button>
          </div>

          {isCancelling && (
            <p className="mt-3 text-sm text-red-600">
              Cancelling a paid order will attempt to
              refund the payment and restore inventory.
            </p>
          )}

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
        </>
      )}
    </div>
  );
}