import { NextResponse } from 'next/server';
import { getLatestArticles } from '@/lib/articles.repo';
import { CATEGORIES } from '@/lib/categories';
import { SITE_CONFIG } from '@/lib/seo/site';
import { successResponse, errorResponse, validateAuth, checkRateLimit, getClientIp } from '@/lib/api-utils';

/**
 * Helper to ensure absolute image URL
 */
function toAbsoluteUrl(pathOrUrl?: string | null): string {
    if (!pathOrUrl) return `${SITE_CONFIG.url}/assets/images/news/default-news.svg`;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    return `${SITE_CONFIG.url}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/**
 * API v1: Get Full Home Data
 * Featured + Latest + Categories
 */
export async function GET(request: Request) {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
        return errorResponse('Rate limit exceeded', 'TOO_MANY_REQUESTS', 429);
    }

    if (!validateAuth(request)) {
        return errorResponse('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'de-CH') as any;

    try {
        const articles = await getLatestArticles(locale, 20);

        const featured = articles.length > 0 ? articles[0] : null;
        const latest = articles.slice(1, 10);

        const mapArticle = (article: any) => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            category: article.category,
            imageUrl: toAbsoluteUrl(article.image),
            publishedAt: article.datePublished,
            author: article.author?.name || 'Redaktion',
            webUrl: `${SITE_CONFIG.url}/${locale}/artikel/${article.slug}`
        });

        const data = {
            featured: featured ? mapArticle(featured) : null,
            latest: latest.map(mapArticle),
            categories: CATEGORIES.map(c => ({
                id: c.slug,
                slug: c.slug,
                label: c.label
            }))
        };

        return successResponse(data, { locale }, null);
    } catch (error) {
        console.error('[API v1] Error fetching home data:', error);
        return errorResponse('Failed to fetch home data', 'INTERNAL_ERROR', 500);
    }
}
