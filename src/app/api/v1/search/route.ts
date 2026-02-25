import { getPaginatedSearchArticles, countSearchArticles } from '@/lib/articles.repo';
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
 * API v1: Search articles with pagination
 */
export async function GET(request: Request) {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
        return errorResponse('Too Many Requests', 'TOO_MANY_REQUESTS', 429);
    }

    if (!validateAuth(request)) {
        return errorResponse('Unauthorized access', 'UNAUTHORIZED', 401);
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const locale = (searchParams.get('locale') || 'de-CH') as any;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '20')));

    if (!q || q.trim().length < 2) {
        return errorResponse('Search query must be at least 2 characters', 'VALIDATION_ERROR', 400);
    }

    try {
        const [articles, total] = await Promise.all([
            getPaginatedSearchArticles(locale, q, page, limit),
            countSearchArticles(q)
        ]);

        const totalPages = Math.ceil(total / limit);

        const cleanArticles = articles.map(article => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            category: article.category,
            imageUrl: toAbsoluteUrl(article.image),
            publishedAt: article.datePublished,
            author: article.author?.name || 'Redaktion',
            webUrl: `${SITE_CONFIG.url}/${locale}/artikel/${article.slug}`
        }));

        const pagination = {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        };

        return successResponse(cleanArticles, { query: q, locale }, pagination);
    } catch (error) {
        console.error(`[API v1] Error searching articles: ${q}`, error);
        return errorResponse('Internal server error', 'INTERNAL_ERROR', 500);
    }
}
