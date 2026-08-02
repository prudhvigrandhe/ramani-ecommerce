import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-[#faf7f9]">
      <div className="mx-auto max-w-[1600px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-wide text-[#5B214B]">
              RAMANI
            </h2>

            <p className="mt-5 max-w-md leading-7 text-gray-600">
              Discover elegant women's fashion designed for every occasion.
              From timeless sarees to stylish kurtas, beautiful dresses and
              everyday essentials, Ramani brings quality, comfort and confidence
              together.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-[#5B214B]" />
                <span>Hyderabad, Telangana, India</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="h-5 w-5 text-[#5B214B]" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="h-5 w-5 text-[#5B214B]" />
                <span>support@ramani.in</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="/products?category=dresses"
                  className="hover:text-[#5B214B]"
                >
                  Dresses
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=sarees"
                  className="hover:text-[#5B214B]"
                >
                  Sarees
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=kurtas"
                  className="hover:text-[#5B214B]"
                >
                  Kurtas
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=tops"
                  className="hover:text-[#5B214B]"
                >
                  Tops
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              Customer Care
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="#" className="hover:text-[#5B214B]">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-[#5B214B]">
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-[#5B214B]">
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-[#5B214B]">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              Company
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="#" className="hover:text-[#5B214B]">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-[#5B214B]">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-[#5B214B]">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-[#5B214B]">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-200" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Ramani. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white"
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
            >
              <FaFacebookF size={18} />
            </Link>

            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white"
            >
              <FaPinterestP size={18} />
            </Link>

            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:text-white"
            >
              <FaWhatsapp size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}