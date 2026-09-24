"use server";

import { cookies } from "next/headers";
import { createAdminSessionToken } from "@/lib/admin/auth";

export async function login(
  prevState: { error: string },
  formData: FormData
) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { error: "Invalid username or password." };
  }

  const cookieStore = await cookies();

  const sessionToken = await createAdminSessionToken();

  cookieStore.set("admin-session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return {
    error: "",
    success: true,
  };
}