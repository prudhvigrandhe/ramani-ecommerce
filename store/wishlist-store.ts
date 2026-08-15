"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";
import { toast } from "sonner";

type WishlistStore = {
  items: Product[];

  addToWishlist: (product: Product) => void;

  removeFromWishlist: (id: number) => void;

  toggleWishlist: (product: Product) => void;

  isWishlisted: (id: number) => boolean;

  clearWishlist: () => void;

  totalItems: () => number;
};

export const useWishlistStore =
  create<WishlistStore>()(
    persist(
      (set, get) => ({
        items: [],

        addToWishlist: (product) => {
          const exists = get().items.some(
            (item) => item.id === product.id
          );

          if (exists) return;

          set({
            items: [...get().items, product],
          });

          toast.success(
            "❤️ Added to your wishlist."
          );
        },

        removeFromWishlist: (id) => {
          set({
            items: get().items.filter(
              (item) => item.id !== id
            ),
          });

          toast.success(
            "Removed from your wishlist."
          );
        },

        toggleWishlist: (product) => {
          const exists = get().items.some(
            (item) => item.id === product.id
          );

          if (exists) {
            get().removeFromWishlist(product.id);
            return;
          }

          get().addToWishlist(product);
        },

        isWishlisted: (id) => {
          return get().items.some(
            (item) => item.id === id
          );
        },

        clearWishlist: () =>
          set({
            items: [],
          }),

        totalItems: () => get().items.length,
      }),
      {
        name: "ramani-wishlist",
      }
    )
  );