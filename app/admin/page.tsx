import Link from "next/link";

import AdminHeader from "@/components/admin/admin-header";
import ProductTable from "@/components/admin/product-table";
import { getDashboardStats } from "@/lib/admin/get-dashboard-stats";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function AdminPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Math.max(
    1,
    Number.parseInt(params.page ?? "1", 10) || 1
  );

  const stats = await getDashboardStats();

  return (
    <main className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-10">
      <AdminHeader />

      {/* ================= DASHBOARD STATS ================= */}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {/* Total Orders */}

        <div className="rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5">
          <p className="text-xs font-medium text-gray-500 sm:text-sm">
            Total Orders
          </p>

          <p className="mt-1 text-2xl font-bold text-[#5B214B] sm:mt-2 sm:text-3xl">
            {stats.totalOrders}
          </p>
        </div>

        {/* Total Revenue */}

        <div className="rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5">
          <p className="text-xs font-medium text-gray-500 sm:text-sm">
            Total Revenue
          </p>

          <p className="mt-1 text-xl font-bold text-[#5B214B] sm:mt-2 sm:text-3xl">
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Pending Orders */}

        <div className="rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5">
          <p className="text-xs font-medium text-gray-500 sm:text-sm">
            Pending Orders
          </p>

          <p className="mt-1 text-2xl font-bold text-[#5B214B] sm:mt-2 sm:text-3xl">
            {stats.pendingOrders}
          </p>
        </div>

        {/* Delivered Orders */}

        <div className="rounded-xl border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5">
          <p className="text-xs font-medium text-gray-500 sm:text-sm">
            Delivered Orders
          </p>

          <p className="mt-1 text-2xl font-bold text-[#5B214B] sm:mt-2 sm:text-3xl">
            {stats.deliveredOrders}
          </p>
        </div>
      </div>

      {/* ================= RECENT ORDERS ================= */}

      <div className="mt-6 rounded-2xl border bg-white shadow-sm sm:mt-8">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-4 sm:p-6">
          <div>
            <h2 className="text-lg font-bold sm:text-2xl">
              Recent Orders
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Your latest customer orders.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="rounded-lg bg-[#5B214B] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#431736] sm:px-4 sm:text-sm"
          >
            View All
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No orders yet.
          </div>
        ) : (
          <>
            {/* ================= MOBILE ORDERS ================= */}

            <div className="divide-y md:hidden">
              {stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="block truncate text-sm font-semibold text-[#5B214B]"
                      >
                        {order.order_number}
                      </Link>

                      <p className="mt-1 text-sm text-gray-700">
                        {order.customer_name}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold">
                      ₹
                      {Number(order.total).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        order.payment_status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.payment_status}
                    </span>

                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-700">
                      {order.order_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP ORDERS ================= */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-semibold text-[#5B214B] hover:underline"
                        >
                          {order.order_number}
                        </Link>
                      </td>

                      <td className="px-6 py-4">
                        {order.customer_name}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        ₹
                        {Number(order.total).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            order.payment_status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.payment_status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {order.order_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ================= PRODUCTS ================= */}

      <div className="mt-7 sm:mt-10">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg font-bold sm:text-2xl">
            Products
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage your Ramani product catalogue.
          </p>
        </div>

        <ProductTable page={page} />
      </div>
    </main>
  );
}