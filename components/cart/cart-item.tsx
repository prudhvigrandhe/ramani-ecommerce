"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem, useCartStore } from "@/store/cart-store";

type Props = {
  item: CartItem;
};

export default function CartItemCard({ item }: Props) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
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

        <div className="flex items-center justify-between">

          <div className="flex items-center rounded-lg border">

            <button
              onClick={() =>
                decreaseQuantity(item.id, item.size)
              }
              className="p-3"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="px-5">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(item.id, item.size)
              }
              className="p-3"
            >
              <Plus className="h-4 w-4" />
            </button>

          </div>

          <button
            onClick={() =>
              removeFromCart(item.id, item.size)
            }
            className="text-red-500"
          >
            <Trash2 />
          </button>

        </div>

      </div>

    </div>
  );
}