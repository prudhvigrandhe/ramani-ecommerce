"use client";

type Props = {
  sizes: string[];
  size: string;
  setSize: (size: string) => void;
  sizeStock: Record<string, number>;
};

const ALL_SIZES = ["XS", "S", "M", "L", "XL"];

export default function SizeSelector({
  sizes,
  size,
  setSize,
  sizeStock,
}: Props) {
  const isFreeSize = sizes.includes("Free Size");

  /*
   * Free Size product
   */
  if (isFreeSize) {
    const available =
      Number(sizeStock?.["Free Size"] ?? 0) > 0;

    return (
      <div className="space-y-3">
        <h3 className="font-semibold">Select Size</h3>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!available}
            onClick={() => {
              if (available) {
                setSize("Free Size");
              }
            }}
            className={`rounded-full border px-6 py-3 font-medium transition ${
              !available
                ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 line-through"
                : size === "Free Size"
                ? "border-[#5B214B] bg-[#5B214B] text-white"
                : "border-gray-300 hover:border-[#5B214B]"
            }`}
          >
            One Size
          </button>
        </div>

        {!available && (
          <p className="text-sm font-medium text-red-600">
            This product is currently unavailable.
          </p>
        )}
      </div>
    );
  }

  /*
   * Normal size-based product
   */
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Select Size</h3>

      <div className="flex flex-wrap gap-3">
        {ALL_SIZES.map((item) => {
          const available =
            sizes.includes(item) &&
            Number(sizeStock?.[item] ?? 0) > 0;

          return (
            <button
              key={item}
              type="button"
              disabled={!available}
              onClick={() => {
                if (available) {
                  setSize(item);
                }
              }}
              className={`h-12 w-12 rounded-full border font-medium transition ${
                !available
                  ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 line-through"
                  : size === item
                  ? "border-[#5B214B] bg-[#5B214B] text-white"
                  : "border-gray-300 hover:border-[#5B214B]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {size &&
        !(
          sizes.includes(size) &&
          Number(sizeStock?.[size] ?? 0) > 0
        ) && (
          <p className="text-sm font-medium text-red-600">
            Selected size is currently unavailable.
          </p>
        )}
    </div>
  );
}