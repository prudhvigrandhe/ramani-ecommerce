"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

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

  removeFromCart: (id: number, size: string) => void;

  increaseQuantity: (id: number, size: string) => void;

  decreaseQuantity: (id: number, size: string) => void;

  clearCart: () => void;

  totalItems: () => number;

  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity, size) => {
        const items = [...get().items];

        const existing = items.find(
          (item) => item.id === product.id && item.size === size
        );

        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({
            ...product,
            quantity,
            size,
          });
        }

        set({ items });
      },

      removeFromCart: (id, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        });
      },

      increaseQuantity: (id, size) => {
        const items = [...get().items];

        const item = items.find(
          (p) => p.id === id && p.size === size
        );

        if (item) {
          item.quantity++;
        }

        set({ items });
      },

      decreaseQuantity: (id, size) => {
        const items = [...get().items];

        const item = items.find(
          (p) => p.id === id && p.size === size
        );

        if (!item) return;

        if (item.quantity === 1) {
          set({
            items: items.filter(
              (p) => !(p.id === id && p.size === size)
            ),
          });
          return;
        }

        item.quantity--;

        set({ items });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce(
          (total, item) => total + item.quantity,
          0
        ),

      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "ramani-cart",
    }
  )
);