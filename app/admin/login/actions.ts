"use server";

import { cookies } from "next/headers";

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
    return {
      error: "Invalid username or password.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("admin-session", "logged-in", {
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