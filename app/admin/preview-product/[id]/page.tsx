import Link from "next/link";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/products/product-gallery";
import ProductInfo from "@/components/products/product-info";
import ProductBreadcrumb from "@/components/products/breadcrumb";
import RelatedProducts from "@/components/products/related-products";

import { getProduct } from "@/lib/get-product";
import { requireAdmin } from "@/lib/admin/auth";
import PublishProductButton from "@/components/admin/publish-product-button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PreviewProductPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  const product = await getProduct(Number(id));

  if (!product) {
    notFound();
  }

  if (product.is_published) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Preview Banner */}
      <div className="mb-8 rounded-xl border border-yellow-300 bg-yellow-50 p-4">
        <p className="font-semibold text-yellow-800">
          Product Preview
        </p>

        <p className="mt-1 text-sm text-yellow-700">
          This product is currently a draft and is not
          visible to customers.
        </p>
      </div>

      {/* Preview Actions */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href="/admin"
          className="rounded-xl border px-5 py-3 font-medium transition hover:bg-gray-50"
        >
          ← Back to Admin
        </Link>

        <Link
          href={`/admin/edit-product/${product.id}`}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Edit Product
        </Link>

        <PublishProductButton
          productId={product.id}
        />
      </div>

      <ProductBreadcrumb product={product} />

      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <RelatedProducts currentProduct={product} />
    </main>
  );
}