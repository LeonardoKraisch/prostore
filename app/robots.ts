import type { MetadataRoute } from "next";
import { SERVER_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/user/",
        "/order/",
        "/cart",
        "/shipping-address",
        "/payment-method",
        "/place-order",
      ],
    },
    sitemap: `${SERVER_URL}/sitemap.xml`,
  };
}
