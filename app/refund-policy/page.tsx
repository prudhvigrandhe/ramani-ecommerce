export default function RefundPolicyPage() {
    return (
      <main className="mx-auto max-w-5xl px-4 py-14">
  
        <section className="rounded-3xl bg-gradient-to-r from-[#5B214B] to-[#7A3465] px-8 py-16 text-center text-white shadow-xl">
  
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em]">
            Refund & Cancellation Policy
          </p>
  
          <h1 className="text-5xl font-bold">
            Refund & Cancellation
          </h1>
  
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90">
            Please read our refund and cancellation policy carefully before placing an order.
          </p>
  
        </section>
  
        <div className="mt-12 space-y-8">
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Order Confirmation
            </h2>
  
            <p className="leading-8 text-gray-600">
              Orders are confirmed only after successful online payment.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Order Cancellation
            </h2>
  
            <p className="leading-8 text-gray-600">
              Once an order has been confirmed, cancellation requests may not be
              possible if the order has already been processed or dispatched.
              Please contact our support team as soon as possible if you need assistance.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Returns & Exchanges
            </h2>
  
            <p className="leading-8 text-gray-600">
              We currently do not offer returns or exchanges on delivered products.
              We encourage customers to review product details, sizing information,
              and images carefully before placing an order.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Damaged or Incorrect Products
            </h2>
  
            <p className="leading-8 text-gray-600">
              If you receive a damaged, defective, or incorrect product,
              please contact us within 48 hours of delivery with clear photos.
              Our team will review the issue and provide an appropriate resolution.
            </p>
          </div>
  
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              Refunds
            </h2>
  
            <p className="leading-8 text-gray-600">
              Refunds are processed only if an order cannot be fulfilled by Ramani
              or if a refund is approved after reviewing a damaged or incorrect item.
              Approved refunds will be credited to the original payment method.
            </p>
          </div>
  
        </div>
  
      </main>
    );
  }