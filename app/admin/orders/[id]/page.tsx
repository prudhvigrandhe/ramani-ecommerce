import { notFound } from "next/navigation";
import { getOrder } from "@/lib/orders/get-order";
import OrderStatusSelect from "@/components/admin/order-status-select";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const order = await getOrder(Number(id));

  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">

      <h1 className="text-4xl font-bold">
        {order.order_number}
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        <div className="rounded-xl border p-6">

          <h2 className="mb-4 text-xl font-bold">
            Customer Details
          </h2>

          <p><strong>Name:</strong> {order.customer_name}</p>

          <p><strong>Phone:</strong> {order.phone}</p>

          <p><strong>Email:</strong> {order.email || "-"}</p>

        </div>

        <div className="rounded-xl border p-6">

          <h2 className="mb-4 text-xl font-bold">
            Shipping Address
          </h2>

          <p>{order.address_line1}</p>

          {order.address_line2 && (
            <p>{order.address_line2}</p>
          )}

          <p>
            {order.city}, {order.state}
          </p>

          <p>{order.pincode}</p>

        </div>

      </div>

      <div className="mt-10 rounded-xl border p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Ordered Products
        </h2>

        <div className="space-y-5">

          {order.order_items.map((item: any) => (

            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-5"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {item.product_name}
                  </h3>

                  <p>
                    Size : {item.size}
                  </p>

                  <p>
                    Qty : {item.quantity}
                  </p>

                </div>

              </div>

              <p className="text-lg font-bold">
                ₹{item.subtotal}
              </p>

            </div>

          ))}

        </div>

      </div>

      <div className="mt-10 rounded-xl border p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Payment Summary
        </h2>

        <p>Subtotal : ₹{order.subtotal}</p>

        <p>Shipping : ₹{order.shipping}</p>

        <p>Tax : ₹{order.tax}</p>

        <hr className="my-4" />

        <p className="text-2xl font-bold">
          Total : ₹{order.total}
        </p>

      </div>

      <div className="mt-10">
  <OrderStatusSelect
    orderId={order.id}
    currentStatus={order.order_status}
  />
</div>

    </main>
  );
}