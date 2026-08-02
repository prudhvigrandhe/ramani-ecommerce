import ProductsClient from "./products-client";

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <ProductsClient
      initialCategory={params.category ?? "All"}
    />
  );
}