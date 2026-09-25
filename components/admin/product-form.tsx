"use client";

import { useState } from "react";

import CategorySelect from "./category-select";
import ProductImagesUpload from "./product-images-upload";

import { Product, Category } from "@/lib/types";

const availableSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "Free Size",
];

type Props = {
  categories: Category[];
  action: (formData: FormData) => void | Promise<void>;
  product?: Product;
};

export default function ProductForm({
  categories,
  action,
  product,
}: Props) {
  const [selectedSizes, setSelectedSizes] =
    useState<Record<string, boolean>>(() => {
      const initial: Record<string, boolean> = {};

      for (const size of availableSizes) {
        initial[size] =
          product?.availableSizes?.includes(size) ??
          false;
      }

      return initial;
    });

  const [sizeQuantities, setSizeQuantities] =
    useState<Record<string, number>>(() => {
      const initial: Record<string, number> = {};

      for (const size of availableSizes) {
        initial[size] =
          product?.sizeStock?.[size] ?? 0;
      }

      return initial;
    });

  function handleSizeToggle(
    size: string,
    checked: boolean
  ) {
    setSelectedSizes((previous) => ({
      ...previous,
      [size]: checked,
    }));

    /*
     * If a size is unchecked, immediately
     * reset its quantity to 0.
     */
    if (!checked) {
      setSizeQuantities((previous) => ({
        ...previous,
        [size]: 0,
      }));
    }
  }

  function handleQuantityChange(
    size: string,
    value: string
  ) {
    const quantity = Number(value);

    setSizeQuantities((previous) => ({
      ...previous,
      [size]:
        Number.isFinite(quantity) &&
        quantity >= 0
          ? Math.floor(quantity)
          : 0,
    }));
  }

  return (
    <form
      action={action}
      className="space-y-6 rounded-2xl border bg-white p-8 shadow"
    >
      {product && (
        <input
          type="hidden"
          name="id"
          value={product.id}
        />
      )}

      <input
        name="name"
        placeholder="Product Name"
        defaultValue={product?.name}
        required
        className="w-full rounded-xl border p-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="price"
          type="number"
          defaultValue={product?.price}
          required
          className="rounded-xl border p-3"
        />

        <input
          name="originalPrice"
          type="number"
          defaultValue={product?.originalPrice}
          required
          className="rounded-xl border p-3"
        />
      </div>

      <CategorySelect
        categories={categories}
        defaultValue={product?.category}
      />

      <input
        name="rating"
        type="number"
        step="0.1"
        defaultValue={product?.rating ?? 4.8}
        className="w-full rounded-xl border p-3"
      />

      <textarea
        name="description"
        rows={5}
        defaultValue={product?.description}
        className="w-full rounded-xl border p-3"
      />

      {/* Product Specifications */}
      <div className="rounded-xl border p-5">
        <h3 className="mb-5 text-lg font-semibold">
          Product Specifications
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="fabric"
            placeholder="Fabric (e.g. Pure Cotton)"
            defaultValue={product?.fabric}
            className="rounded-xl border p-3"
          />

          <input
            name="fit"
            placeholder="Fit (e.g. Regular Fit)"
            defaultValue={product?.fit}
            className="rounded-xl border p-3"
          />

          <input
            name="occasion"
            placeholder="Occasion (e.g. Casual Wear)"
            defaultValue={product?.occasion}
            className="rounded-xl border p-3"
          />

          <input
            name="sleeve"
            placeholder="Sleeve (e.g. Full Sleeve)"
            defaultValue={product?.sleeve}
            className="rounded-xl border p-3"
          />

          <input
            name="wash_care"
            placeholder="Wash Care (e.g. Machine Wash)"
            defaultValue={product?.washCare}
            className="rounded-xl border p-3"
          />

          <input
            name="color"
            placeholder="Color"
            defaultValue={product?.color}
            className="rounded-xl border p-3"
          />

          <input
            name="pattern"
            placeholder="Pattern"
            defaultValue={product?.pattern}
            className="rounded-xl border p-3"
          />

          <input
            name="sku"
            placeholder="SKU"
            defaultValue={product?.sku}
            className="rounded-xl border p-3"
          />
        </div>
      </div>

      {/* Size & Inventory */}
      <div className="rounded-xl border p-5">
        <h3 className="mb-2 text-lg font-semibold">
          Size & Inventory
        </h3>

        <p className="mb-5 text-sm text-gray-500">
          Select the sizes available and enter the
          quantity for each size.
        </p>

        <div className="space-y-3">
          {availableSizes.map((size) => {
            const isSelected =
              selectedSizes[size] ?? false;

            const quantity =
              sizeQuantities[size] ?? 0;

            return (
              <div
                key={size}
                className="flex items-center justify-between rounded-xl border p-3"
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="available_sizes"
                    value={size}
                    checked={isSelected}
                    onChange={(event) =>
                      handleSizeToggle(
                        size,
                        event.target.checked
                      )
                    }
                    className="h-4 w-4"
                  />

                  <span className="font-medium">
                    {size}
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    Qty
                  </span>

                  <input
                    type="number"
                    name={`stock_${size}`}
                    min="0"
                    step="1"
                    value={quantity}
                    disabled={!isSelected}
                    onChange={(event) =>
                      handleQuantityChange(
                        size,
                        event.target.value
                      )
                    }
                    className="w-24 rounded-lg border p-2 text-center disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProductImagesUpload
        mainImage={product?.image}
        galleryImages={product?.images}
      />

      {/* Homepage Sections */}
      <div className="rounded-xl border p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Homepage Sections
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_trending"
              defaultChecked={
                product?.is_trending
              }
              className="h-5 w-5"
            />
            <span>Trending Collection</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_best_seller"
              defaultChecked={
                product?.is_best_seller
              }
              className="h-5 w-5"
            />
            <span>Best Seller</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_new_arrival"
              defaultChecked={
                product?.is_new_arrival
              }
              className="h-5 w-5"
            />
            <span>New Arrival</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-[#5B214B] py-4 font-semibold text-white"
      >
        {product
          ? "Update Product"
          : "Add Product"}
      </button>
    </form>
  );
}