import { NextRequest, NextResponse } from "next/server";

import { razorpay } from "@/lib/razorpay";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

type CartItemRequest = {
  id: number;
  size: string;
  quantity: number;
};

type CustomerDetails = {
  customerName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cartItems: CartItemRequest[] = body.cartItems;
    const customer: CustomerDetails = body.customer;

    /*
     * 1. Basic validation
     */
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!customer) {
      return NextResponse.json(
        { error: "Customer details are required" },
        { status: 400 }
      );
    }

    /*
 * Validate customer details on the server.
 *
 * Frontend validation is helpful for UX, but it cannot
 * be trusted for API security because requests can be
 * sent directly to this endpoint.
 */
if (
    typeof customer.customerName !== "string" ||
    !customer.customerName.trim()
  ) {
    return NextResponse.json(
      { error: "Customer name is required." },
      { status: 400 }
    );
  }
  
  if (
    typeof customer.phone !== "string" ||
    !/^[0-9]{10}$/.test(customer.phone)
  ) {
    return NextResponse.json(
      { error: "Please enter a valid 10-digit phone number." },
      { status: 400 }
    );
  }
  
  if (
    typeof customer.addressLine1 !== "string" ||
    !customer.addressLine1.trim()
  ) {
    return NextResponse.json(
      { error: "Address is required." },
      { status: 400 }
    );
  }
  
  if (
    typeof customer.city !== "string" ||
    !customer.city.trim()
  ) {
    return NextResponse.json(
      { error: "City is required." },
      { status: 400 }
    );
  }
  
  if (
    typeof customer.state !== "string" ||
    !customer.state.trim()
  ) {
    return NextResponse.json(
      { error: "State is required." },
      { status: 400 }
    );
  }
  
  if (
    typeof customer.pincode !== "string" ||
    !/^[0-9]{6}$/.test(customer.pincode)
  ) {
    return NextResponse.json(
      { error: "Please enter a valid 6-digit pincode." },
      { status: 400 }
    );
  }

    /*
     * 2. Validate every cart item.
     */
    for (const item of cartItems) {
      if (
        !Number.isInteger(item.id) ||
        !item.size ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return NextResponse.json(
          { error: "Invalid cart item" },
          { status: 400 }
        );
      }
    }

    /*
     * 3. Normalize duplicate product + size entries.
     *
     * Example:
     *
     * Product 123 / M / Qty 1
     * Product 123 / M / Qty 1
     *
     * becomes:
     *
     * Product 123 / M / Qty 2
     *
     * This prevents duplicate cart entries from bypassing
     * the size-specific stock check.
     */
    const normalizedCartMap = new Map<
      string,
      CartItemRequest
    >();

    for (const item of cartItems) {
      const key = `${item.id}::${item.size}`;

      const existing = normalizedCartMap.get(key);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        normalizedCartMap.set(key, {
          id: item.id,
          size: item.size,
          quantity: item.quantity,
        });
      }
    }

    const normalizedCartItems = Array.from(
      normalizedCartMap.values()
    );

    /*
     * 4. Get UNIQUE product IDs.
     *
     * Example:
     *
     * XS × 1 -> product 123
     * L  × 1 -> product 123
     *
     * becomes:
     *
     * [123]
     */
    const productIds = [
      ...new Set(
        normalizedCartItems.map((item) => item.id)
      ),
    ];

    /*
     * 5. Fetch the actual products from Supabase.
     *
     * Prices and stock are always taken from the
     * database, never trusted from the browser.
     */
    const { data: products, error: productsError } =
      await supabase
        .from("products")
        .select(
          "id, name, price, image, available_sizes, size_stock"
        )
        .in("id", productIds);

    if (productsError) {
      console.error(
        "PRODUCT FETCH ERROR:",
        productsError
      );

      return NextResponse.json(
        {
          error: "Unable to verify products",
        },
        { status: 500 }
      );
    }

    /*
     * 6. Make sure every UNIQUE product exists.
     */
    if (
      !products ||
      products.length !== productIds.length
    ) {
      return NextResponse.json(
        {
          error:
            "One or more products are no longer available.",
        },
        { status: 400 }
      );
    }

    let subtotal = 0;

    const verifiedItems = [];

    /*
     * 7. Validate each normalized cart item independently.
     *
     * The same product can still appear multiple times
     * when different sizes are selected.
     */
    for (const item of normalizedCartItems) {
      const product = products.find(
        (product) => product.id === item.id
      );

      if (!product) {
        return NextResponse.json(
          {
            error:
              "One or more products are no longer available.",
          },
          { status: 400 }
        );
      }

      /*
       * Check whether this size actually exists
       * for the product.
       */
      const availableSizes =
        product.available_sizes || [];

      if (!availableSizes.includes(item.size)) {
        return NextResponse.json(
          {
            error: "SIZE_NOT_AVAILABLE",
            items: [
              {
                id: product.id,
                size: item.size,
                name: product.name,
              },
            ],
          },
          { status: 400 }
        );
      }

      /*
       * Get current stock for this particular size.
       */
      const sizeStock = product.size_stock || {};

      const availableStock = Number(
        sizeStock[item.size] ?? 0
      );

      /*
       * Size has no stock.
       */
      if (availableStock <= 0) {
        return NextResponse.json(
          {
            error: "OUT_OF_STOCK",
            items: [
              {
                id: product.id,
                size: item.size,
                name: product.name,
                availableStock: 0,
              },
            ],
          },
          { status: 400 }
        );
      }

      /*
       * Requested quantity is greater than stock.
       */
      if (item.quantity > availableStock) {
        return NextResponse.json(
          {
            error: "INSUFFICIENT_STOCK",
            items: [
              {
                id: product.id,
                size: item.size,
                name: product.name,
                requestedQuantity: item.quantity,
                availableStock,
              },
            ],
          },
          { status: 400 }
        );
      }

      /*
       * IMPORTANT:
       *
       * Price comes from Supabase.
       * We never trust the cart price.
       */
      const price = Number(product.price);

      subtotal += price * item.quantity;

      verifiedItems.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price,
        quantity: item.quantity,
        size: item.size,
      });
    }

    /*
     * 8. Calculate final order amount.
     */
    const shipping = 0;
    const tax = 0;
    const total = subtotal + shipping + tax;

    if (total <= 0) {
      return NextResponse.json(
        {
          error: "Invalid order amount",
        },
        { status: 400 }
      );
    }

    /*
     * Razorpay expects amount in paise.
     */
    const amountInPaise = Math.round(total * 100);

    /*
     * 9. Create Razorpay order.
     */
    const razorpayOrder =
      await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `ramani_${Date.now()}`,
        notes: {
          item_count: String(
            verifiedItems.length
          ),
        },
      });

    /*
     * 10. Save payment attempt.
     */
    const { error: attemptError } =
      await supabaseAdmin
        .from("payment_attempts")
        .insert({
          razorpay_order_id: razorpayOrder.id,

          amount: amountInPaise,

          currency: "INR",

          customer: {
            customerName:
              customer.customerName,

            phone: customer.phone,

            email: customer.email || "",

            addressLine1:
              customer.addressLine1,

            addressLine2:
              customer.addressLine2 || "",

            city: customer.city,

            state: customer.state,

            pincode: customer.pincode,
          },

          items: verifiedItems,

          status: "created",
        });

    if (attemptError) {
      console.error(
        "PAYMENT ATTEMPT INSERT ERROR:",
        attemptError
      );

      return NextResponse.json(
        {
          error:
            "Unable to initialize payment",
        },
        { status: 500 }
      );
    }

    /*
     * 11. Return Razorpay information to frontend.
     */
    return NextResponse.json({
      success: true,

      razorpayOrderId:
        razorpayOrder.id,

      amount: amountInPaise,

      currency: "INR",

      key:
        process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

      subtotal,

      shipping,

      tax,

      total,
    });
  } catch (error) {
    console.error(
      "RAZORPAY CREATE ORDER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to create payment order",
      },
      { status: 500 }
    );
  }
}