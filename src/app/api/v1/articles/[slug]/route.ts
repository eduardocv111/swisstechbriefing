import { getArticleBySlug } from '@/lib/articles.repo';
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
 * API v1: Get Single Article Detail
 * Fetches full HTML or data for a specific article
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

    try {
        const article = await getArticleBySlug(locale, slug);

        if (!article) {
            return errorResponse('Article not found', 'NOT_FOUND', 404);
        }

        const data = {
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
            contentHtml: article.contentHtml,
            sources: article.sources || [],
            webUrl: `${SITE_CONFIG.url}/${locale}/artikel/${article.slug}`
        };

        return successResponse(data, { locale });
    } catch (error) {
        console.error(`[API v1] Error fetching article detail: ${slug}`, error);
        return errorResponse('Internal server error', 'INTERNAL_ERROR', 500);
    }
}
