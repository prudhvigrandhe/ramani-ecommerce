import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center py-24 text-center">

      <ShoppingBag className="mb-6 h-20 w-20 text-[#5B214B]" />

      <h2 className="text-3xl font-bold">
        Your cart is empty
      </h2>

      <p className="mt-4 text-gray-500">
        Looks like you haven't added anything yet.
      </p>

      <Link
        href="/products"
        className="mt-8 rounded-xl bg-[#5B214B] px-8 py-4 font-semibold text-white"
      >
        Continue Shopping
      </Link>

    </div>
  );
}