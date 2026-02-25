import { NextResponse } from 'next/server';
import { getPaginatedSearchArticles, countSearchArticles } from '@/lib/articles.repo';
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
 * API v1: Search articles with pagination
 */
export async function GET(request: Request) {
    // Authorization Check
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.STB_API_KEY) {
        return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const locale = (searchParams.get('locale') || 'de-CH') as any;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '20')));

    if (!q || q.trim().length < 2) {
        return NextResponse.json({
            status: 'error',
            message: 'Query parameter "q" must be at least 2 characters'
        }, { status: 400 });
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
                query: q,
                locale,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error(`[API v1] Error searching articles: ${q}`, error);
        return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
    }
}
