import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B214B]">
          Ramani
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Terms & Conditions
        </h1>

        <p className="mt-3 text-gray-500">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-10 leading-7 text-gray-700">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            1. About Ramani
          </h2>

          <p>
            Ramani is an online store offering women's fashion
            products and accessories.
          </p>

          <p className="mt-3">
            By using the Ramani website or placing an order, you
            agree to these Terms & Conditions and the policies
            published on our website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            2. Products and Information
          </h2>

          <p>
            We make reasonable efforts to ensure that product names,
            descriptions, images, prices, sizes, and availability are
            displayed accurately.
          </p>

          <p className="mt-3">
            Product colours may appear slightly different depending
            on the customer's device, display settings, lighting, or
            photography conditions.
          </p>

          <p className="mt-3">
            Product availability may change without notice.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            3. Orders
          </h2>

          <p>
            An order is placed when the customer completes the
            checkout process and the required payment is successfully
            processed.
          </p>

          <p className="mt-3">
            Ramani may be unable to fulfil an order if an unexpected
            inventory issue occurs. In such cases, if payment has
            already been collected, the applicable refund will be
            processed.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            4. Pricing and Payment
          </h2>

          <p>
            Product prices and applicable charges are displayed during
            the shopping and checkout process.
          </p>

          <p className="mt-3">
            Online payments are processed through our payment service
            provider, Razorpay.
          </p>

          <p className="mt-3">
            Ramani may correct pricing or other information displayed
            on the website if an error is identified.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            5. Order Cancellation
          </h2>

          <p>
            Customers may cancel eligible orders while the order is
            in Pending or Confirmed status.
          </p>

          <p className="mt-3">
            Orders cannot normally be cancelled through the website
            after they have reached the Packed or Shipped stage.
          </p>

          <p className="mt-3">
            Please refer to our Cancellation & Refund Policy for
            further information.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            6. Returns
          </h2>

          <p>
            Ramani currently does not accept product returns after
            delivery.
          </p>

          <p className="mt-3">
            Customers should review the product information, size,
            and other available details before placing an order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            7. Shipping
          </h2>

          <p>
            Ramani ships across India through third-party courier and
            logistics partners.
          </p>

          <p className="mt-3">
            Delivery times may vary depending on the destination,
            courier service, and other logistical circumstances.
          </p>

          <p className="mt-3">
            Please refer to our Shipping Policy for more information.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            8. Customer Information
          </h2>

          <p>
            Customers are responsible for providing accurate
            information during checkout, including their name, phone
            number, email address where applicable, and complete
            delivery address.
          </p>

          <p className="mt-3">
            Incorrect or incomplete information may result in delivery
            delays or failed delivery attempts.
          </p>

          <p className="mt-3">
            Please refer to our Privacy Policy for information about
            how customer information is handled.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            9. Website Use
          </h2>

          <p>
            Customers must not misuse the Ramani website, attempt
            unauthorized access, interfere with website functionality,
            or use the website for unlawful purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            10. Changes to These Terms
          </h2>

          <p>
            Ramani may update these Terms & Conditions when our
            services, policies, or business practices change.
          </p>

          <p className="mt-3">
            Updated terms will be published on this page with a
            revised "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            11. Contact Us
          </h2>

          <p>
            If you have questions regarding these Terms & Conditions,
            please contact Ramani using the contact details provided
            on our website.
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