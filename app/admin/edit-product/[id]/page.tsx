import { notFound } from "next/navigation";
import { getCategories } from "@/lib/get-categories";
import { getProduct } from "@/lib/get-product";
import EditProductForm from "@/components/admin/edit-product-form";
import ProductPreviewCard from "@/components/admin/product-preview-card";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: Props) {
  const { id } = await params;

  const product = await getProduct(Number(id));

  if (!product) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Edit Product
      </h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <EditProductForm
          product={product}
          categories={categories}
        />

        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductPreviewCard product={product} />
        </div>
      </div>
    </main>
  );
}