import Link from "next/link";

import ProductCard from "@/components/products/product-card";
import { getProducts } from "@/lib/get-products";

export default async function NewArrivals() {
  const products = await getProducts();

  const newArrivals = products
    .filter((product) => product.is_new_arrival)
    .slice(0, 4);

    if (newArrivals.length < 2) {
      return null;
    }

  return (
    <section className="mx-auto max-w-[1600px] px-3 py-12 sm:px-4 sm:py-16 lg:py-24">
      <div className="mb-7 flex items-end justify-between sm:mb-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5B214B] sm:text-sm sm:tracking-[0.3em]">
            New Arrivals
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:mt-3 sm:text-4xl">
            Just Landed
          </h2>
        </div>

        <Link
          href="/products"
          className="rounded-lg border border-[#5B214B] px-3 py-2 text-xs font-medium text-[#5B214B] transition hover:bg-[#5B214B] hover:text-white sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {newArrivals.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}