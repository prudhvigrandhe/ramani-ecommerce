import { notFound } from "next/navigation";

import ProductGallery from "@/components/products/product-gallery";
import ProductInfo from "@/components/products/product-info";
import ProductBreadcrumb from "@/components/products/breadcrumb";
import RelatedProducts from "@/components/products/related-products";

import { getProduct } from "@/lib/get-product";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const product = await getProduct(Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <ProductBreadcrumb product={product} />

      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <RelatedProducts currentProduct={product} />
    </main>
  );
}