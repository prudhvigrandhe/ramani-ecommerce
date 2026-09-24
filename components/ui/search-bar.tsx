"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch =
    searchParams.get("search") ?? "";

  const [search, setSearch] =
    useState(currentSearch);

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const value = search.trim();

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(
      `/products?${params.toString()}`
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full max-w-md"
    >
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search products..."
        className="w-full rounded-full border py-2 pl-10 pr-4 outline-none focus:border-[#5B214B]"
      />
    </form>
  );
}