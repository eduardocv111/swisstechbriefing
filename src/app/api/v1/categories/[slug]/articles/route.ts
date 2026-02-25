import { getCategoryBySlug } from '@/lib/categories';
import { getPaginatedArticlesByCategory, countArticlesByCategory } from '@/lib/articles.repo';
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
 * API v1: Get articles by category with pagination
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
        return errorResponse('Too Many Requests', 'TOO_MANY_REQUESTS', 429);
    }

    if (!validateAuth(request)) {
        return errorResponse('Unauthorized access', 'UNAUTHORIZED', 401);
    }

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'de-CH') as any;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '20')));

    const category = getCategoryBySlug(slug);
    if (!category) {
        return errorResponse('Category not found', 'NOT_FOUND', 404);
    }

    try {
        const [articles, total] = await Promise.all([
            getPaginatedArticlesByCategory(locale, category.label, page, limit),
            countArticlesByCategory(category.label)
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

        return successResponse(cleanArticles, { category: category.slug, locale }, pagination);
    } catch (error) {
        console.error(`[API v1] Error fetching category articles: ${slug}`, error);
        return errorResponse('Internal server error', 'INTERNAL_ERROR', 500);
    }
}
