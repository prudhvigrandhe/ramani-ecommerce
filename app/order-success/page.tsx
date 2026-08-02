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
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-7xl">🎉</div>

      <h1 className="text-4xl font-bold text-[#5B214B]">
        Order Placed Successfully!
      </h1>

      <p className="mt-4 text-gray-600">
        Thank you for shopping with <strong>Ramani 🌸</strong>
      </p>

      <div className="mt-8 rounded-2xl border bg-gray-50 px-8 py-6 shadow-sm">
        <p className="text-sm text-gray-500">Order Number</p>

        <h2 className="mt-2 text-3xl font-bold text-[#5B214B]">
          {orderNumber}
        </h2>
      </div>

      <p className="mt-8 text-gray-500">
        Your order has been confirmed.
        <br />
        We'll contact you soon regarding dispatch.
      </p>

      <Link
        href="/"
        className="mt-10 rounded-xl bg-[#5B214B] px-8 py-4 font-semibold text-white transition hover:bg-[#431736]"
      >
        Continue Shopping
      </Link>
    </main>
  );
}