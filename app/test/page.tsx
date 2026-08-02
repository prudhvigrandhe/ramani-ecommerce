import { getProducts } from "@/lib/get-products";

export default async function TestPage() {
  const products = await getProducts();

  return (
    <main className="p-10">
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  );
}