import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_CONFIG } from "@/lib/seo/site";
import { locales } from "@/i18n/config";

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

import { CATEGORIES } from "@/lib/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    include: { translations: true },
    orderBy: { createdAt: "desc" },
  });

  const routes: MetadataRoute.Sitemap = [];

  // Home and static pages for each locale
  for (const locale of locales) {
    const staticPages = [
      '',
      '/ueber-uns',
      '/kontakt',
      '/newsletter',
      '/impressum',
      '/datenschutz',
    ];

    staticPages.forEach(p => {
      // Build alternates for static pages
      const languages: Record<string, string> = {};
      locales.forEach(l => {
        languages[l] = `${BASE}/${l}${p}`;
      });

      routes.push({
        url: `${BASE}/${locale}${p}`,
        lastModified: new Date(),
        alternates: {
          languages,
        }
      });
    });

    // Categories for each locale
    CATEGORIES.forEach(cat => {
      const languages: Record<string, string> = {};
      locales.forEach(l => {
        languages[l] = `${BASE}/${l}/kategorie/${cat.slug}`;
      });

      routes.push({
        url: `${BASE}/${locale}/kategorie/${cat.slug}`,
        lastModified: new Date(),
        alternates: {
          languages,
        }
      });
    });

    // Articles for each locale
    articles.forEach(a => {
      // Only include if translation exists for this locale
      const hasTranslation = a.translations.some(t => t.locale === locale);
      if (hasTranslation) {
        const languages: Record<string, string> = {};
        // Only point to locales that have this specific translation
        a.translations.forEach(t => {
          languages[t.locale] = `${BASE}/${t.locale}/artikel/${a.slug}`;
        });

        routes.push({
          url: `${BASE}/${locale}/artikel/${a.slug}`,
          lastModified: a.updatedAt,
          alternates: {
            languages,
          }
        });
      }
    });
  }

  return routes;
}