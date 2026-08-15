"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";

type Props = {
  product: Product;
};

export default function ProductGallery({
  product,
}: Props) {
  const allImages = useMemo(() => {
    const list = [
      product.image,
      ...(product.images ?? []),
    ];

    return [...new Set(list.filter(Boolean))];
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(
    allImages[0]
  );

  return (
    <div className="space-y-6">
      {/* Main Image */}

      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border bg-white shadow-sm">
        <Image
          key={selectedImage}
          src={selectedImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width:1024px)100vw,50vw"
          className="object-cover transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                selectedImage === image
                  ? "border-[#5B214B] ring-2 ring-[#5B214B]/20"
                  : "border-gray-200 hover:border-[#5B214B]"
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} ${index + 1}`}
                fill
                sizes="150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}