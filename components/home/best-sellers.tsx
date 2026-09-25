import ProductCard from "@/components/products/product-card";
import { getProducts } from "@/lib/get-products";

export default async function BestSellers() {
  const products = await getProducts();

  const bestSellers = products
    .filter((product) => product.is_best_seller)
    .slice(0, 4);

    if (bestSellers.length < 2) {
      return null;
    }

  return (
    <section className="mx-auto max-w-[1600px] px-3 py-12 sm:px-4 sm:py-16 lg:py-24">
      <div className="mb-7 text-center sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5B214B] sm:text-sm sm:tracking-[0.3em]">
          Best Sellers
        </p>

        <h2 className="mt-2 text-3xl font-bold sm:mt-3 sm:text-4xl">
          Customer Favorites
        </h2>

        <p className="mt-2 text-sm text-gray-500 sm:mt-4 sm:text-base">
          Our most loved products, chosen by you.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
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