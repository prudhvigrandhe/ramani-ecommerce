"use client";

import { Search, SlidersHorizontal } from "lucide-react";

const categories = [
  "All",
  "Dresses",
  "Sarees",
  "Kurtas",
  "Tops",
];

type Props = {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
};

export default function ProductToolbar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}: Props) {
  return (
    <section className="mb-10 rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-[#5B214B]"
          />
        </div>

        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5 text-[#5B214B]" />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-3"
          >
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Popularity</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              category === item
                ? "bg-[#5B214B] text-white"
                : "border border-gray-300 hover:border-[#5B214B] hover:text-[#5B214B]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}