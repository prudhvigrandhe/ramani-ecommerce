import ProductCard from "./product-card";
import type { Product } from "@/lib/types";
import { getRelatedProducts } from "@/lib/get-related-products";

type Props = {
  currentProduct: Product;
};

export default async function RelatedProducts({
  currentProduct,
}: Props) {
  const relatedProducts = await getRelatedProducts(
    currentProduct.category,
    currentProduct.id
  );

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold">
        You May Also Like
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}