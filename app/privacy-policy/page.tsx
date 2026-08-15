export default function PrivacyPolicyPage() {
    return (
      <main className="mx-auto max-w-5xl px-4 py-14">
  
        <section className="rounded-3xl bg-gradient-to-r from-[#5B214B] to-[#7A3465] px-8 py-16 text-center text-white shadow-xl">
  
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em]">
            Privacy Policy
          </p>
  
          <h1 className="text-5xl font-bold">
            Your Privacy Matters
          </h1>
  
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90">
            We value your trust and are committed to protecting your personal
            information. This Privacy Policy explains how Ramani collects, uses,
            and safeguards your information.
          </p>
  
        </section>
  
        <div className="mt-12 space-y-8">
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Information We Collect
            </h2>
  
            <p className="leading-8 text-gray-600">
              We may collect your name, email address, phone number, delivery
              address, and payment-related information when you place an order or
              contact us.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              How We Use Your Information
            </h2>
  
            <ul className="list-disc space-y-2 pl-6 leading-8 text-gray-600">
              <li>To process and deliver your orders.</li>
              <li>To provide customer support.</li>
              <li>To improve our products and services.</li>
              <li>To send important order updates.</li>
            </ul>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Payment Security
            </h2>
  
            <p className="leading-8 text-gray-600">
              We do not store your debit card, credit card, UPI PIN, or banking
              credentials. Payments are securely processed through trusted payment
              gateway partners.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Information Sharing
            </h2>
  
            <p className="leading-8 text-gray-600">
              We do not sell or rent your personal information. Your data is
              shared only with trusted partners when necessary to process orders,
              payments, or deliveries.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Contact Us
            </h2>
  
            <p className="leading-8 text-gray-600">
              If you have any questions about this Privacy Policy, please contact
              us through our Contact Us page.
            </p>
          </div>
  
        </div>
  
      </main>
    );
  }