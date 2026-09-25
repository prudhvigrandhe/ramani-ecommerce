import Link from "next/link";
import { Plus } from "lucide-react";
import LogoutButton from "./logout-button";

export default function AdminHeader() {
  return (
    <div className="mb-5 flex items-center justify-between gap-2 sm:mb-10 sm:gap-3">
      {/* Title */}

      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#5B214B] sm:text-sm sm:tracking-[0.3em]">
          Ramani Admin
        </p>

        <h1 className="mt-1 text-3xl font-bold sm:mt-2 sm:text-4xl">
          Dashboard
        </h1>
      </div>

      {/* Actions */}

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <Link
          href="/admin/add-product"
          className="flex items-center gap-1 rounded-lg bg-[#5B214B] px-2.5 py-2 text-xs font-medium text-white transition hover:opacity-90 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />

          <span className="sm:hidden">
            Add
          </span>

          <span className="hidden sm:inline">
            Add Product
          </span>
        </Link>

        <LogoutButton />
      </div>
    </div>
  );
}