"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";

const availableSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "Free Size",
];

function getSizeStock(formData: FormData) {
  const sizeStock: Record<string, number> = {};

  for (const size of availableSizes) {
    const value = Number(
      formData.get(`stock_${size}`)
    );

    if (Number.isFinite(value) && value > 0) {
      sizeStock[size] = Math.floor(value);
    }
  }

  return sizeStock;
}

function isValidImageUrl(value: string) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      url.pathname.length > 1
    );
  } catch {
    return false;
  }
}

function getProductImages(formData: FormData) {
  const image = String(
    formData.get("image") ?? ""
  ).trim();

  if (!isValidImageUrl(image)) {
    throw new Error(
      "A valid main product image is required."
    );
  }

  let images: string[];

  try {
    images = JSON.parse(
      String(formData.get("images") ?? "[]")
    );
  } catch {
    throw new Error("Invalid gallery images.");
  }

  if (!Array.isArray(images)) {
    throw new Error("Invalid gallery images.");
  }

  const validGalleryImages = images.filter(
    (item): item is string =>
      typeof item === "string" &&
      isValidImageUrl(item)
  );

  if (validGalleryImages.length !== images.length) {
    throw new Error(
      "One or more gallery images are invalid."
    );
  }

  return {
    image,
    images: validGalleryImages,
  };
}

export async function addProduct(formData: FormData) {
  await requireAdmin();

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  const price = Number(formData.get("price"));

  const originalPrice = Number(
    formData.get("originalPrice")
  );

  const rating = Number(
    formData.get("rating")
  );

  const description = String(
    formData.get("description") ?? ""
  );

  const categoryId = Number(
    formData.get("category")
  );

  const {
    image,
    images,
  } = getProductImages(formData);

  const selectedSizes = formData.getAll(
    "available_sizes"
  ) as string[];

  const sizeStock = getSizeStock(formData);

  // Product Specifications
  const fabric = String(
    formData.get("fabric") ?? ""
  );

  const fit = String(
    formData.get("fit") ?? ""
  );

  const occasion = String(
    formData.get("occasion") ?? ""
  );

  const sleeve = String(
    formData.get("sleeve") ?? ""
  );

  const washCare = String(
    formData.get("wash_care") ?? ""
  );

  const color = String(
    formData.get("color") ?? ""
  );

  const pattern = String(
    formData.get("pattern") ?? ""
  );

  const sku = String(
    formData.get("sku") ?? ""
  );

  const isTrending =
    formData.get("is_trending") === "on";

  const isBestSeller =
    formData.get("is_best_seller") === "on";

  const isNewArrival =
    formData.get("is_new_arrival") === "on";

  const { error } = await supabase
    .from("products")
    .insert({
      name,
      price,
      original_price: originalPrice,
      rating,
      image,
      images,
      description,

      stock:
        Object.keys(sizeStock).length > 0,

      category_id: categoryId,

      available_sizes: selectedSizes,

      size_stock: sizeStock,

      fabric,
      fit,
      occasion,
      sleeve,
      wash_care: washCare,
      color,
      pattern,
      sku,

      is_trending: isTrending,
      is_best_seller: isBestSeller,
      is_new_arrival: isNewArrival,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");

  redirect("/admin");
}

export async function deleteProduct(id: number) {
  await requireAdmin();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
}

export async function updateProduct(
  id: number,
  formData: FormData
) {
  await requireAdmin();

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  const price = Number(formData.get("price"));

  const originalPrice = Number(
    formData.get("originalPrice")
  );

  const rating = Number(
    formData.get("rating")
  );

  const description = String(
    formData.get("description") ?? ""
  );

  const categoryId = Number(
    formData.get("category")
  );

  const {
    image,
    images,
  } = getProductImages(formData);

  const selectedSizes = formData.getAll(
    "available_sizes"
  ) as string[];

  const sizeStock = getSizeStock(formData);

  // Product Specifications
  const fabric = String(
    formData.get("fabric") ?? ""
  );

  const fit = String(
    formData.get("fit") ?? ""
  );

  const occasion = String(
    formData.get("occasion") ?? ""
  );

  const sleeve = String(
    formData.get("sleeve") ?? ""
  );

  const washCare = String(
    formData.get("wash_care") ?? ""
  );

  const color = String(
    formData.get("color") ?? ""
  );

  const pattern = String(
    formData.get("pattern") ?? ""
  );

  const sku = String(
    formData.get("sku") ?? ""
  );

  const isTrending =
    formData.get("is_trending") === "on";

  const isBestSeller =
    formData.get("is_best_seller") === "on";

  const isNewArrival =
    formData.get("is_new_arrival") === "on";

  const { error } = await supabase
    .from("products")
    .update({
      name,
      price,
      original_price: originalPrice,
      rating,
      description,
      category_id: categoryId,

      image,
      images,

      available_sizes: selectedSizes,

      size_stock: sizeStock,

      stock:
        Object.keys(sizeStock).length > 0,

      fabric,
      fit,
      occasion,
      sleeve,
      wash_care: washCare,
      color,
      pattern,
      sku,

      is_trending: isTrending,
      is_best_seller: isBestSeller,
      is_new_arrival: isNewArrival,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath(`/products/${id}`);

  redirect("/admin");
}