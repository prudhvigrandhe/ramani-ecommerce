"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import OrderStatusTimeline from "@/components/orders/order-status-timeline";
import CancelOrderButton from "@/components/orders/cancel-order-button";

type OrderItem = {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  size: string;
  subtotal: number;
};

type Order = {
  id: number;
  created_at: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  order_number: string;
  items: OrderItem[];
  accessToken: string;
};

const ORDER_TOKENS_KEY = "ramani-order-tokens";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const storedTokens = localStorage.getItem(ORDER_TOKENS_KEY);

        if (!storedTokens) {
          setLoading(false);
          return;
        }

        const parsedTokens = JSON.parse(storedTokens);

        if (!Array.isArray(parsedTokens) || parsedTokens.length === 0) {
          setLoading(false);
          return;
        }

        const validTokens = parsedTokens.filter(
          (token): token is string => typeof token === "string"
        );

        const responses = await Promise.all(
          validTokens.map(async (token) => {
            try {
              const response = await fetch(
                `/api/orders/lookup?token=${encodeURIComponent(token)}`
              );

              if (!response.ok) {
                return null;
              }

              const data = await response.json();

              if (!data.success || !data.order) {
                return null;
              }

              return {
                ...data.order,
                accessToken: token,
              } as Order;
            } catch {
              return null;
            }
          })
        );

        const loadedOrders = responses
          .filter((order): order is Order => order !== null)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

        setOrders(loadedOrders);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B214B]">
            Ramani
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            My Orders
          </h1>
        </div>

        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#5B214B]" />

          <p className="mt-4 text-gray-500">
            Loading your orders...
          </p>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B214B]">
            Ramani
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            View your recent orders and payment details.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">📦</div>

          <h2 className="mt-5 text-2xl font-semibold">
            No orders found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-gray-500">
            Once you place an order with Ramani, your order
            details will appear here.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-xl bg-[#5B214B] px-8 py-4 font-semibold text-white transition hover:bg-[#431736]"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B214B]">
          Ramani
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          View your recent orders and payment details.
        </p>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
          >
            {/* Order Header */}
            <div className="flex flex-col gap-4 border-b bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Order Number
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#5B214B]">
                  {order.order_number}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString(
                    "en-IN",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  Payment {order.payment_status}
                </span>

                <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                  {order.order_status}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="divide-y">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-6"
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {item.product_name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Size: {item.size}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="mt-3 font-semibold text-[#5B214B]">
                      ₹{Number(item.subtotal).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-6">
  <OrderStatusTimeline status={order.order_status} />
</div>
            {/* Order Details */}
            <div className="grid gap-8 border-t p-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">
                  Delivery Address
                </h3>

                <div className="mt-3 text-sm leading-6 text-gray-600">
                  <p>{order.customer_name}</p>

                  <p>{order.address_line1}</p>

                  {order.address_line2 && (
                    <p>{order.address_line2}</p>
                  )}

                  <p>
                    {order.city}, {order.state} -{" "}
                    {order.pincode}
                  </p>

                  <p className="mt-2">
                    Phone: {order.phone}
                  </p>

                  {order.email && (
                    <p>Email: {order.email}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Payment Summary
                </h3>

                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span>
                      ₹
                      {Number(order.subtotal).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span>
                      {Number(order.shipping) === 0
                        ? "FREE"
                        : `₹${Number(
                            order.shipping
                          ).toLocaleString("en-IN")}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Tax
                    </span>

                    <span>
                      ₹
                      {Number(order.tax).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between border-t pt-3 text-lg font-bold">
                    <span>Total Paid</span>

                    <span className="text-[#5B214B]">
                      ₹
                      {Number(order.total).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <p className="pt-2 text-sm text-gray-500">
                    Payment Method:{" "}
                    {order.payment_method}
                  </p>
                </div>
              </div>
            </div>
            <CancelOrderButton
  orderId={order.id}
  token={order.accessToken}
  orderStatus={order.order_status}
  onCancelled={() => {
    window.location.reload();
  }}
/>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/products"
          className="inline-block rounded-xl border border-[#5B214B] px-8 py-3 font-semibold text-[#5B214B] transition hover:bg-[#5B214B]/5"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}