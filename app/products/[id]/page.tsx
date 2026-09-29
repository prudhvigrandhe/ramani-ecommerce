import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const product = await getProduct(Number(id));

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    product.description?.trim() ||
    `Shop ${product.name} at Ramani. Discover women's fashion for every occasion.`;

  return {
    title: product.name,
    description,

    alternates: {
      canonical: `/products/${product.id}`,
    },

    openGraph: {
      title: `${product.name} | Ramani`,
      description,
      url: `/products/${product.id}`,
      siteName: "Ramani",
      locale: "en_IN",
      type: "website",
      images: product.image
        ? [
            {
              url: product.image,
              alt: product.name,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Ramani`,
      description,
      images: product.image
        ? [product.image]
        : undefined,
    },
  };
}

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