"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const originalPrice = Number(formData.get("originalPrice"));
  const rating = Number(formData.get("rating"));
  const description = formData.get("description") as string;
  const categoryId = Number(formData.get("category"));

  const image = formData.get("image") as string;

  const images = JSON.parse(
    (formData.get("images") as string) || "[]"
  );

  const availableSizes = formData.getAll(
    "available_sizes"
  ) as string[];

  // Product Specifications
  const fabric = formData.get("fabric") as string;
  const fit = formData.get("fit") as string;
  const occasion = formData.get("occasion") as string;
  const sleeve = formData.get("sleeve") as string;
  const washCare = formData.get("wash_care") as string;
  const color = formData.get("color") as string;
  const pattern = formData.get("pattern") as string;
  const sku = formData.get("sku") as string;

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
      stock: true,
      category_id: categoryId,
      available_sizes: availableSizes,

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
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const originalPrice = Number(
    formData.get("originalPrice")
  );
  const rating = Number(formData.get("rating"));
  const description = formData.get(
    "description"
  ) as string;
  const categoryId = Number(
    formData.get("category")
  );

  const image = formData.get("image") as string;

  const images = JSON.parse(
    (formData.get("images") as string) || "[]"
  );

  const availableSizes = formData.getAll(
    "available_sizes"
  ) as string[];

  // Product Specifications
  const fabric = formData.get("fabric") as string;
  const fit = formData.get("fit") as string;
  const occasion = formData.get("occasion") as string;
  const sleeve = formData.get("sleeve") as string;
  const washCare = formData.get("wash_care") as string;
  const color = formData.get("color") as string;
  const pattern = formData.get("pattern") as string;
  const sku = formData.get("sku") as string;

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

      available_sizes: availableSizes,

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