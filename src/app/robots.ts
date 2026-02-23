import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo/site";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}