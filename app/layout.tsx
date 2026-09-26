import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ramani-ecommerce.vercel.app"),

  title: {
    default: "Ramani | Women's Fashion",
    template: "%s | Ramani",
  },

  description:
    "Shop women's fashion at Ramani — discover sarees, dresses, kurtas, tops and more, designed for every occasion.",

  applicationName: "Ramani",

  openGraph: {
    title: "Ramani | Women's Fashion",
    description:
      "Discover elegant women's fashion at Ramani — sarees, dresses, kurtas, tops and more.",
    url: "https://ramani-ecommerce.vercel.app",
    siteName: "Ramani",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ramani | Women's Fashion",
    description:
      "Discover elegant women's fashion at Ramani — sarees, dresses, kurtas, tops and more.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <AnnouncementBar />

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />

      </body>
    </html>
  );
}