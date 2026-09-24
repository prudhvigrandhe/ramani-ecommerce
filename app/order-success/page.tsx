import Link from "next/link";

type Props = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function OrderSuccessPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  const orderNumber = params.order ?? "N/A";

  return (
    <main className="mx-auto flex min-h-[75vh] max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
      {/* Success Icon */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl">
        ✓
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-4xl font-bold text-[#5B214B]">
        Order Placed Successfully!
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        Thank you for shopping with{" "}
        <strong>Ramani 🌸</strong>
      </p>

      {/* Payment Confirmation */}
      <div className="mt-8 w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-center gap-2 text-green-600">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-bold">
            ✓
          </span>

          <span className="font-semibold">
            Payment Successful
          </span>
        </div>

        {/* Order Number */}
        <div className="mt-6 border-t pt-6">
          <p className="text-sm text-gray-500">
            Order Number
          </p>

          <h2 className="mt-2 break-all text-2xl font-bold text-[#5B214B]">
            {orderNumber}
          </h2>
        </div>
      </div>

      {/* Confirmation Message */}
      <div className="mt-8 max-w-lg text-gray-500">
        <p>
          We've received your order successfully.
        </p>

        <p className="mt-2">
          We'll contact you when your order is processed
          and dispatched.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row">
        <Link
          href="/orders"
          className="flex-1 rounded-xl bg-[#5B214B] px-6 py-4 font-semibold text-white transition hover:bg-[#431736]"
        >
          View My Orders
        </Link>

        <Link
          href="/"
          className="flex-1 rounded-xl border border-[#5B214B] px-6 py-4 font-semibold text-[#5B214B] transition hover:bg-[#5B214B]/5"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Small reassurance */}
      <p className="mt-8 text-sm text-gray-400">
        Please keep your order number for future reference.
      </p>
    </main>
  );
}