import ProductCard from "@/components/products/product-card";
import { getProducts } from "@/lib/get-products";

export default async function TrendingProducts() {
  const products = await getProducts();

  const trending = products
    .filter((product) => product.is_trending)
    .slice(0, 4);

  if (trending.length < 2) {
    return null;
  }

  return (
    <section className="mx-auto mt-12 max-w-7xl px-3 sm:mt-16 sm:px-4 lg:mt-20">
      <div className="mb-7 text-center sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5B214B] sm:text-sm sm:tracking-[0.35em]">
          Trending Collection
        </p>

        <h2 className="mt-2 text-3xl font-bold sm:mt-3 sm:text-4xl">
          🔥 Trending This Week
        </h2>

        <p className="mt-2 text-sm text-gray-500 sm:mt-4 sm:text-base">
          Discover the styles everyone is loving right now.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {trending.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}