import Link from "next/link";

import ProductCard from "@/components/products/product-card";
import { getProducts } from "@/lib/get-products";

export default async function NewArrivals() {
  const products = await getProducts();

  const newArrivals = products
    .filter((product) => product.is_new_arrival)
    .slice(0, 4);

  if (newArrivals.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-24">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5B214B]">
            New Arrivals
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Just Landed
          </h2>
        </div>

        <Link
          href="/products"
          className="rounded-xl border border-[#5B214B] px-6 py-3 font-medium text-[#5B214B] transition hover:bg-[#5B214B] hover:text-white"
        >
          View All
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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