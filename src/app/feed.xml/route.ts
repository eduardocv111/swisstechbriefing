import { getLatestArticles, type UiArticle } from "@/lib/articles.repo";
import { SITE_CONFIG } from "@/lib/seo/site";

export const runtime = "nodejs";
export const revalidate = 3600; // Cache 1h

export async function GET() {
  const articles = await getLatestArticles('de-CH', 20);

  const itemsXml = articles
    .map((article: UiArticle) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_CONFIG.url}/artikel/${article.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/artikel/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${article.excerpt}]]></description>
      <category><![CDATA[${article.category}]]></category>
    </item>`)
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${SITE_CONFIG.description}</description>
    <language>de-CH</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
