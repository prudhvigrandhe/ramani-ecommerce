import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B214B]">
          Ramani
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Privacy Policy
        </h1>

        <p className="mt-3 text-gray-500">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-10 leading-7 text-gray-700">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            1. Information We Collect
          </h2>

          <p>
            When you place an order with Ramani, we may collect
            information necessary to process and deliver your order.
          </p>

          <p className="mt-3">
            This may include your name, phone number, email address,
            delivery address, city, state, and PIN code.
          </p>

          <p className="mt-3">
            We may also retain information related to your order,
            including the products purchased, order amount, order
            status, and payment status.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            2. How We Use Your Information
          </h2>

          <p>
            Customer information is used primarily to process,
            fulfil, deliver, and provide support for orders placed
            through Ramani.
          </p>

          <p className="mt-3">
            This may include contacting you regarding your order,
            delivery, cancellation, refund, or other matters directly
            related to your purchase.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            3. Payment Information
          </h2>

          <p>
            Online payments are processed through our payment service
            provider, Razorpay.
          </p>

          <p className="mt-3">
            Ramani does not need to store your card number, UPI PIN,
            or other sensitive payment credentials on our website.
          </p>

          <p className="mt-3">
            Payment-related information such as payment IDs and
            payment status may be retained for order processing,
            verification, refunds, and transaction records.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            4. Delivery Partners
          </h2>

          <p>
            To fulfil your order, relevant delivery information may
            need to be shared with third-party courier or logistics
            partners responsible for delivering your package.
          </p>

          <p className="mt-3">
            These partners may include courier services such as DTDC,
            Shadowfax, or other delivery providers selected by Ramani.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            5. Data Security
          </h2>

          <p>
            We take reasonable measures to protect customer and order
            information from unauthorized access, misuse, or disclosure.
          </p>

          <p className="mt-3">
            However, no online system can be guaranteed to be
            completely secure.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            6. Data Retention
          </h2>

          <p>
            Order-related information may be retained for purposes
            such as order management, customer support, payment
            reconciliation, refunds, accounting, and other legitimate
            business requirements.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            7. Marketing
          </h2>

          <p>
            Customer information collected during checkout is not
            currently collected for a separate marketing or
            advertising program.
          </p>

          <p className="mt-3">
            If Ramani introduces additional marketing or promotional
            communications in the future, this policy may be updated
            accordingly.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            8. Policy Updates
          </h2>

          <p>
            Ramani may update this Privacy Policy when our services,
            practices, or legal requirements change.
          </p>

          <p className="mt-3">
            Any updated version will be published on this page with a
            revised "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            9. Contact Us
          </h2>

          <p>
            If you have questions about this Privacy Policy or how
            your information is handled, please contact Ramani using
            the contact details provided on our website.
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