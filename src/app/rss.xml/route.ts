import { ARTICLES } from '@/lib/data/mock';
import { SITE_CONFIG } from '@/lib/seo/site';

export async function GET() {
    const baseUrl = SITE_CONFIG.url;

    // Get latest 20 articles sorted by date (mock.ts is already somewhat ordered, but let's be safe)
    const latestArticles = [...ARTICLES]
        .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
        .slice(0, 20);

    const rssItems = latestArticles
        .map((article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}/artikel/${article.slug}</link>
      <description>${escapeXml(article.excerpt)}</description>
      <category>${escapeXml(article.category)}</category>
      <pubDate>${new Date(article.datePublished).toUTCString()}</pubDate>
      <guid>${baseUrl}/artikel/${article.slug}</guid>
    </item>`)
        .join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>de-CH</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rssFeed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}

function escapeXml(unsafe: string) {
    return unsafe.replace(/[<>&"']/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return c;
        }
    });
}
