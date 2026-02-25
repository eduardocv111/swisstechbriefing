import { NextResponse } from 'next/server';
import { getArticleBySlug } from '@/lib/articles.repo';

/**
 * API v1: Get Single Article Detail
 * Fetches full HTML or data for a specific article
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
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
            data: {
                id: article.id,
                slug: article.slug,
                title: article.title,
                excerpt: article.excerpt,
                category: article.category,
                imageUrl: article.image,
                publishedAt: article.datePublished,
                lastModified: article.dateModified,
                author: {
                    name: article.author?.name || 'Redaktion',
                    role: article.author?.role || 'SwissTech Briefing'
                },
                contentHtml: article.contentHtml, // The App can render this with a WebView or Markdown parser
                sources: article.sources || [],
                canonicalUrl: `https://swisstechbriefing.ch/${locale}/artikel/${article.slug}`
            },
            metadata: {
                locale,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error(`[API v1] Error fetching article detailing: ${slug}`, error);
        return NextResponse.json({
            status: 'error',
            message: 'Internal server error'
        }, { status: 500 });
    }
}
