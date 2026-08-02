"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const originalPrice = Number(formData.get("originalPrice"));
  const rating = Number(formData.get("rating"));
  const image = formData.get("image") as string;
  const imagePath = formData.get("image_path") as string;
  const description = formData.get("description") as string;
  const categoryId = Number(formData.get("category"));

  const isTrending = formData.get("is_trending") === "on";
const isBestSeller = formData.get("is_best_seller") === "on";
const isNewArrival = formData.get("is_new_arrival") === "on";

  const { error } = await supabase
    .from("products")
    .insert({
        name,
        price,
        original_price: originalPrice,
        rating,
        image,
        image_path: imagePath,
        description,
        stock: true,
        category_id: categoryId,
      
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
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("image_path")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (product?.image_path) {
    await supabase.storage
      .from("products")
      .remove([product.image_path]);
  }

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
  const originalPrice = Number(formData.get("originalPrice"));
  const rating = Number(formData.get("rating"));
  const description = formData.get("description") as string;
  const categoryId = Number(formData.get("category"));
  const isTrending = formData.get("is_trending") === "on";
const isBestSeller = formData.get("is_best_seller") === "on";
const isNewArrival = formData.get("is_new_arrival") === "on";

  const newImage = formData.get("image") as string;
  const newImagePath = formData.get("image_path") as string;

  // Fetch existing product
  const { data: existing, error: fetchError } = await supabase
    .from("products")
    .select("image,image_path")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  let image = existing.image;
  let image_path = existing.image_path;

  // If user uploaded a new image
  if (
    newImage &&
    newImage !== existing.image
  ) {
    // Delete old storage image
    if (existing.image_path) {
      await supabase.storage
        .from("products")
        .remove([existing.image_path]);
    }

    image = newImage;
    image_path = newImagePath;
  }

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
        image_path,
      
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