import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        {
          error: "Order access token is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Find the order using the private access token.
     *
     * We do NOT search by phone number.
     */
    const { data: order, error: orderError } =
      await supabaseAdmin
        .from("orders")
        .select(
          `
          id,
          created_at,
          customer_name,
          phone,
          email,
          address_line1,
          address_line2,
          city,
          state,
          pincode,
          subtotal,
          shipping,
          tax,
          total,
          payment_method,
          payment_status,
          order_status,
          order_number,
          razorpay_order_id,
          razorpay_payment_id
        `
        )
        .eq("customer_access_token", token)
        .maybeSingle();

    if (orderError) {
      console.error(
        "ORDER LOOKUP ERROR:",
        orderError
      );

      return NextResponse.json(
        {
          error: "Unable to find your order.",
        },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          error: "Order not found.",
        },
        { status: 404 }
      );
    }

    /*
     * Get the products belonging to this order.
     */
    const { data: orderItems, error: itemsError } =
      await supabaseAdmin
        .from("order_items")
        .select(
          `
          id,
          product_id,
          product_name,
          product_image,
          price,
          quantity,
          size,
          subtotal
        `
        )
        .eq("order_id", order.id)
        .order("id", { ascending: true });

    if (itemsError) {
      console.error(
        "ORDER ITEMS LOOKUP ERROR:",
        itemsError
      );

      return NextResponse.json(
        {
          error: "Unable to load order items.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,

      order: {
        ...order,
        items: orderItems ?? [],
      },
    });
  } catch (error) {
    console.error(
      "ORDER LOOKUP API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to load order.",
      },
      { status: 500 }
    );
  }
}