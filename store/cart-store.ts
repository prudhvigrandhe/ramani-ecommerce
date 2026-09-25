"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";
import { toast } from "sonner";

export type CartItem = Product & {
  quantity: number;
  size: string;
};

type CartStore = {
  items: CartItem[];

  addToCart: (
    product: Product,
    quantity: number,
    size: string
  ) => void;

  removeFromCart: (
    id: number,
    size: string
  ) => void;

  increaseQuantity: (
    id: number,
    size: string
  ) => void;

  decreaseQuantity: (
    id: number,
    size: string
  ) => void;

  removeUnavailableItems: (
    items: {
      id: number;
      size: string;
    }[]
  ) => void;

  clearCart: () => void;

  totalItems: () => number;

  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (
        product,
        quantity,
        size
      ) => {
        const items = [...get().items];

        if (
          !Number.isInteger(quantity) ||
          quantity <= 0
        ) {
          toast.error("Invalid quantity.");
          return;
        }

        /*
         * Always use the latest product stock
         * received by this function.
         */
        const availableStock =
          Number(product.sizeStock?.[size] ?? 0);

        if (availableStock <= 0) {
          toast.error(
            `Sorry, ${size} is currently out of stock.`
          );
          return;
        }

        const existingIndex =
          items.findIndex(
            (item) =>
              item.id === product.id &&
              item.size === size
          );

        /*
         * Same product + same size already exists.
         */
        if (existingIndex !== -1) {
          const existing =
            items[existingIndex];

          const newQuantity =
            existing.quantity + quantity;

          if (newQuantity > availableStock) {
            toast.error(
              `Only ${availableStock} ${
                availableStock === 1
                  ? "piece"
                  : "pieces"
              } available in ${size}.`
            );
            return;
          }

          /*
           * IMPORTANT:
           * Replace the old product snapshot with
           * the latest product data.
           *
           * This refreshes sizeStock inside the
           * persisted cart item.
           */
          items[existingIndex] = {
            ...product,
            quantity: newQuantity,
            size,
          };

          set({ items });

          toast.success(
            "🛍️ Cart quantity updated."
          );

          return;
        }

        /*
         * New cart item.
         */
        if (quantity > availableStock) {
          toast.error(
            `Only ${availableStock} ${
              availableStock === 1
                ? "piece"
                : "pieces"
            } available in ${size}.`
          );
          return;
        }

        items.push({
          ...product,
          quantity,
          size,
        });

        set({ items });

        toast.success(
          "🛍️ Added to your shopping bag."
        );
      },

      removeFromCart: (
        id,
        size
      ) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.id === id &&
                item.size === size
              )
          ),
        });

        toast.success(
          "Removed from your shopping bag."
        );
      },

      increaseQuantity: (
        id,
        size
      ) => {
        const items = [...get().items];

        const item = items.find(
          (p) =>
            p.id === id &&
            p.size === size
        );

        if (!item) return;

        const availableStock =
          Number(item.sizeStock?.[size] ?? 0);

        if (
          availableStock <= 0
        ) {
          toast.error(
            `Sorry, ${size} is currently out of stock.`
          );
          return;
        }

        if (
          item.quantity >= availableStock
        ) {
          toast.error(
            `Only ${availableStock} ${
              availableStock === 1
                ? "piece"
                : "pieces"
            } available in ${size}.`
          );
          return;
        }

        item.quantity += 1;

        set({ items });
      },

      decreaseQuantity: (
        id,
        size
      ) => {
        const items = [...get().items];

        const item = items.find(
          (p) =>
            p.id === id &&
            p.size === size
        );

        if (!item) return;

        if (item.quantity === 1) {
          set({
            items: items.filter(
              (p) =>
                !(
                  p.id === id &&
                  p.size === size
                )
            ),
          });

          toast.success(
            "Removed from your shopping bag."
          );

          return;
        }

        item.quantity -= 1;

        set({ items });
      },

      removeUnavailableItems: (
        unavailable
      ) => {
        set({
          items: get().items.filter(
            (cartItem) =>
              !unavailable.some(
                (item) =>
                  item.id === cartItem.id &&
                  item.size === cartItem.size
              )
          ),
        });
      },

      clearCart: () =>
        set({ items: [] }),

      totalItems: () =>
        get().items.reduce(
          (total, item) =>
            total + item.quantity,
          0
        ),

      totalPrice: () =>
        get().items.reduce(
          (total, item) =>
            total +
            item.price * item.quantity,
          0
        ),
    }),
    {
      name: "ramani-cart",
    }
  )
);