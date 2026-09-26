import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B214B]">
          Ramani
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Shipping Policy
        </h1>

        <p className="mt-3 text-gray-500">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-10 leading-7 text-gray-700">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            1. Shipping Coverage
          </h2>

          <p>
            Ramani currently ships orders across India.
          </p>

          <p className="mt-3">
            Delivery availability may depend on the serviceability of
            the customer's location by our courier partners.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            2. Delivery Partners
          </h2>

          <p>
            Orders may be delivered through third-party courier and
            logistics partners, including services such as DTDC,
            Shadowfax, or other delivery partners selected by Ramani.
          </p>

          <p className="mt-3">
            The courier partner used for an order may vary depending
            on the delivery location and operational availability.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            3. Order Processing
          </h2>

          <p>
            Orders are processed after successful payment confirmation.
          </p>

          <p className="mt-3">
            Processing and dispatch may take additional time during
            weekends, public holidays, promotional periods, or periods
            of unusually high order volume.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            4. Delivery Time
          </h2>

          <p>
            Delivery time depends on the destination, courier partner,
            serviceability, and other logistical factors.
          </p>

          <p className="mt-3">
            Any estimated delivery date or timeframe shown during the
            ordering process is an estimate and may change due to
            circumstances outside Ramani's control.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            5. Address Information
          </h2>

          <p>
            Customers are responsible for providing accurate and
            complete delivery information, including the recipient's
            name, phone number, address, city, state, and PIN code.
          </p>

          <p className="mt-3">
            Ramani is not responsible for delays or failed delivery
            caused by incorrect or incomplete information provided by
            the customer.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            6. Delivery Delays
          </h2>

          <p>
            Delivery may be delayed due to weather conditions, natural
            events, transportation disruptions, courier operational
            issues, public holidays, or other circumstances beyond
            Ramani's reasonable control.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            7. Shipping Charges
          </h2>

          <p>
            Any applicable shipping charges will be displayed during
            checkout before the order is placed.
          </p>

          <p className="mt-3">
            If checkout shows free shipping, no shipping charge will
            be added to that order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            8. Contact Us
          </h2>

          <p>
            If you have questions about the delivery of your order,
            please contact Ramani using the contact details provided
            on our website.
          </p>

          <p className="mt-3">
            Please include your order number when contacting us.
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