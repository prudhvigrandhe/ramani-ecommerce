"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuid } from "uuid";
import { X } from "lucide-react";

type Props = {
  mainImage?: string;
  galleryImages?: string[];
};

function getSafeFileName(file: File) {
  const extension = file.name.includes(".")
    ? file.name.split(".").pop()?.toLowerCase()
    : "";

  return `${uuid()}${extension ? `.${extension}` : ""}`;
}

function verifyImageLoads(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      resolve(true);
    };

    image.onerror = () => {
      resolve(false);
    };

    image.src = url;
  });
}

export default function ProductImagesUpload({
  mainImage = "",
  galleryImages = [],
}: Props) {
  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(mainImage);

  const [images, setImages] =
    useState<string[]>(galleryImages);

  const [mainImageValid, setMainImageValid] =
    useState(Boolean(mainImage));

  async function uploadMainImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setMainImageValid(false);

    const fileName = getSafeFileName(file);

    try {
      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (error) {
        alert(`Image upload failed: ${error.message}`);
        return;
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      const isValid = await verifyImageLoads(
        publicUrl
      );

      if (!isValid) {
        await supabase.storage
          .from("products")
          .remove([fileName]);

        alert(
          "The image was uploaded but could not be displayed. The product was not updated."
        );

        return;
      }

      setImage(publicUrl);
      setMainImageValid(true);
    } catch (error) {
      console.error(error);

      await supabase.storage
        .from("products")
        .remove([fileName]);

      alert(
        "Something went wrong while uploading the image."
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function uploadGalleryImages(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(e.target.files ?? []);

    if (!files.length) return;

    const remaining = 3 - images.length;

    if (remaining <= 0) {
      alert("Maximum 3 gallery images.");
      e.target.value = "";
      return;
    }

    const filesToUpload = files.slice(0, remaining);

    setUploading(true);

    const uploadedImages: string[] = [];

    try {
      for (const file of filesToUpload) {
        const fileName = getSafeFileName(file);

        try {
          const { error } = await supabase.storage
            .from("products")
            .upload(fileName, file);

          if (error) {
            alert(
              `Gallery image upload failed: ${error.message}`
            );
            continue;
          }

          const { data } = supabase.storage
            .from("products")
            .getPublicUrl(fileName);

          const publicUrl = data.publicUrl;

          const isValid = await verifyImageLoads(
            publicUrl
          );

          if (!isValid) {
            await supabase.storage
              .from("products")
              .remove([fileName]);

            alert(
              "One gallery image could not be displayed and was not added."
            );

            continue;
          }

          uploadedImages.push(publicUrl);
        } catch (error) {
          console.error(error);

          await supabase.storage
            .from("products")
            .remove([fileName]);

          alert(
            "One gallery image could not be uploaded."
          );
        }
      }

      if (uploadedImages.length > 0) {
        setImages((previous) => [
          ...previous,
          ...uploadedImages,
        ]);
      }
    } finally {
      setUploading(false);

      // Allows selecting the same files again later.
      e.target.value = "";
    }
  }

  function removeGalleryImage(index: number) {
    setImages((previous) =>
      previous.filter((_, i) => i !== index)
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
          accept="image/*"
          onChange={uploadMainImage}
          disabled={uploading}
        />

        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Main"
              className="h-60 rounded-xl border object-cover"
              onError={() => {
                setMainImageValid(false);
              }}
              onLoad={() => {
                setMainImageValid(true);
              }}
            />

            {!mainImageValid && (
              <p className="mt-2 text-sm font-medium text-red-600">
                This image could not be displayed.
              </p>
            )}
          </div>
        )}

        {!image && (
          <p className="mt-3 text-sm text-gray-500">
            Please upload a main product image.
          </p>
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
            accept="image/*"
            multiple
            onChange={uploadGalleryImages}
            disabled={uploading}
          />
        )}

        <div className="mt-6 grid grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div
              key={img}
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
          Uploading and verifying image...
        </p>
      )}

      <input
        type="hidden"
        name="image"
        value={mainImageValid ? image : ""}
      />

      <input
        type="hidden"
        name="images"
        value={JSON.stringify(images)}
      />
    </div>
  );
}