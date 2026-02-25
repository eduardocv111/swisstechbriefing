import { NextResponse } from 'next/server';
import { getArticleBySlug } from '@/lib/articles.repo';
import { SITE_CONFIG } from '@/lib/seo/site';

/**
 * Helper to ensure absolute image URL
 */
function toAbsoluteUrl(pathOrUrl?: string | null): string {
    if (!pathOrUrl) return `${SITE_CONFIG.url}/assets/images/news/default-news.svg`;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    return `${SITE_CONFIG.url}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/**
 * API v1: Get Single Article Detail
 * Fetches full HTML or data for a specific article
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    // 1. Authorization Check
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.STB_API_KEY) {
        return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'de-CH') as any;

    try {
        const article = await getArticleBySlug(locale, slug);

        if (!article) {
            return NextResponse.json({
                status: 'error',
                message: 'Article not found'
            }, { status: 404 });
        }

        // Clean JSON structure for Mobile App
        return NextResponse.json({
            status: 'success',
            version: '1.0',
            data: {
                id: article.id,
                slug: article.slug,
                title: article.title,
                excerpt: article.excerpt,
                category: article.category,
                imageUrl: toAbsoluteUrl(article.image),
                publishedAt: article.datePublished,
                lastModified: article.dateModified,
                author: {
                    name: article.author?.name || 'Redaktion',
                    role: article.author?.role || 'SwissTech Briefing'
                },
                contentHtml: article.contentHtml, // The App can render this with a WebView or Markdown parser
                sources: article.sources || [],
                webUrl: `${SITE_CONFIG.url}/${locale}/artikel/${article.slug}`
            },
            metadata: {
                locale,
                timestamp: new Date().toISOString()
            }
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600'
            }
        });
    } catch (error) {
        console.error(`[API v1] Error fetching article detail: ${slug}`, error);
        return NextResponse.json({
            status: 'error',
            message: 'Internal server error'
        }, { status: 500 });
    }
}
