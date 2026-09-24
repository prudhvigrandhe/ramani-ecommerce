import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { razorpay } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { refundPayment } from "@/lib/razorpay-refund";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const razorpayOrderId = body.razorpay_order_id;
    const razorpayPaymentId = body.razorpay_payment_id;
    const razorpaySignature = body.razorpay_signature;

    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        {
          error: "Missing payment verification details.",
        },
        { status: 400 }
      );
    }

    /*
     * 1. Find the payment attempt created
     *    when the Razorpay order was created.
     */
    const {
      data: paymentAttempt,
      error: attemptError,
    } = await supabaseAdmin
      .from("payment_attempts")
      .select("*")
      .eq("razorpay_order_id", razorpayOrderId)
      .maybeSingle();

    if (attemptError) {
      console.error(
        "PAYMENT ATTEMPT FETCH ERROR:",
        attemptError
      );

      return NextResponse.json(
        {
          error: "Unable to verify payment.",
        },
        { status: 500 }
      );
    }

    if (!paymentAttempt) {
      return NextResponse.json(
        {
          error: "Payment attempt not found.",
        },
        { status: 404 }
      );
    }

    /*
     * 2. If this payment was already refunded,
     *    return the refund state.
     */
    if (paymentAttempt.status === "refunded") {
      return NextResponse.json(
        {
          success: false,
          verified: true,
          refunded: true,
          error:
            "Payment was received, but the order could not be completed because the item became unavailable. The payment has been refunded.",
          razorpayOrderId,
          razorpayPaymentId:
            paymentAttempt.razorpay_payment_id ||
            razorpayPaymentId,
        },
        { status: 409 }
      );
    }

    /*
     * 3. If this payment was already completed,
     *    return the existing order and its private token.
     */
    if (paymentAttempt.status === "completed") {
      const {
        data: existingOrder,
        error: existingOrderError,
      } = await supabaseAdmin
        .from("orders")
        .select(
          "id, order_number, customer_access_token"
        )
        .eq("razorpay_order_id", razorpayOrderId)
        .maybeSingle();

      if (existingOrderError) {
        console.error(
          "EXISTING ORDER FETCH ERROR:",
          existingOrderError
        );

        return NextResponse.json(
          {
            error: "Unable to load completed order.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        verified: true,
        completed: true,
        alreadyCompleted: true,

        razorpayOrderId,

        razorpayPaymentId:
          paymentAttempt.razorpay_payment_id ||
          razorpayPaymentId,

        orderId: existingOrder?.id ?? null,

        orderNumber:
          existingOrder?.order_number ?? null,

        customerAccessToken:
          existingOrder?.customer_access_token ?? null,
      });
    }

    /*
     * 4. Verify the Razorpay signature unless
     *    this payment was already marked as paid.
     */
    if (paymentAttempt.status !== "paid") {
      const generatedSignature = crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET!
        )
        .update(
          `${razorpayOrderId}|${razorpayPaymentId}`
        )
        .digest("hex");

      if (generatedSignature !== razorpaySignature) {
        console.error(
          "INVALID RAZORPAY SIGNATURE"
        );

        return NextResponse.json(
          {
            error:
              "Payment verification failed.",
          },
          { status: 400 }
        );
      }

      /*
       * 5. Fetch payment directly from Razorpay.
       */
      const payment =
        await razorpay.payments.fetch(
          razorpayPaymentId
        );

      /*
       * 6. Verify payment belongs to our
       *    Razorpay order.
       */
      if (
        payment.order_id !==
        razorpayOrderId
      ) {
        console.error(
          "PAYMENT ORDER ID MISMATCH"
        );

        return NextResponse.json(
          {
            error:
              "Payment does not belong to this order.",
          },
          { status: 400 }
        );
      }

      /*
       * 7. Verify amount.
       */
      if (
        Number(payment.amount) !==
        Number(paymentAttempt.amount)
      ) {
        console.error(
          "PAYMENT AMOUNT MISMATCH",
          {
            expected:
              paymentAttempt.amount,
            received: payment.amount,
          }
        );

        return NextResponse.json(
          {
            error:
              "Payment amount mismatch.",
          },
          { status: 400 }
        );
      }

      /*
       * 8. Verify currency.
       */
      if (
        payment.currency !==
        paymentAttempt.currency
      ) {
        console.error(
          "PAYMENT CURRENCY MISMATCH"
        );

        return NextResponse.json(
          {
            error:
              "Payment currency mismatch.",
          },
          { status: 400 }
        );
      }

      /*
       * 9. Payment must actually be captured.
       */
      if (payment.status !== "captured") {
        console.error(
          "PAYMENT NOT CAPTURED:",
          payment.status
        );

        return NextResponse.json(
          {
            error:
              `Payment is not captured. Current status: ${payment.status}`,
          },
          { status: 400 }
        );
      }

      /*
       * 10. Save the verified payment.
       */
      const {
        error: updateError,
      } = await supabaseAdmin
        .from("payment_attempts")
        .update({
          razorpay_payment_id:
            razorpayPaymentId,
          status: "paid",
        })
        .eq(
          "razorpay_order_id",
          razorpayOrderId
        );

      if (updateError) {
        console.error(
          "PAYMENT ATTEMPT UPDATE ERROR:",
          updateError
        );

        return NextResponse.json(
          {
            error:
              "Payment was received but could not be recorded. Please contact support.",
          },
          { status: 500 }
        );
      }
    }

    /*
     * 11. Complete the actual ecommerce order.
     *
     * PostgreSQL handles this as one transaction:
     *
     * - locks product rows
     * - checks current size stock
     * - creates orders row
     * - creates order_items
     * - reduces size-specific inventory
     * - marks payment_attempt as completed
     */
    const {
      data: completionResult,
      error: completionError,
    } = await supabaseAdmin.rpc(
      "complete_paid_order",
      {
        p_razorpay_order_id:
          razorpayOrderId,
      }
    );

    /*
     * 12. Handle insufficient stock separately.
     */
    if (completionError) {
      console.error(
        "ORDER COMPLETION ERROR:",
        completionError
      );

      const isInsufficientStock =
        completionError.message?.includes(
          "INSUFFICIENT_STOCK:"
        );

      if (isInsufficientStock) {
        /*
         * Mark the payment as waiting for refund.
         */
        const {
          error: refundPendingError,
        } = await supabaseAdmin
          .from("payment_attempts")
          .update({
            status: "refund_pending",
          })
          .eq(
            "razorpay_order_id",
            razorpayOrderId
          )
          .eq("status", "paid");

        if (refundPendingError) {
          console.error(
            "REFUND PENDING UPDATE ERROR:",
            refundPendingError
          );

          return NextResponse.json(
            {
              error:
                "Payment was successful, but the order could not be completed. Please contact support.",
              paymentVerified: true,
              razorpayOrderId,
            },
            { status: 500 }
          );
        }

        /*
         * Refund the captured Razorpay payment.
         *
         * Amount is stored in payment_attempts
         * in paise.
         */
        try {
          await refundPayment(
            razorpayPaymentId,
            Number(paymentAttempt.amount)
          );
        } catch (refundError) {
          console.error(
            "RAZORPAY REFUND ERROR:",
            refundError
          );

          /*
           * Keep refund_pending so the payment
           * is clearly marked for recovery.
           */
          return NextResponse.json(
            {
              error:
                "Payment was successful, but the item became unavailable and the refund could not be completed automatically. Please contact support.",
              paymentVerified: true,
              refundPending: true,
              razorpayOrderId,
            },
            { status: 500 }
          );
        }

        /*
         * Refund succeeded.
         */
        const {
          error: refundedUpdateError,
        } = await supabaseAdmin
          .from("payment_attempts")
          .update({
            status: "refunded",
          })
          .eq(
            "razorpay_order_id",
            razorpayOrderId
          )
          .eq(
            "status",
            "refund_pending"
          );

        if (refundedUpdateError) {
          console.error(
            "REFUNDED STATUS UPDATE ERROR:",
            refundedUpdateError
          );

          /*
           * The Razorpay refund has already happened.
           * Do not attempt another refund.
           */
          return NextResponse.json(
            {
              error:
                "Payment was refunded, but we could not update the payment record. Please contact support.",
              paymentVerified: true,
              refunded: true,
              razorpayOrderId,
            },
            { status: 500 }
          );
        }

        return NextResponse.json(
          {
            success: false,
            verified: true,
            refunded: true,
            error:
              "Payment was received, but the item became unavailable. Your payment has been refunded.",
            razorpayOrderId,
            razorpayPaymentId,
          },
          { status: 409 }
        );
      }

      /*
       * Any other database error is NOT automatically refunded.
       *
       * The payment remains "paid" so it can be
       * recovered/retried instead of accidentally
       * refunding a valid payment.
       */
      return NextResponse.json(
        {
          error:
            "Payment was successful, but we could not complete the order. Please contact support.",
          paymentVerified: true,
          razorpayOrderId,
        },
        { status: 500 }
      );
    }

    /*
     * 13. Get the newly-created order.
     */
    const {
      data: completedOrder,
      error: orderFetchError,
    } = await supabaseAdmin
      .from("orders")
      .select(
        "id, order_number, customer_access_token"
      )
      .eq(
        "razorpay_order_id",
        razorpayOrderId
      )
      .maybeSingle();

    if (orderFetchError) {
      console.error(
        "COMPLETED ORDER FETCH ERROR:",
        orderFetchError
      );

      return NextResponse.json(
        {
          error:
            "Order was completed, but order details could not be loaded. Please refresh and try again.",
          paymentVerified: true,
          orderCompleted: true,
          razorpayOrderId,
        },
        { status: 500 }
      );
    }

    if (!completedOrder) {
      return NextResponse.json(
        {
          error:
            "Order was completed, but order details could not be found.",
          paymentVerified: true,
          orderCompleted: true,
          razorpayOrderId,
        },
        { status: 500 }
      );
    }

    /*
     * 14. Everything completed successfully.
     */
    return NextResponse.json({
      success: true,

      verified: true,

      completed: true,

      alreadyCompleted:
        completionResult?.already_completed ??
        false,

      razorpayOrderId,

      razorpayPaymentId,

      orderId: completedOrder.id,

      orderNumber:
        completedOrder.order_number,

      customerAccessToken:
        completedOrder.customer_access_token,
    });
  } catch (error: any) {
    console.error(
      "PAYMENT VERIFICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to verify payment. Please try again.",
      },
      { status: 500 }
    );
  }
}