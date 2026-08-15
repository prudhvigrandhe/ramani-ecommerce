"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/types";

export function useProducts(initialCategory: string = "All") {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
const [category, setCategory] = useState(initialCategory);
const [sort, setSort] = useState("Newest");

useEffect(() => {
  setCategory(initialCategory);
}, [initialCategory]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let data = [...allProducts];

    if (search) {
      const term = search.toLowerCase();

      data = data.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    if (category !== "All") {
      data = data.filter(
        (product) => product.category === category
      );
    }

    switch (sort) {
      case "Price: Low to High":
        data.sort((a, b) => a.price - b.price);
        break;

      case "Price: High to Low":
        data.sort((a, b) => b.price - a.price);
        break;

      case "Popularity":
        data.sort((a, b) => b.rating - a.rating);
        break;
    }

    return data;
  }, [allProducts, search, category, sort]);

  return {
    products: filteredProducts,
    loading,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
  };
}