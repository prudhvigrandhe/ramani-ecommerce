import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";

type Props = {
  product: Product;
};

export default function ProductBreadcrumb({ product }: Props) {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
      <Link
        href="/"
        className="transition hover:text-[#5B214B]"
      >
        Home
      </Link>

      <ChevronRight className="h-4 w-4" />

      <Link
        href="/products"
        className="transition hover:text-[#5B214B]"
      >
        Products
      </Link>

      <ChevronRight className="h-4 w-4" />

      <Link
        href={`/products?category=${product.category}`}
        className="transition hover:text-[#5B214B]"
      >
        {product.category}
      </Link>

      <ChevronRight className="h-4 w-4" />

      <span className="font-medium text-[#5B214B]">
        {product.name}
      </span>
    </nav>
  );
}