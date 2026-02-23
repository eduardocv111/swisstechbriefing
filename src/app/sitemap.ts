import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_CONFIG } from "@/lib/seo/site";

export const revalidate = 3600; // 1h ISR

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const articleUrls = articles.map((a) => ({
    url: `${BASE}/artikel/${a.slug}`,
    lastModified: a.updatedAt,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
    },
    ...articleUrls,
    // ── Static pages ──
    { url: `${BASE}/ueber-uns`, lastModified: new Date() },
    { url: `${BASE}/kontakt`, lastModified: new Date() },
    { url: `${BASE}/newsletter`, lastModified: new Date() },
    // ── Legal pages ──
    { url: `${BASE}/impressum`, lastModified: new Date() },
    { url: `${BASE}/datenschutz`, lastModified: new Date() },
    { url: `${BASE}/cookie-richtlinie`, lastModified: new Date() },
  ];
}