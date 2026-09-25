import Link from "next/link";
import ProductRow from "./product-row";
import { getAdminProducts } from "@/lib/admin/get-admin-products";
import { deleteProduct } from "@/app/admin/actions";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

type Props = {
  page: number;
};

export default async function ProductTable({ page }: Props) {
  const {
    products,
    totalProducts,
    totalPages,
    currentPage,
  } = await getAdminProducts(page);

  if (totalProducts === 0) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <p className="text-gray-500">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE PRODUCTS ================= */}

      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            <div className="flex gap-4">
              {/* Product Image */}

              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    No image
                  </div>
                )}
              </div>

              {/* Product Details */}

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 font-semibold text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {product.category}
                </p>

                <p className="mt-2 font-semibold text-[#5B214B]">
                  ₹{product.price}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  ⭐ {product.rating}
                </p>
              </div>
            </div>

            {/* Actions */}

            <div className="mt-4 flex gap-2 border-t pt-3">
              <Link
                href={`/admin/edit-product/${product.id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#5B214B] px-3 py-2.5 text-sm font-semibold text-[#5B214B] transition hover:bg-[#5B214B] hover:text-white"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>

              <form
                action={async () => {
                  "use server";
                  await deleteProduct(product.id);
                }}
                className="flex-1"
              >
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between rounded-2xl border bg-white px-4 py-3 shadow-sm">
          {/* Previous */}

          {currentPage > 1 ? (
            <Link
              href={`/admin?page=${currentPage - 1}`}
              className="rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-gray-50"
            >
              ← Previous
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-lg border px-3 py-2 text-sm text-gray-300">
              ← Previous
            </span>
          )}

          {/* Page Numbers */}

          <div className="hidden items-center gap-2 sm:flex">
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <Link
                key={pageNumber}
                href={`/admin?page=${pageNumber}`}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                  pageNumber === currentPage
                    ? "bg-[#5B214B] text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </Link>
            ))}
          </div>

          {/* Mobile page indicator */}

          <span className="text-sm font-medium text-gray-600 sm:hidden">
            {currentPage} / {totalPages}
          </span>

          {/* Next */}

          {currentPage < totalPages ? (
            <Link
              href={`/admin?page=${currentPage + 1}`}
              className="rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-gray-50"
            >
              Next →
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-lg border px-3 py-2 text-sm text-gray-300">
              Next →
            </span>
          )}
        </div>
      )}
    </div>
  );
}