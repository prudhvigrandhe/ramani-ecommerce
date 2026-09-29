import type { Metadata } from "next";

import Hero from "@/components/home/hero";
import CategoryGrid from "@/components/home/category-grid";
import BestSellers from "@/components/home/best-sellers";
import NewArrivals from "@/components/home/new-arrivals";
import WhyChooseUs from "@/components/home/why-choose-us";
import TrendingProducts from "@/components/home/trending-products";
import InstagramGallery from "@/components/home/instagram-gallery";
import Newsletter from "@/components/home/newsletter";

export const metadata: Metadata = {
  title: "Women's Fashion",
  description:
    "Discover women's fashion at Ramani — shop sarees, dresses, kurtas, tops and more for every occasion.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ramani | Women's Fashion",
    description:
      "Discover women's fashion at Ramani — shop sarees, dresses, kurtas, tops and more for every occasion.",
    url: "/",
    siteName: "Ramani",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramani | Women's Fashion",
    description:
      "Discover women's fashion at Ramani — shop sarees, dresses, kurtas, tops and more for every occasion.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <TrendingProducts />
      <BestSellers />
      <NewArrivals />
      <WhyChooseUs />
      <InstagramGallery />
      {/* <Newsletter /> */}
    </>
  );
}