import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/request'

/**
 * Global Middleware for API v1
 * Handles: CORS, Headers
 */
export function middleware(request: NextRequest) {
    // Only apply to /api/v1 routes
    if (!request.nextUrl.pathname.startsWith('/api/v1')) {
        return NextResponse.next()
    }

    const origin = request.headers.get('origin')
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',')

    // CORS preflight and headers
    const corsHeaders: Record<string, string> = {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    }

    // Set origin if allowed or if local development
    if (origin && (allowedOrigins.includes(origin) || origin.includes('localhost'))) {
        corsHeaders['Access-Control-Allow-Origin'] = origin
    }

    // Handle Preflight
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 204,
            headers: corsHeaders,
        })
    }

    const response = NextResponse.next()

    // Add CORS headers to the response
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
    })

    return response
}

export const config = {
    matcher: '/api/v1/:path*',
}
