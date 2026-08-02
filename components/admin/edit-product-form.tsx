import ProductForm from "./product-form";
import { updateProduct } from "@/app/admin/actions";
import { Product } from "@/lib/types";

type Category = {
  id: number;
  name: string;
};


type Props = {
  product: Product;
  categories: Category[];
};

export default function EditProductForm({
  product,
  categories,
}: Props) {
  async function update(formData: FormData) {
    "use server";

    await updateProduct(product.id, formData);
  }

  return (
    <ProductForm
      categories={categories}
      product={product}
      action={update}
    />
  );
}