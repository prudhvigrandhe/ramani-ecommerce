"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Dresses",
    href: "/products?category=Dresses",
  },
  {
    title: "Sarees",
    href: "/products?category=Sarees",
  },
  {
    title: "Kurtas",
    href: "/products?category=Kurtas",
  },
  {
    title: "Tops",
    href: "/products?category=Tops",
  },
  {
    title: "Orders",
    href: "/orders",
  },
];

export default function MobileMenu({
  open,
  onClose,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 max-w-[75vw] overflow-y-auto bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold text-[#5B214B]">
            RAMANI
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col py-4">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className="px-6 py-4 text-lg font-medium transition hover:bg-gray-100 hover:text-[#5B214B]"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}