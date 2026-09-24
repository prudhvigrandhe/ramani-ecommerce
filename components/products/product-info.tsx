"use client";

import { useState } from "react";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import { Product } from "@/lib/types";
import SizeSelector from "./size-selector";
import { useCartStore } from "@/store/cart-store";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
    const [size, setSize] = useState(
        product.availableSizes?.[0] ?? "XS"
      );

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  const selectedSizeAvailable =
    product.availableSizes.includes(size);

  function handleAddToCart() {
    if (!selectedSizeAvailable) return;

    addToCart(product, 1, size);

    toast.success("🛍️ Added to your shopping bag.");
  }

  return (
    <div className="space-y-8">

      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#5B214B]">
          Ramani Collection
        </p>

        <h1 className="mt-3 text-5xl font-bold">
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

      <div className="flex items-center gap-4">
        <span className="text-5xl font-bold">
          ₹{product.price}
        </span>

        <span className="text-3xl text-gray-400 line-through">
          ₹{product.originalPrice}
        </span>

        <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
          {discount}% OFF
        </span>
      </div>

      <div className="space-y-6">

        <div>
          <p className="text-lg leading-8 text-gray-600">
            Premium quality women's fashion crafted for
            comfort, elegance and everyday confidence.
            Designed for festive, office and casual wear.
          </p>
        </div>

        <div className="rounded-2xl border bg-gray-50 p-6">

          <h3 className="mb-5 text-lg font-semibold">
            Product Specifications
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">

  <div>
    <p className="text-sm text-gray-500">Fabric</p>
    <p className="font-medium">{product.fabric || "-"}</p>
  </div>

  <div>
    <p className="text-sm text-gray-500">Fit</p>
    <p className="font-medium">{product.fit || "-"}</p>
  </div>

  <div>
    <p className="text-sm text-gray-500">Occasion</p>
    <p className="font-medium">{product.occasion || "-"}</p>
  </div>

  <div>
    <p className="text-sm text-gray-500">Sleeve</p>
    <p className="font-medium">{product.sleeve || "-"}</p>
  </div>

  <div>
    <p className="text-sm text-gray-500">Wash Care</p>
    <p className="font-medium">{product.washCare || "-"}</p>
  </div>

  <div>
    <p className="text-sm text-gray-500">Color</p>
    <p className="font-medium">{product.color || "-"}</p>
  </div>

  <div>
    <p className="text-sm text-gray-500">Pattern</p>
    <p className="font-medium">{product.pattern || "-"}</p>
  </div>

  <div>
    <p className="text-sm text-gray-500">SKU</p>
    <p className="font-medium">
      {product.sku || `RAM-${product.id.toString().padStart(4, "0")}`}
    </p>
  </div>

</div>

        </div>

      </div>

      <div className="rounded-2xl border bg-white p-5">
  <div className="space-y-5">

    <div className="flex items-start gap-4">
      <div className="text-2xl">
        {selectedSizeAvailable ? "🟢" : "🔴"}
      </div>

      <div>
        <h3
          className={`font-semibold ${
            selectedSizeAvailable
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {selectedSizeAvailable ? "In Stock" : "Out of Stock"}
        </h3>

        <p className="text-sm text-gray-500">
          {selectedSizeAvailable
            ? `Size ${size} is available`
            : `Size ${size} is currently unavailable`}
        </p>
      </div>
    </div>

    <hr />

    <div className="flex items-start gap-4">
      <div className="text-2xl">🚚</div>

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

    <div className="flex items-start gap-4">
      <div className="text-2xl">💳</div>

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

    <div className="flex items-start gap-4">
      <div className="text-2xl">📞</div>

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

<SizeSelector
  sizes={product.availableSizes}
  size={size}
  setSize={setSize}
  sizeStock={product.sizeStock}
/>

      <div className="flex gap-4">

        <button
          onClick={handleAddToCart}
          disabled={!selectedSizeAvailable}
          className={`flex flex-1 items-center justify-center gap-3 rounded-xl py-4 font-semibold text-white transition ${
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

        <button className="rounded-xl border px-5 transition hover:bg-gray-100">
          <Heart className="h-6 w-6" />
        </button>

      </div>

      <button className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#5B214B] py-4 font-semibold text-[#5B214B] transition hover:bg-[#5B214B] hover:text-white">
        <Truck className="h-5 w-5" />
        Buy Now
      </button>

    </div>
  );
}