"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuid } from "uuid";

type Props = {
  image?: string;
  imagePath?: string;
};

export default function ImageUpload({
  image,
  imagePath,
}: Props) {
  const [uploading, setUploading] = useState(false);

  const [imageUrl, setImageUrl] = useState(image ?? "");
  const [storagePath, setStoragePath] = useState(imagePath ?? "");

  async function uploadImage(
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

    setImageUrl(data.publicUrl);
    setStoragePath(fileName);

    setUploading(false);
  }

  return (
    <div className="space-y-4">

      <input
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        onChange={uploadImage}
        className="w-full rounded-xl border p-3"
      />

      {uploading && (
        <p className="text-sm text-gray-500">
          Uploading...
        </p>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Product"
          className="h-48 rounded-xl border object-cover"
        />
      )}

      <input
        type="hidden"
        name="image"
        value={imageUrl}
      />

      <input
        type="hidden"
        name="image_path"
        value={storagePath}
      />

    </div>
  );
}