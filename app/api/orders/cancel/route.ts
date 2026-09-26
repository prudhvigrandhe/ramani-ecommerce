import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { cancelOrder } from "@/lib/orders/cancel-order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const orderId = Number(body.orderId);
    const token = body.token;

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        {
          error: "Invalid order.",
        },
        { status: 400 }
      );
    }

    if (
      typeof token !== "string" ||
      !token.trim()
    ) {
      return NextResponse.json(
        {
          error: "Order access token is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Verify that this private token actually belongs
     * to the requested order.
     */
    const { data: order, error: orderError } =
      await supabaseAdmin
        .from("orders")
        .select(
          "id, order_status, customer_access_token"
        )
        .eq("id", orderId)
        .eq("customer_access_token", token)
        .maybeSingle();

    if (orderError) {
      console.error(
        "CUSTOMER CANCELLATION LOOKUP ERROR:",
        orderError
      );

      return NextResponse.json(
        {
          error: "Unable to verify your order.",
        },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          error:
            "You are not authorized to cancel this order.",
        },
        { status: 403 }
      );
    }

    /*
     * Explicitly check the customer-facing rule
     * before starting the cancellation process.
     */
    if (
      order.order_status !== "Pending" &&
      order.order_status !== "Confirmed"
    ) {
      return NextResponse.json(
        {
          error:
            `This order cannot be cancelled because it is already ${order.order_status}.`,
        },
        { status: 409 }
      );
    }

    const result = await cancelOrder(
      orderId,
      "Ramani order cancelled by customer."
    );

    return NextResponse.json({
      success: true,
      cancelled: result.cancelled,
      refunded: result.refunded,
      alreadyRefunded: result.alreadyRefunded,
    });
  } catch (error) {
    console.error(
      "CUSTOMER ORDER CANCELLATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to cancel your order.",
      },
      { status: 500 }
    );
  }
}