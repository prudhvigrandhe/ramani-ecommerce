import type { Metadata } from "next";
import ProductsClient from "./products-client";

type Props = {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Women's Fashion",
  description:
    "Shop women's fashion at Ramani. Explore sarees, dresses, kurtas, tops and more for every occasion.",

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title: "Women's Fashion | Ramani",
    description:
      "Shop women's fashion at Ramani. Explore sarees, dresses, kurtas, tops and more for every occasion.",
    url: "/products",
    siteName: "Ramani",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Women's Fashion | Ramani",
    description:
      "Shop women's fashion at Ramani. Explore sarees, dresses, kurtas, tops and more for every occasion.",
  },
};

export default async function ProductsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <ProductsClient
      initialCategory={params.category ?? "All"}
      initialSearch={params.search ?? ""}
    />
  );
}