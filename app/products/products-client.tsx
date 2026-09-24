"use client";

import ProductToolbar from "@/components/products/product-toolbar";
import ProductGrid from "@/components/products/product-grid";
import { useProducts } from "@/hooks/use-products";

type Props = {
  initialCategory: string;
  initialSearch: string;
};

export default function ProductsClient({
  initialCategory,
  initialSearch,
}: Props) {
  const {
    products,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
  } = useProducts(
    initialCategory,
    initialSearch
  );

  return (
    <main className="mx-auto max-w-[1600px] px-4 py-12">
      <section className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5B214B]">
          Ramani Collection
        </p>

        <h1 className="mt-3 text-5xl font-bold text-gray-900">
          All Products
        </h1>

        <p className="mt-4 text-gray-600">
          Showing {products.length} products
        </p>
      </section>

      <ProductToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <ProductGrid products={products} />
    </main>
  );
}