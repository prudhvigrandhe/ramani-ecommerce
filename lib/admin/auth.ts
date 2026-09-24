import { cookies } from "next/headers";
import {
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "./auth-core";

const COOKIE_NAME = "admin-session";

export { createAdminSessionToken, verifyAdminSessionToken };

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  if (!session || !(await verifyAdminSessionToken(session))) {
    throw new Error("Unauthorized.");
  }
}