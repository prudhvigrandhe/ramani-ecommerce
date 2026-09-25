"use client";

import { useState } from "react";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Product } from "@/lib/types";
import SizeSelector from "./size-selector";
import { useCartStore } from "@/store/cart-store";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const router = useRouter();

  const firstAvailableSize =
  product.availableSizes?.find(
    (availableSize) =>
      Number(product.sizeStock?.[availableSize] ?? 0) > 0
  ) ?? product.availableSizes?.[0] ?? "XS";

const [size, setSize] = useState(firstAvailableSize);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const selectedSizeAvailable =
    Number(product.sizeStock?.[size] ?? 0) > 0;

  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const specifications = [
    {
      label: "Fabric",
      value: product.fabric,
    },
    {
      label: "Fit",
      value: product.fit,
    },
    {
      label: "Occasion",
      value: product.occasion,
    },
    {
      label: "Sleeve",
      value: product.sleeve,
    },
    {
      label: "Wash Care",
      value: product.washCare,
    },
    {
      label: "Color",
      value: product.color,
    },
    {
      label: "Pattern",
      value: product.pattern,
    },
  ].filter(
    (spec) =>
      typeof spec.value === "string" &&
      spec.value.trim() !== ""
  );

  function handleAddToCart() {
    if (!selectedSizeAvailable) {
      toast.error(
        "Selected size is currently unavailable."
      );
      return;
    }

    addToCart(product, 1, size);

    toast.success(
      "🛍️ Added to your shopping bag."
    );
  }

  function handleBuyNow() {
    if (!selectedSizeAvailable) {
      toast.error(
        "Please select an available size."
      );
      return;
    }

    addToCart(product, 1, size);

    router.push("/checkout");
  }

  return (
    <div className="space-y-8">

      {/* Product Header */}
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#5B214B]">
          Ramani Collection
        </p>

        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          {product.name}
        </h1>

        <div className="mt-5 flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

          <span>{product.rating}</span>

          <span className="text-gray-400">
            (142 Reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <span className="text-4xl font-bold sm:text-5xl">
          ₹{product.price}
        </span>

        <span className="text-2xl text-gray-400 line-through sm:text-3xl">
          ₹{product.originalPrice}
        </span>

        <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700 sm:px-4 sm:py-2">
          {discount}% OFF
        </span>
      </div>

      {/* Description + Specifications */}
      <div className="space-y-6">

        {/* Description */}
        <div>
          <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Premium quality women's fashion crafted for
            comfort, elegance and everyday confidence.
            Designed for festive, office and casual wear.
          </p>
        </div>

        {/* Product Specifications */}
        {specifications.length > 0 && (
          <div className="rounded-2xl border bg-gray-50 p-4 sm:p-6">

            <h3 className="mb-4 text-base font-semibold sm:mb-5 sm:text-lg">
              Product Specifications
            </h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-5">

              {specifications.map((spec) => (
                <div key={spec.label}>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {spec.label}
                  </p>

                  <p className="text-sm font-medium sm:text-base">
                    {spec.value}
                  </p>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>

      {/* Size Selection */}
      <SizeSelector
        sizes={product.availableSizes}
        size={size}
        setSize={setSize}
        sizeStock={product.sizeStock}
      />

      {/* Add To Cart + Wishlist */}
      <div className="flex gap-3 sm:gap-4">

        <button
          onClick={handleAddToCart}
          disabled={!selectedSizeAvailable}
          className={`flex flex-1 items-center justify-center gap-3 rounded-xl py-3.5 font-semibold text-white transition sm:py-4 ${
            selectedSizeAvailable
              ? "bg-[#5B214B] hover:opacity-90"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          <ShoppingBag className="h-5 w-5" />

          {selectedSizeAvailable
            ? "Add To Cart"
            : "Out of Stock"}
        </button>

        <button
          type="button"
          className="rounded-xl border px-4 transition hover:bg-gray-100 sm:px-5"
          aria-label="Add to wishlist"
        >
          <Heart className="h-6 w-6" />
        </button>

      </div>

      {/* Buy Now */}
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={!selectedSizeAvailable}
        className={`flex w-full items-center justify-center gap-3 rounded-xl border-2 py-3.5 font-semibold transition sm:py-4 ${
          selectedSizeAvailable
            ? "border-[#5B214B] text-[#5B214B] hover:bg-[#5B214B] hover:text-white"
            : "cursor-not-allowed border-gray-300 text-gray-400"
        }`}
      >
        <Truck className="h-5 w-5" />

        {selectedSizeAvailable
          ? "Buy Now"
          : "Out of Stock"}
      </button>

      {/* Product Benefits */}
      <div className="rounded-2xl border bg-white p-4 sm:p-5">

        <div className="space-y-4 sm:space-y-5">

          {/* Stock */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="text-xl sm:text-2xl">
              {selectedSizeAvailable
                ? "🟢"
                : "🔴"}
            </div>

            <div>
              <h3
                className={`font-semibold ${
                  selectedSizeAvailable
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedSizeAvailable
                  ? "In Stock"
                  : "Out of Stock"}
              </h3>

              <p className="text-sm text-gray-500">
                {selectedSizeAvailable
                  ? `Size ${size} is available`
                  : `Size ${size} is currently unavailable`}
              </p>
            </div>
          </div>

          <hr />

          {/* Delivery */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="text-xl sm:text-2xl">
              🚚
            </div>

            <div>
              <h3 className="font-semibold">
                Delivery Across India
              </h3>

              <p className="text-sm text-gray-500">
                Shipping charges are calculated at checkout.
              </p>
            </div>
          </div>

          <hr />

          {/* Secure Payment */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="text-xl sm:text-2xl">
              💳
            </div>

            <div>
              <h3 className="font-semibold">
                Secure Online Payment
              </h3>

              <p className="text-sm text-gray-500">
                100% secure payment through trusted payment partners.
              </p>
            </div>
          </div>

          <hr />

          {/* Customer Support */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="text-xl sm:text-2xl">
              📞
            </div>

            <div>
              <h3 className="font-semibold">
                Customer Support
              </h3>

              <p className="text-sm text-gray-500">
                Need help? Contact us through WhatsApp or call our support team.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}