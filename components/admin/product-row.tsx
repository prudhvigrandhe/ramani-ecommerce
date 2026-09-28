import Image from "next/image";
import { Pencil, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import Link from "next/link";
import DeleteProductButton from "./delete-product-button";

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
        {product.is_published ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Published
          </span>
        ) : (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
            Draft
          </span>
        )}
      </td>

      <td className="p-4">
        <div className="flex gap-3">
          {!product.is_published && (
            <Link
              href={`/admin/preview-product/${product.id}`}
              className="text-purple-600 transition hover:text-purple-800"
              title="Preview product"
            >
              <Eye className="h-5 w-5" />
            </Link>
          )}

          <Link
            href={`/admin/edit-product/${product.id}`}
            className="text-blue-600 transition hover:text-blue-800"
            title="Edit product"
          >
            <Pencil className="h-5 w-5" />
          </Link>

          <DeleteProductButton productId={product.id} />
        </div>
      </td>
    </tr>
  );
}