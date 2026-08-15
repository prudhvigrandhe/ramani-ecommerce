import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Checkout Request:", body);

    // Temporary amount (₹100)
    // We'll replace this with the calculated cart total next.
    const amount = 100 * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to create Razorpay order",
      },
      {
        status: 500,
      }
    );
  }
}