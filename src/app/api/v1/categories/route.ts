import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/lib/categories';

/**
 * API v1: Get all categories
 */
export async function GET(request: Request) {
    // Authorization Check
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.STB_API_KEY) {
        return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
        status: 'success',
        version: '1.0',
        data: CATEGORIES.map(c => ({
            id: c.slug,
            slug: c.slug,
            label: c.label,
        })),
        metadata: {
            timestamp: new Date().toISOString()
        }
    }, {
        headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600'
        }
    });
}
