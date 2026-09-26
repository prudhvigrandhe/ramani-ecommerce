import type { MetadataRoute } from "next";

const baseUrl = "https://ramani-ecommerce.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/checkout/",
        "/cart/",
        "/wishlist/",
        "/orders/",
        "/order-success/",
      ],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}