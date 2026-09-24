"use client";


import Link from "next/link";
import { Heart, ShoppingBag, Menu } from "lucide-react";

import { useWishlistStore } from "@/store/wishlist-store";

import SearchBar from "@/components/ui/search-bar";
import MobileMenu from "./mobile-menu";
import { useCartStore } from "@/store/cart-store";
import { Suspense, useEffect, useState } from "react";

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const wishlistItems = useWishlistStore(
    (state) => state.totalItems()
  );

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-[#5B214B]"
        >
          RAMANI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="/products?category=Dresses">Dresses</Link>
          <Link href="/products?category=Sarees">Sarees</Link>
          <Link href="/products?category=Kurtas">Kurtas</Link>
          <Link href="/products?category=Tops">Tops</Link>
          <Link href="/orders">Orders</Link>
        </nav>

        {/* Desktop Search */}
        <div className="hidden lg:block">
  <Suspense fallback={null}>
    <SearchBar />
  </Suspense>
</div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
        <Link
  href="/wishlist"
  className="relative"
>
  <Heart className="h-6 w-6" />

  {mounted && wishlistItems > 0 && (
    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5B214B] text-xs font-bold text-white">
      {wishlistItems}
    </span>
  )}
</Link>

          <Link
            href="/cart"
            className="relative"
          >
            <ShoppingBag className="h-6 w-6" />

            {mounted && totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5B214B] text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}