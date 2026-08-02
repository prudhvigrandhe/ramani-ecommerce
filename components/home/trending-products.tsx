import ProductCard from "@/components/products/product-card";
import { getProducts } from "@/lib/get-products";

export default async function TrendingProducts() {
  const products = await getProducts();

  const trending = products
    .filter((product) => product.is_trending)
    .slice(0, 4);

  if (trending.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#5B214B]">
          Trending Collection
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          🔥 Trending This Week
        </h2>

        <p className="mt-4 text-gray-500">
          Discover the styles everyone is loving right now.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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