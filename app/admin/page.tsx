import Link from "next/link";

import AdminHeader from "@/components/admin/admin-header";
import ProductTable from "@/components/admin/product-table";
import { getDashboardStats } from "@/lib/admin/get-dashboard-stats";

export default async function AdminPage() {
  const stats = await getDashboardStats();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <AdminHeader />

      {/* Dashboard Stats */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-[#5B214B]">
            {stats.totalOrders}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Revenue
          </p>

          <p className="mt-2 text-3xl font-bold text-[#5B214B]">
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Pending Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-[#5B214B]">
            {stats.pendingOrders}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Delivered Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-[#5B214B]">
            {stats.deliveredOrders}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-10 rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your latest customer orders.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="rounded-lg bg-[#5B214B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#431736]"
          >
            View All
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No orders yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
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
        )}
      </div>

      {/* Products */}
      <div className="mt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your Ramani product catalogue.
          </p>
        </div>

        <ProductTable />
      </div>
    </main>
  );
}