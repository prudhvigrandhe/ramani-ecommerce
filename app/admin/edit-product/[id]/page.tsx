import { notFound } from "next/navigation";
import { getCategories } from "@/lib/get-categories";
import { getProduct } from "@/lib/get-product";
import EditProductForm from "@/components/admin/edit-product-form";

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
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Edit Product
      </h1>

      <EditProductForm
        product={product}
        categories={categories}
      />
    </main>
  );
}