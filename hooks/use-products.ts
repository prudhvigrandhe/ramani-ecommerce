"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/types";

export function useProducts(
  initialCategory: string = "All",
  initialSearch: string = ""
) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] =
    useState(initialCategory);
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setError("");

        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Failed to load products.");
        }

        const data: Product[] = await res.json();

        setAllProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let data = [...allProducts];

    if (search.trim()) {
      const term = search.trim().toLowerCase();

      data = data.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(term) ||
          product.category
            .toLowerCase()
            .includes(term) ||
          product.description
            .toLowerCase()
            .includes(term)
      );
    }

    if (category !== "All") {
      data = data.filter(
        (product) =>
          product.category === category
      );
    }

    switch (sort) {
      case "Price: Low to High":
        data.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "Price: High to Low":
        data.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "Popularity":
        data.sort(
          (a, b) => b.rating - a.rating
        );
        break;
    }

    return data;
  }, [
    allProducts,
    search,
    category,
    sort,
  ]);

  return {
    products: filteredProducts,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
  };
}