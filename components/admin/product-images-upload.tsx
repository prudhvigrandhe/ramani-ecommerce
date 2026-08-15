"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuid } from "uuid";
import { X } from "lucide-react";

console.log("ProductImagesUpload Loaded");

type Props = {
  mainImage?: string;
  galleryImages?: string[];
};

export default function ProductImagesUpload({
  mainImage = "",
  galleryImages = [],
}: Props) {
  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(mainImage);

  const [images, setImages] =
    useState<string[]>(galleryImages);

  async function uploadMainImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileName = `${uuid()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);

    setUploading(false);
  }

  async function uploadGalleryImages(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(e.target.files ?? []);
  
    if (!files.length) return;
  
    const remaining = 3 - images.length;
  
    if (remaining <= 0) {
      alert("Maximum 3 gallery images.");
      return;
    }
  
    const filesToUpload = files.slice(0, remaining);
  
    setUploading(true);
  
    const uploadedImages: string[] = [];
  
    for (const file of filesToUpload) {
      const fileName = `${uuid()}-${file.name}`;
  
      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);
  
      if (error) {
        alert(error.message);
        continue;
      }
  
      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);
  
      uploadedImages.push(data.publicUrl);
    }
  
    setImages((prev) => [...prev, ...uploadedImages]);
  
    setUploading(false);
  
    // Allows selecting the same files again later
    e.target.value = "";
  }

  function removeGalleryImage(index: number) {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-8">

      {/* Main Image */}

      <div className="rounded-xl border p-6">

        <h2 className="mb-4 text-lg font-semibold">
          Main Image
        </h2>

        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={uploadMainImage}
        />

        {image && (
          <img
            src={image}
            alt="Main"
            className="mt-4 h-60 rounded-xl border object-cover"
          />
        )}

      </div>

      {/* Gallery */}

      <div className="rounded-xl border p-6">

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Gallery Images
          </h2>

          <span className="text-sm text-gray-500">
            {images.length}/3
          </span>

        </div>

        {images.length < 3 && (

<input
type="file"
accept=".png,.jpg,.jpeg,.webp"
multiple
onChange={uploadGalleryImages}
/>

        )}

        <div className="mt-6 grid grid-cols-3 gap-4">

          {images.map((img, index) => (

            <div
              key={index}
              className="relative"
            >

              <img
                src={img}
                alt=""
                className="h-36 w-full rounded-xl border object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  removeGalleryImage(index)
                }
                className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>

            </div>

          ))}

        </div>

      </div>

      {uploading && (
        <p className="text-sm text-gray-500">
          Uploading...
        </p>
      )}

      <input
        type="hidden"
        name="image"
        value={image}
      />

      <input
        type="hidden"
        name="images"
        value={JSON.stringify(images)}
      />

    </div>
  );
}