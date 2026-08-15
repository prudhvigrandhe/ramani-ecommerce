import {
    Mail,
    MapPin,
    Phone,
    Clock,
    MessageCircle,
  } from "lucide-react";
  
  export default function ContactPage() {
    return (
      <main className="mx-auto max-w-6xl px-4 py-14">
  
        {/* Hero */}
  
        <section className="rounded-3xl bg-gradient-to-r from-[#5B214B] to-[#7A3465] px-8 py-16 text-center text-white shadow-xl">
  
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em]">
            Contact Ramani
          </p>
  
          <h1 className="text-5xl font-bold">
            We'd Love to Hear From You
          </h1>
  
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90">
            Whether you have a question about an order, a product,
            or simply want to connect with us, our team is always
            happy to help.
          </p>
  
        </section>
  
        <section className="mt-16 grid gap-8 lg:grid-cols-2">
  
          {/* Contact Details */}
  
          <div className="space-y-6">
  
            <div className="rounded-2xl border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <Phone className="h-8 w-8 text-[#5B214B]" />
  
                <div>
                  <h3 className="font-semibold">
                    Phone
                  </h3>
  
                  <p className="text-gray-600">
                    +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
  
            <div className="rounded-2xl border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <Mail className="h-8 w-8 text-[#5B214B]" />
  
                <div>
                  <h3 className="font-semibold">
                    Email
                  </h3>
  
                  <p className="text-gray-600">
                    support@ramani.in
                  </p>
                </div>
              </div>
            </div>
  
            <div className="rounded-2xl border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <MessageCircle className="h-8 w-8 text-[#5B214B]" />
  
                <div>
                  <h3 className="font-semibold">
                    WhatsApp
                  </h3>
  
                  <p className="text-gray-600">
                    +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
  
            <div className="rounded-2xl border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-[#5B214B]" />
  
                <div>
                  <h3 className="font-semibold">
                    Business Hours
                  </h3>
  
                  <p className="text-gray-600">
                    Monday – Saturday
                  </p>
  
                  <p className="text-gray-600">
                    10:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </div>
  
            <div className="rounded-2xl border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <MapPin className="h-8 w-8 text-[#5B214B]" />
  
                <div>
                  <h3 className="font-semibold">
                    Location
                  </h3>
  
                  <p className="text-gray-600">
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </div>
            </div>
  
          </div>
  
          {/* Contact Form */}
  
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
  
            <h2 className="mb-6 text-3xl font-bold">
              Send Us a Message
            </h2>
  
            <form className="space-y-5">
  
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border p-4"
              />
  
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border p-4"
              />
  
              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border p-4"
              />
  
              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-xl border p-4"
              />
  
              <button
                type="button"
                className="w-full rounded-xl bg-[#5B214B] py-4 font-semibold text-white transition hover:opacity-90"
              >
                Send Message
              </button>
  
            </form>
  
            <p className="mt-5 text-sm text-gray-500">
              * Contact form functionality will be connected in a future update.
            </p>
  
          </div>
  
        </section>
  
      </main>
    );
  }