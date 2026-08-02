"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OrderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(
    searchParams.get("search") ?? ""
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    router.push(`/admin/orders?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mb-6 flex gap-3"
    >
      <input
        type="text"
        placeholder="Search by Order No, Customer or Phone"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#5B214B]"
      />

      <button
        type="submit"
        className="rounded-lg bg-[#5B214B] px-6 text-white hover:bg-[#431736]"
      >
        Search
      </button>
    </form>
  );
}