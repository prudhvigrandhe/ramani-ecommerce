import Link from "next/link";

import { getOrders } from "@/lib/orders/get-orders";
import OrderSearch from "@/components/admin/order-search";

type Props = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function AdminOrdersPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const orders = await getOrders(params.search);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customer orders and update their status.
        </p>
      </div>

      <OrderSearch />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-[#5B214B] hover:underline"
                    >
                      {order.order_number}
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    {order.customer_name}
                  </td>

                  <td className="px-6 py-4">
                    {order.phone}
                  </td>

                  <td className="px-6 py-4">
                    ₹{Number(order.total).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    {order.order_status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}