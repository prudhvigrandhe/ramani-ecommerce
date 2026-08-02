import CategorySelect from "./category-select";
import ImageUpload from "./image-upload";

import { Product, Category } from "@/lib/types";

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

      <ImageUpload
        image={product?.image}
        imagePath={product?.image_path}
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
              defaultChecked={product?.is_trending}
              className="h-5 w-5"
            />
            <span>Trending Collection</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_best_seller"
              defaultChecked={product?.is_best_seller}
              className="h-5 w-5"
            />
            <span>Best Seller</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_new_arrival"
              defaultChecked={product?.is_new_arrival}
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
        {product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}