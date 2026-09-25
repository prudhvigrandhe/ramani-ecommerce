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
    <section className="mt-12 sm:mt-20">
      <h2 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
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