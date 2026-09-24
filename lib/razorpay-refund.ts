import { razorpay } from "@/lib/razorpay";

export async function refundPayment(
  paymentId: string,
  amount: number
) {
  return razorpay.payments.refund(paymentId, {
    amount,
    notes: {
      reason:
        "Ramani order could not be completed because stock became unavailable.",
    },
  });
}