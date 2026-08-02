"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";

type Props = {
  product: Product;
};

export default function ProductGallery({ product }: Props) {
  // Future ready: later these will come from the database
  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

console.log("Product:", product);
console.log("Image URL:", product.image);

  return (
    <div className="space-y-5">

      {/* Main Image */}

      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border bg-white shadow-sm">

        <Image
          src={selectedImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width:1024px)100vw,50vw"
          className="object-cover transition duration-500 hover:scale-105"
        />

      </div>

      {/* Thumbnails */}

      <div className="grid grid-cols-4 gap-4">

        {images.map((image, index) => (

          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
              selectedImage === image
                ? "border-[#5B214B]"
                : "border-gray-200 hover:border-[#5B214B]"
            }`}
          >

            <Image
              src={image}
              alt={`${product.name}-${index}`}
              fill
              sizes="120px"
              className="object-cover"
            />

          </button>

        ))}

      </div>

    </div>
  );
}