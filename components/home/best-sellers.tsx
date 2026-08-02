import ProductCard from "@/components/products/product-card";
import { getProducts } from "@/lib/get-products";

export default async function BestSellers() {
  const products = await getProducts();

  const bestSellers = products
    .filter((product) => product.is_best_seller)
    .slice(0, 4);

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-24">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5B214B]">
          Best Sellers
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Customer Favorites
        </h2>

        <p className="mt-4 text-gray-500">
          Our most loved products, chosen by you.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {bestSellers.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}