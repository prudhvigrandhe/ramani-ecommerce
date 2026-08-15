export default function ShippingPolicyPage() {
    return (
      <main className="mx-auto max-w-5xl px-4 py-14">
  
        <section className="rounded-3xl bg-gradient-to-r from-[#5B214B] to-[#7A3465] px-8 py-16 text-center text-white shadow-xl">
  
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em]">
            Shipping Policy
          </p>
  
          <h1 className="text-5xl font-bold">
            Delivery Information
          </h1>
  
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90">
            We are committed to delivering your order safely and as quickly as possible.
          </p>
  
        </section>
  
        <div className="mt-12 space-y-8">
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Order Processing
            </h2>
  
            <p className="leading-8 text-gray-600">
              Orders are processed within 1–2 business days after successful
              payment confirmation.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Delivery Time
            </h2>
  
            <p className="leading-8 text-gray-600">
              Delivery generally takes 3–7 business days depending on your
              location within India.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Shipping Charges
            </h2>
  
            <p className="leading-8 text-gray-600">
              Shipping charges, if applicable, will be shown clearly during
              checkout before you complete your purchase.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Order Tracking
            </h2>
  
            <p className="leading-8 text-gray-600">
              Once your order is dispatched, tracking details will be shared with
              you through WhatsApp, SMS, or email whenever available.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Delivery Locations
            </h2>
  
            <p className="leading-8 text-gray-600">
              We currently deliver across India.
            </p>
          </div>
  
        </div>
  
      </main>
    );
  }