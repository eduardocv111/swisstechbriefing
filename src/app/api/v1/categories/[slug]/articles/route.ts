import { NextResponse } from 'next/server';
import { getCategoryBySlug } from '@/lib/categories';
import { getPaginatedArticlesByCategory, countArticlesByCategory } from '@/lib/articles.repo';
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
 * API v1: Get articles by category with pagination
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    // Authorization Check
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.STB_API_KEY) {
        return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'de-CH') as any;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '20')));

    const category = getCategoryBySlug(slug);
    if (!category) {
        return NextResponse.json({
            status: 'error',
            message: 'Category not found'
        }, { status: 404 });
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

        return NextResponse.json({
            status: 'success',
            version: '1.0',
            data: cleanArticles,
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
            metadata: {
                category: category.slug,
                locale,
                timestamp: new Date().toISOString()
            }
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=300'
            }
        });
    } catch (error) {
        console.error(`[API v1] Error fetching category articles: ${slug}`, error);
        return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
    }
}
