"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const IDLE_TIMEOUT = 20 * 60 * 1000; // 20 minutes

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const logoutForInactivity = () => {
      router.replace("/admin/login");
    };

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        logoutForInactivity();
      }, IDLE_TIMEOUT);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeout);

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [router]);

  return <>{children}</>;
}