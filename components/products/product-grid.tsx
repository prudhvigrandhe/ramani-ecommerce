import ProductCard from "@/components/products/product-card";
import { Product } from "@/lib/types";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <section className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}