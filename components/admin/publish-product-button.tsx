"use client";

import { publishProduct } from "@/app/admin/actions";

type Props = {
  productId: number;
};

export default function PublishProductButton({
  productId,
}: Props) {
  return (
    <form
      action={async () => {
        await publishProduct(productId);
      }}
    >
      <button
        type="submit"
        onClick={(event) => {
          const confirmed = window.confirm(
            "Publish this product?\n\nIt will immediately become visible to customers on Ramani."
          );

          if (!confirmed) {
            event.preventDefault();
          }
        }}
        className="rounded-xl bg-[#5B214B] px-5 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Publish Product
      </button>
    </form>
  );
}