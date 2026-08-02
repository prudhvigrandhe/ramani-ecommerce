import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminHeader() {
  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5B214B]">
          Ramani Admin
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Products
        </h1>
      </div>

      <Link
        href="/admin/add-product"
        className="flex items-center gap-2 rounded-xl bg-[#5B214B] px-5 py-3 font-medium text-white transition hover:opacity-90"
      >
        <Plus className="h-5 w-5" />
        Add Product
      </Link>
    </div>
  );
}