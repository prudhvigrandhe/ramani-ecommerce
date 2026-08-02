import Hero from "@/components/home/hero";
import CategoryGrid from "@/components/home/category-grid";
import BestSellers from "@/components/home/best-sellers";
import NewArrivals from "@/components/home/new-arrivals";
import WhyChooseUs from "@/components/home/why-choose-us";
import TrendingProducts from "@/components/home/trending-products";
import InstagramGallery from "@/components/home/instagram-gallery";
import Newsletter from "@/components/home/newsletter";

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