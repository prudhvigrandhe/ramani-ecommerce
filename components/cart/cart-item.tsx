"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem, useCartStore } from "@/store/cart-store";

type Props = {
  item: CartItem;
};

export default function CartItemCard({ item }: Props) {
//   const increaseQuantity = useCartStore((state) => state.increaseQuantity);
//   const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="flex gap-6 rounded-2xl border bg-white p-5 shadow-sm">

      <div className="relative h-36 w-28 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">

        <div>
          <h3 className="text-xl font-semibold">
            {item.name}
          </h3>

          <p className="mt-1 text-gray-500">
            Size: {item.size}
          </p>

          <p className="mt-2 text-2xl font-bold">
            ₹{item.price}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">

  <span className="rounded-full bg-[#5B214B]/10 px-4 py-2 text-sm font-medium text-[#5B214B]">
    1 Piece
  </span>

  <button
    onClick={() =>
      removeFromCart(item.id, item.size)
    }
    className="flex items-center gap-2 text-red-500 transition hover:text-red-700"
  >
    <Trash2 className="h-5 w-5" />
    Remove
  </button>

</div>

      </div>

    </div>
  );
}