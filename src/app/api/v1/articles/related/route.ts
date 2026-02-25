import { NextResponse } from 'next/server';
import { getArticleBySlug, getRelatedArticles } from '@/lib/articles.repo';
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
 * API v1: Get Related Articles
 * Optimized for mobile item recommendation component
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
    const slug = searchParams.get('slug') || '';
    const locale = (searchParams.get('locale') || 'de-CH') as any;
    const limit = Math.max(1, Math.min(10, parseInt(searchParams.get('limit') || '3')));

    if (!slug) {
        return errorResponse('Slug parameter is required', 'MISSING_PARAM', 400);
    }

    try {
        const article = await getArticleBySlug(locale, slug);
        if (!article) {
            return errorResponse('Article not found', 'NOT_FOUND', 404);
        }

        const related = await getRelatedArticles(locale, article.category, article.slug, limit);

        const cleanRelated = related.map(rel => ({
            id: rel.id,
            slug: rel.slug,
            title: rel.title,
            category: rel.category,
            imageUrl: toAbsoluteUrl(rel.image),
            publishedAt: rel.datePublished,
            author: rel.author?.name || 'Redaktion',
            webUrl: `${SITE_CONFIG.url}/${locale}/artikel/${rel.slug}`
        }));

        return successResponse(cleanRelated, { source_slug: slug, locale }, null);
    } catch (error) {
        console.error('[API v1] Error fetching related articles:', error);
        return errorResponse('Internal server error', 'INTERNAL_ERROR', 500);
    }
}
