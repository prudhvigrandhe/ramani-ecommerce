"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  quantity: number;
  setQuantity: (value: number) => void;
};

export default function QuantitySelector({
  quantity,
  setQuantity,
}: Props) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Quantity</h3>

      <div className="flex w-fit items-center rounded-xl border">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-3"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="px-6 font-semibold">
          {quantity}
        </span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="p-3"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}