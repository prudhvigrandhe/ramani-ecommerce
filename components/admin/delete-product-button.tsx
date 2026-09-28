"use client";

import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/admin/actions";

type Props = {
  productId: number;
};

export default function DeleteProductButton({ productId }: Props) {
  return (
    <form
      action={async () => {
        await deleteProduct(productId);
      }}
    >
      <button
        type="submit"
        onClick={(event) => {
          const confirmed = window.confirm(
            "Are you sure you want to delete this product?\n\nThis action cannot be undone."
          );

          if (!confirmed) {
            event.preventDefault();
          }
        }}
        className="text-red-600 transition hover:text-red-800"
        title="Delete product"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </form>
  );
}