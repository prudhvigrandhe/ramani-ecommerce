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
    loading,
    error,
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
          {loading
            ? "Loading products..."
            : error
              ? "Unable to load products"
              : `Showing ${products.length} products`}
        </p>
      </section>

      {!loading && !error && (
        <ProductToolbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />
      )}

      {loading ? (
        <section className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#5B214B]" />
            <p className="mt-4 text-gray-600">
              Loading products...
            </p>
          </div>
        </section>
      ) : error ? (
        <section className="flex min-h-[300px] items-center justify-center">
          <div className="max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Unable to load products
            </h2>

            <p className="mt-2 text-gray-600">
              Please try again in a moment.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-[#5B214B] px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Try Again
            </button>
          </div>
        </section>
      ) : products.length === 0 ? (
        <section className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-gray-600">
              Try changing your search or category.
            </p>
          </div>
        </section>
      ) : (
        <ProductGrid products={products} />
      )}
    </main>
  );
}