import { NextResponse } from 'next/server';
import { getLatestArticles } from '@/lib/articles.repo';

/**
 * API v1: Get Latest Articles
 * Ideal for Feed consumption in Mobile Apps (React Native / Flutter)
 */
export async function GET(request: Request) {
    // 1. Authorization Check
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.STB_API_KEY) {
        return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get('locale') || 'de-CH') as any;
    const limit = parseInt(searchParams.get('limit') || '10');

    try {
        const articles = await getLatestArticles(locale, limit);

        // Transform the database output to a Clean JSON API format
        const cleanArticles = articles.map(article => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            category: article.category,
            imageUrl: article.image,
            publishedAt: article.datePublished,
            author: article.author?.name || 'Redaktion',
            // Absolute URL for the App to link back if needed
            webUrl: `https://swisstechbriefing.ch/${locale}/artikel/${article.slug}`
        }));

        return NextResponse.json({
            status: 'success',
            count: cleanArticles.length,
            data: cleanArticles,
            metadata: {
                locale,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('[API v1] Error fetching latest articles:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Failed to fetch articles'
        }, { status: 500 });
    }
}
