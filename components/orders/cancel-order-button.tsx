"use client";

import { useState } from "react";

type Props = {
  orderId: number;
  token: string;
  orderStatus: string;
  onCancelled: () => void;
};

export default function CancelOrderButton({
  orderId,
  token,
  orderStatus,
  onCancelled,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const canCancel =
    orderStatus === "Pending" ||
    orderStatus === "Confirmed";

  if (!canCancel) {
    return null;
  }

  async function handleCancel() {
    const confirmed = window.confirm(
      "Cancel this order?\n\n" +
        "If payment was completed, Ramani will refund your payment.\n" +
        "The order cannot be restored after cancellation.\n\n" +
        "Continue?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "/api/orders/cancel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            token,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to cancel your order."
        );
      }

      setMessage(
        data.refunded
          ? "Order cancelled and payment refunded."
          : "Order cancelled successfully."
      );

      onCancelled();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to cancel your order."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleCancel}
        disabled={loading}
        className="rounded-xl border border-red-600 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Cancelling..."
          : "Cancel Order"}
      </button>

      {message && (
        <p
          className={`mt-3 text-sm font-medium ${
            message.includes("refunded") ||
            message.includes("successfully")
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