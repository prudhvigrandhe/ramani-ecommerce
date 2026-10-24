import type { Metadata } from "next";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
} from "lucide-react";
import ContactForm from "../../components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Ramani for questions about orders, products, payments, shipping or other customer support.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Ramani",
    description:
      "Contact Ramani for questions about orders, products, payments, shipping or other customer support.",
    url: "/contact",
    siteName: "Ramani",
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
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
        <div className="space-y-6">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-[#5B214B]/10 p-3">
                <Phone className="h-6 w-6 text-[#5B214B]" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Phone
                </h2>
                <p className="mt-1 text-gray-600">
                  +91 7330682554
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-[#5B214B]/10 p-3">
                <Mail className="h-6 w-6 text-[#5B214B]" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Email
                </h2>
                <p className="mt-1 text-gray-600">
                  ramaniclothing04@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-[#5B214B]/10 p-3">
                <MessageCircle className="h-6 w-6 text-[#5B214B]" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  WhatsApp
                </h2>
                <p className="mt-1 text-gray-600">
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-[#5B214B]/10 p-3">
                <Clock className="h-6 w-6 text-[#5B214B]" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Business Hours
                </h2>
                <p className="mt-1 text-gray-600">
                  Monday – Saturday
                </p>
                <p className="text-gray-600">
                  10:00 AM – 7:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-[#5B214B]/10 p-3">
                <MapPin className="h-6 w-6 text-[#5B214B]" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Location
                </h2>
                <p className="mt-1 text-gray-600">
                  Hyderabad, Telangana, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}