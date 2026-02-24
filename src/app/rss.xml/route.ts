import { prisma } from "@/lib/db";
import { SITE_CONFIG } from "@/lib/seo/site";

export const runtime = "nodejs";
export const revalidate = 300; // 5 min ISR

const DEFAULT_LOCALE = "de-CH";

export async function GET() {
  const baseUrl = SITE_CONFIG.url;

  const latestArticles = await prisma.article.findMany({
    take: 20,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: {
      slug: true,
      category: true,
      createdAt: true, // publicación real
      updatedAt: true,
      translations: {
        where: { locale: DEFAULT_LOCALE },
        take: 1,
        select: {
          title: true,
          excerpt: true,
        },
      },
    },
  });

  const rssItems = latestArticles
    .map((article) => {
      const t = article.translations[0];
      const title = t?.title ?? article.slug;
      const excerpt = t?.excerpt ?? "";
      const path = `${DEFAULT_LOCALE}/artikel/${article.slug}`;

      return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${baseUrl}/${path}</link>
      <description>${escapeXml(excerpt)}</description>
      <category>${escapeXml(article.category)}</category>
      <pubDate>${article.createdAt.toUTCString()}</pubDate>
      <guid>${baseUrl}/${path}</guid>
    </item>`;
    })
    .join("");

  const lastBuild =
    latestArticles[0]?.updatedAt?.toUTCString() ?? new Date().toUTCString();

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>de-CH</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      default:
        return c;
    }
  });
}