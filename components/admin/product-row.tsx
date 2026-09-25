import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "@/lib/types";
import { deleteProduct } from "@/app/admin/actions";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function ProductRow({ product }: Props) {
  return (
    <tr className="border-b">
      <td className="p-4">
        <div className="relative h-[60px] w-[60px] overflow-hidden rounded-lg bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="60px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
              No image
            </div>
          )}
        </div>
      </td>

      <td className="p-4 font-medium">
        {product.name}
      </td>

      <td className="p-4">
        {product.category}
      </td>

      <td className="p-4">
        ₹{product.price}
      </td>

      <td className="p-4">
        ⭐ {product.rating}
      </td>

      <td className="p-4">
        <div className="flex gap-3">
          <Link
            href={`/admin/edit-product/${product.id}`}
            className="text-blue-600 transition hover:text-blue-800"
            title="Edit product"
          >
            <Pencil className="h-5 w-5" />
          </Link>

          <form
            action={async () => {
              "use server";
              await deleteProduct(product.id);
            }}
          >
            <button
              type="submit"
              className="text-red-600 transition hover:text-red-800"
              title="Delete product"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}