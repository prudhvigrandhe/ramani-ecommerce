"use client";

type Props = {
  sizes: string[];
  size: string;
  setSize: (size: string) => void;
};

const ALL_SIZES = ["XS", "S", "M", "L", "XL"];

export default function SizeSelector({
  sizes,
  size,
  setSize,
}: Props) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Select Size</h3>

      <div className="flex flex-wrap gap-3">
        {ALL_SIZES.map((item) => {
          const available = sizes.includes(item);

          return (
            <button
              key={item}
              type="button"
              disabled={!available}
              onClick={() => available && setSize(item)}
              className={`h-12 w-12 rounded-full border font-medium transition ${
                !available
                  ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 line-through"
                  : size === item
                  ? "border-[#5B214B] bg-[#5B214B] text-white"
                  : "hover:border-[#5B214B]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {!sizes.includes(size) && (
        <p className="text-sm font-medium text-red-600">
          Selected size is currently unavailable.
        </p>
      )}
    </div>
  );
}