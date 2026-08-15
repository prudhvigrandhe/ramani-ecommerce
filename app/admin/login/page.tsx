"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialState = {
  error: "",
  success: false,
};

export default function AdminLoginPage() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    login,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/admin");
    }
  }, [state, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <form
        action={formAction}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-8 text-center text-3xl font-bold">
          Admin Login
        </h1>

        <div className="space-y-5">

          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full rounded-xl border p-3 outline-none focus:border-[#5B214B]"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border p-3 outline-none focus:border-[#5B214B]"
          />

          {state.error && (
            <p className="text-sm font-medium text-red-600">
              {state.error}
            </p>
          )}

          <button
            disabled={pending}
            className="w-full rounded-xl bg-[#5B214B] py-3 font-semibold text-white transition hover:bg-[#431736] disabled:opacity-50"
          >
            {pending ? "Logging in..." : "Login"}
          </button>

        </div>

      </form>

    </main>
  );
}