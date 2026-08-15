import {
    Heart,
    ShieldCheck,
    Sparkles,
    Truck,
  } from "lucide-react";
  
  export default function AboutPage() {
    return (
      <main className="mx-auto max-w-6xl px-4 py-14">
  
        {/* Hero */}
  
        <section className="rounded-3xl bg-gradient-to-r from-[#5B214B] to-[#7A3465] px-8 py-16 text-center text-white shadow-xl">
  
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em]">
            Welcome to Ramani
          </p>
  
          <h1 className="text-5xl font-bold">
            Fashion That Celebrates Every Woman
          </h1>
  
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90">
            At Ramani, we believe every woman deserves beautiful,
            comfortable and affordable fashion. Our carefully selected
            collections are designed to bring confidence and elegance
            to your everyday wardrobe.
          </p>
  
        </section>
  
        {/* Our Story */}
  
        <section className="mt-16 grid gap-10 lg:grid-cols-2">
  
          <div>
            <h2 className="mb-5 text-3xl font-bold">
              Our Story
            </h2>
  
            <p className="leading-8 text-gray-600">
              Ramani was created with a simple goal—to make stylish
              women's fashion accessible without compromising on
              quality. We carefully curate every collection to offer
              designs that are elegant, comfortable and suitable for
              everyday wear as well as special occasions.
            </p>
  
            <p className="mt-5 leading-8 text-gray-600">
              Whether you're looking for sarees, kurtas, dresses or
              trendy tops, our mission is to deliver products that make
              you feel confident every time you wear them.
            </p>
  
          </div>
  
          <div className="rounded-3xl border bg-[#FAF7FA] p-8">
  
            <h2 className="mb-6 text-3xl font-bold">
              Our Mission
            </h2>
  
            <p className="leading-8 text-gray-600">
              To build a trusted fashion destination where quality,
              affordability and customer satisfaction come together.
            </p>
  
            <div className="mt-8 rounded-2xl bg-white p-6 shadow">
  
              <p className="text-lg font-semibold text-[#5B214B]">
                "Every outfit should make you feel confident,
                comfortable and beautiful."
              </p>
  
            </div>
  
          </div>
  
        </section>
  
        {/* Why Choose Us */}
  
        <section className="mt-20">
  
          <h2 className="mb-10 text-center text-4xl font-bold">
            Why Choose Ramani
          </h2>
  
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  
            <div className="rounded-3xl border p-8 text-center shadow-sm">
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-[#5B214B]" />
              <h3 className="mb-3 text-xl font-semibold">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Carefully selected products with attention to quality.
              </p>
            </div>
  
            <div className="rounded-3xl border p-8 text-center shadow-sm">
              <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-[#5B214B]" />
              <h3 className="mb-3 text-xl font-semibold">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Safe and secure online payment experience.
              </p>
            </div>
  
            <div className="rounded-3xl border p-8 text-center shadow-sm">
              <Truck className="mx-auto mb-4 h-12 w-12 text-[#5B214B]" />
              <h3 className="mb-3 text-xl font-semibold">
                Delivery Across India
              </h3>
              <p className="text-gray-600">
                We deliver your favourite styles across India.
              </p>
            </div>
  
            <div className="rounded-3xl border p-8 text-center shadow-sm">
              <Heart className="mx-auto mb-4 h-12 w-12 text-[#5B214B]" />
              <h3 className="mb-3 text-xl font-semibold">
                Customer First
              </h3>
              <p className="text-gray-600">
                Every order is handled with care and dedication.
              </p>
            </div>
  
          </div>
  
        </section>
  
      </main>
    );
  }