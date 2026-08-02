import ProductForm from "@/components/admin/product-form";
import { addProduct } from "../actions";
import { getCategories } from "@/lib/get-categories";

export default async function AddProductPage() {
  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <a
        href="/admin"
        className="text-[#5B214B]"
      >
        ← Back to Admin
      </a>

      <h1 className="mb-10 mt-4 text-5xl font-bold">
        Add Product
      </h1>

      <ProductForm
        categories={categories}
        action={addProduct}
      />
    </main>
  );
}