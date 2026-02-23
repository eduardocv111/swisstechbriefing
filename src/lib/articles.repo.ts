import { prisma } from "@/lib/db";

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

  // ✅ Fecha editorial (lo que enseñas al usuario)
  datePublished: string;

  // ✅ Publicación real (SEO/Discover)
  publishedAt: string;

  // ✅ Última modificación real (SEO/Discover)
  dateModified: string;

  image: string;
  sources: Source[];
  author: {
    name: string;
    role?: string | null;
  };
  contentHtml: string;
};

// ✅ Ruta real según tu carpeta:
// public/assets/images/news/default-news.svg
const FALLBACK_IMAGE = "/assets/images/news/default-news.svg";

type DbArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;

  // fecha editorial
  date: Date;

  // fechas técnicas
  createdAt: Date;
  updatedAt: Date;

  imageUrl: string | null;
  sourcesJson: string | null;
  authorName: string;
  authorRole: string | null;
  contentHtml: string | null;
};

function isValidSource(value: unknown): value is Source {
  if (!value || typeof value !== "object") return false;

  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    v.name.trim().length > 0 &&
    typeof v.url === "string" &&
    v.url.trim().length > 0
  );
}

function safeJsonParseSources(raw: string | null | undefined): Source[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
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
  return text.replace(/\uFFFD/g, "ü"); // Tentatively map diamond to 'ü' as it's the most common failure in 'fhren'
}

function mapDbToUi(a: DbArticle): UiArticle {
  const sources = safeJsonParseSources(a.sourcesJson);

  const image =
    a.imageUrl && a.imageUrl.trim() !== "" ? a.imageUrl : FALLBACK_IMAGE;

  return {
    id: a.id,
    slug: a.slug,
    title: sanitizeText(a.title),
    excerpt: sanitizeText(a.excerpt),
    category: a.category,

    // ✅ UI (editorial)
    datePublished: a.date.toISOString(),

    // ✅ SEO/Discover (publicación real)
    publishedAt: a.createdAt.toISOString(),

    // ✅ SEO/Discover (modificación real)
    dateModified: a.updatedAt.toISOString(),

    image,
    sources,
    author: {
      name: a.authorName,
      role: a.authorRole ?? null,
    },
    contentHtml: sanitizeText(a.contentHtml ?? ""),
  };
}

/**
 * ✅ Para Home / feeds
 * Ordenado por publicación real (createdAt), no por fecha editorial.
 */
export async function getLatestArticles(limit = 30): Promise<UiArticle[]> {
  const rows = await prisma.article.findMany({
    take: limit,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });

  return rows.map((r) => mapDbToUi(r as unknown as DbArticle));
}

/**
 * ✅ Workaround Prisma 7.4.1 + sqlite adapter
 * findUnique() puede provocar panic interno en algunos casos.
 */
export async function getArticleBySlug(slug: string): Promise<UiArticle | null> {
  const row = await prisma.article.findFirst({
    where: { slug },
  });

  return row ? mapDbToUi(row as unknown as DbArticle) : null;
}

export async function getRelatedArticles(
  category: string,
  currentSlug: string,
  limit = 3
): Promise<UiArticle[]> {
  const rows = await prisma.article.findMany({
    where: {
      category,
      NOT: { slug: currentSlug },
    },
    take: limit,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });

  return rows.map((r) => mapDbToUi(r as unknown as DbArticle));
}

/**
 * ✅ Necesario para generateStaticParams() en app/artikel/[slug]/page.tsx
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  const rows = await prisma.article.findMany({
    select: { slug: true },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });

  return rows.map((r) => r.slug).filter(Boolean);
}