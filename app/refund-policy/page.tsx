import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B214B]">
          Ramani
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Cancellation & Refund Policy
        </h1>

        <p className="mt-3 text-gray-500">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-10 leading-7 text-gray-700">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            1. Order Cancellation
          </h2>

          <p>
            Customers may cancel an order while the order is in
            <strong> Pending </strong>
            or
            <strong> Confirmed </strong>
            status.
          </p>

          <p className="mt-3">
            Once an order has been packed or shipped, it can no
            longer be cancelled through the Ramani website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            2. Refunds for Cancelled Orders
          </h2>

          <p>
            If a cancelled order has already been paid for online,
            Ramani will initiate a refund to the original payment
            method.
          </p>

          <p className="mt-3">
            The refund amount will correspond to the amount paid for
            the cancelled order.
          </p>

          <p className="mt-3">
            Once the refund is successfully processed through our
            payment provider, the time taken for the amount to appear
            in the customer's account may depend on the customer's
            bank or payment provider.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            3. No Product Returns
          </h2>

          <p>
            Ramani currently does not accept product returns after an
            order has been delivered.
          </p>

          <p className="mt-3">
            Customers are encouraged to carefully review product
            details, available sizes, and other information before
            placing an order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            4. Orders That Cannot Be Cancelled
          </h2>

          <p>
            Cancellation is not available once an order has reached
            the Packed or Shipped stage.
          </p>

          <p className="mt-3">
            This is because the order may already have entered our
            fulfilment or courier process.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            5. Refund Status
          </h2>

          <p>
            Customers can view the payment and order status from the
            My Orders section of the Ramani website.
          </p>

          <p className="mt-3">
            If a refund has been initiated but the amount has not yet
            appeared in the customer's account, please allow additional
            processing time for the payment provider or bank.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            6. Contact Us
          </h2>

          <p>
            If you have a question about a cancellation or refund,
            please contact Ramani using the contact details provided
            on our website.
          </p>

          <p className="mt-3">
            Please include your order number when contacting us so that
            we can locate your order quickly.
          </p>
        </section>
      </div>

      <div className="mt-12 border-t pt-8">
        <Link
          href="/"
          className="font-semibold text-[#5B214B] hover:underline"
        >
          ← Back to Ramani
        </Link>
      </div>
    </main>
  );
}