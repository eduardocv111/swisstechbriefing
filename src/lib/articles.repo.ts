import { prisma } from "@/lib/db";
import { defaultLocale } from "@/i18n/config";
import { normalizeLocale } from "@/lib/i18n";

export type Source = {
  name: string;
  url: string;
};

export type UiArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  datePublished: string;
  publishedAt: string;
  dateModified: string;
  image: string;
  sources: Source[];
  author: {
    name: string;
    role?: string | null;
  };
  contentHtml: string;
  // i18n metadata
  locale: string;
  isFallback: boolean;
  availableLocales: string[];
};

const FALLBACK_IMAGE = "/assets/images/news/default-news.svg";

function isValidSource(value: unknown): value is Source {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" && v.name.trim().length > 0 &&
    typeof v.url === "string" && v.url.trim().length > 0
  );
}

function safeJsonParseSources(raw: string | null | undefined): Source[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidSource).map((s) => ({
      name: s.name.trim(),
      url: s.url.trim(),
    }));
  } catch {
    return [];
  }
}

function sanitizeText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\uFFFD/g, "ü")
    .replace(/\u00C3\u00BC/g, "ü")
    .replace(/\u00C3\u00A4/g, "ä")
    .replace(/\u00C3\u00B6/g, "ö")
    .replace(/\u00C3\u009C/g, "Ü")
    .replace(/\u00C3\u0084/g, "Ä")
    .replace(/\u00C3\u0096/g, "Ö")
    .replace(/\u00C3\u009F/g, "ß");
}

/**
 * Maps DB Article with its translations to UiArticle for a specific locale
 */
function mapDbToUi(article: any, locale: string): UiArticle {
  const normLocale = normalizeLocale(locale);
  const translations = article.translations || [];
  const availableLocales = translations.map((t: any) => t.locale);

  // Find translation for targetLocale, or fall back to defaultLocale, or first available
  let trans = translations.find((t: any) => t.locale === normLocale);
  let isFallback = false;

  if (!trans && normLocale !== defaultLocale) {
    trans = translations.find((t: any) => t.locale === defaultLocale);
    isFallback = true;
  }

  // Final emergency fallback if neither target nor default exists
  if (!trans && translations.length > 0) {
    trans = translations[0];
    isFallback = true;
  }

  const sources = safeJsonParseSources(article.sourcesJson);
  const image = article.imageUrl && article.imageUrl.trim() !== "" ? article.imageUrl : FALLBACK_IMAGE;

  return {
    id: article.id,
    slug: article.slug,
    title: sanitizeText(trans?.title || "Untitled"),
    excerpt: sanitizeText(trans?.excerpt || ""),
    category: article.category,
    datePublished: article.date.toISOString(),
    publishedAt: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    image,
    sources,
    author: {
      name: article.authorName,
      role: article.authorRole ?? null,
    },
    contentHtml: sanitizeText(trans?.contentHtml || ""),
    locale: trans?.locale || normLocale,
    isFallback,
    availableLocales,
  };
}

export async function getLatestArticles(locale: string, limit = 30): Promise<UiArticle[]> {
  const normLocale = normalizeLocale(locale);
  const rows = await prisma.article.findMany({
    take: limit,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: { translations: true },
  });

  return rows.map((r) => mapDbToUi(r, normLocale));
}

export async function getArticleBySlug(locale: string, slug: string): Promise<UiArticle | null> {
  const normLocale = normalizeLocale(locale);
  const row = await prisma.article.findFirst({
    where: { slug },
    include: { translations: true },
  });

  return row ? mapDbToUi(row, normLocale) : null;
}

export async function getRelatedArticles(
  locale: string,
  category: string,
  currentSlug: string,
  limit = 3
): Promise<UiArticle[]> {
  const normLocale = normalizeLocale(locale);
  const rows = await prisma.article.findMany({
    where: {
      category,
      NOT: { slug: currentSlug },
    },
    take: limit,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: { translations: true },
  });

  return rows.map((r) => mapDbToUi(r, normLocale));
}

export async function getArticlesByCategory(
  locale: string,
  category: string,
  limit = 50
): Promise<UiArticle[]> {
  const normLocale = normalizeLocale(locale);
  const rows = await prisma.article.findMany({
    where: { category },
    take: limit,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: { translations: true },
  });

  return rows.map((r) => mapDbToUi(r, normLocale));
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const rows = await prisma.article.findMany({
    select: { slug: true },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });

  return rows.map((r) => r.slug).filter(Boolean);
}

export async function searchArticles(
  locale: string,
  query: string,
  limit = 20
): Promise<UiArticle[]> {
  if (!query.trim()) return [];
  const normLocale = normalizeLocale(locale);
  const lowQuery = query.toLowerCase();

  // 1. Try to find articles matching in the requested locale
  let rows = await prisma.article.findMany({
    where: {
      OR: [
        { slug: { contains: lowQuery } },
        {
          translations: {
            some: {
              locale: normLocale,
              OR: [
                { title: { contains: lowQuery } },
                { excerpt: { contains: lowQuery } }
              ]
            }
          }
        }
      ]
    },
    take: limit,
    include: { translations: true },
    orderBy: { createdAt: "desc" },
  });

  // 2. If no results and we are not already in the default locale, try the default locale
  if (rows.length === 0 && normLocale !== defaultLocale) {
    rows = await prisma.article.findMany({
      where: {
        translations: {
          some: {
            locale: defaultLocale,
            OR: [
              { title: { contains: lowQuery } },
              { excerpt: { contains: lowQuery } }
            ]
          }
        }
      },
      take: limit,
      include: { translations: true },
      orderBy: { createdAt: "desc" },
    });
  }

  return rows.map((r) => mapDbToUi(r, normLocale));
}