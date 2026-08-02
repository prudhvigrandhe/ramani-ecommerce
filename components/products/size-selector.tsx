"use client";

type Props = {
  size: string;
  setSize: (size: string) => void;
};

const sizes = ["S", "M", "L", "XL"];

export default function SizeSelector({
  size,
  setSize,
}: Props) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Select Size</h3>

      <div className="flex gap-3">
        {sizes.map((item) => (
          <button
            key={item}
            onClick={() => setSize(item)}
            className={`h-12 w-12 rounded-full border transition ${
              size === item
                ? "bg-[#5B214B] text-white border-[#5B214B]"
                : "hover:border-[#5B214B]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}