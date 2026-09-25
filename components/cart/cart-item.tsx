"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

import {
  CartItem,
  useCartStore,
} from "@/store/cart-store";

type Props = {
  item: CartItem;
};

export default function CartItemCard({
  item,
}: Props) {
  const increaseQuantity =
    useCartStore(
      (state) => state.increaseQuantity
    );

  const decreaseQuantity =
    useCartStore(
      (state) => state.decreaseQuantity
    );

  const removeFromCart =
    useCartStore(
      (state) => state.removeFromCart
    );

  const availableStock = Number(
    item.sizeStock?.[item.size] ?? 0
  );

  const isAtMaxStock =
    item.quantity >= availableStock;

  return (
    <div className="flex gap-6 rounded-2xl border bg-white p-5 shadow-sm">
      {/* Product Image */}
      <Link
        href={`/products/${item.id}`}
        className="relative h-36 w-28 shrink-0 overflow-hidden rounded-xl"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/products/${item.id}`}
            className="inline-block"
          >
            <h3 className="text-xl font-semibold transition hover:text-[#5B214B]">
              {item.name}
            </h3>
          </Link>

          <p className="mt-1 text-gray-500">
            Size: {item.size}
          </p>

          <p className="mt-2 text-2xl font-bold">
            ₹{item.price}
          </p>
        </div>

        {/* Bottom Controls */}
        <div className="mt-6 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                decreaseQuantity(
                  item.id,
                  item.size
                )
              }
              disabled={item.quantity <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border text-[#5B214B] transition hover:bg-[#5B214B]/10 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="min-w-[80px] rounded-full bg-[#5B214B]/10 px-4 py-2 text-center text-sm font-medium text-[#5B214B]">
              {item.quantity}{" "}
              {item.quantity === 1
                ? "Piece"
                : "Pieces"}
            </span>

            <button
              onClick={() =>
                increaseQuantity(
                  item.id,
                  item.size
                )
              }
              disabled={isAtMaxStock}
              className="flex h-9 w-9 items-center justify-center rounded-full border text-[#5B214B] transition hover:bg-[#5B214B]/10 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
              title={
                isAtMaxStock
                  ? `Only ${availableStock} ${
                      availableStock === 1
                        ? "piece"
                        : "pieces"
                    } available`
                  : "Increase quantity"
              }
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() =>
              removeFromCart(
                item.id,
                item.size
              )
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