import type { MetadataRoute } from "next";
import { prisma } from "@/db/prisma";
import { SERVER_URL } from "@/lib/constants";

// Regenera o sitemap no máximo uma vez por hora.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    select: { slug: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return [
    { url: SERVER_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SERVER_URL}/search`, changeFrequency: "daily", priority: 0.8 },
    ...products.map((product) => ({
      url: `${SERVER_URL}/product/${product.slug}`,
      lastModified: product.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
