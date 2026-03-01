import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

const shortToFull: Record<string, string> = {
    de: "de-CH",
    fr: "fr-CH",
    it: "it-CH",
    en: "en",
};

/**
 * Global Proxy / Middleware for SwissTech Briefing
 * Handles:
 * 1. CORS for API v1
 * 2. Locale-based redirections and normalization
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ── 0. EXEMPT API FROM ALL MIDDLEWARE LOGIC ──
    if (pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    const origin = request.headers.get('origin');
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');

    // ── 1. API v1 CORS & Security Handling ──
    if (pathname.startsWith('/api/v1')) {
        const corsHeaders: Record<string, string> = {
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
        };

        if (origin && (allowedOrigins.includes(origin) || origin.includes('localhost'))) {
            corsHeaders['Access-Control-Allow-Origin'] = origin;
        }

        // Handle Preflight
        if (request.method === 'OPTIONS') {
            return new NextResponse(null, {
                status: 204,
                headers: corsHeaders,
            });
        }

        const response = NextResponse.next();

        // Add headers to regular requests
        Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    }

    // ── 2. Skip paths that don't need locale prefixes ──
    const isPublicFile = pathname.includes('.') ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/assets") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/audio") ||
        pathname.startsWith("/video") ||
        pathname === "/favicon.ico";

    if (isPublicFile) {
        return NextResponse.next();
    }

    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0] ?? "";

    // ── 3. Normalize short locale: /de/... -> /de-CH/... ──
    if (shortToFull[first] && shortToFull[first] !== first) {
        const url = request.nextUrl.clone();
        const rest = segments.slice(1).join("/");
        url.pathname = `/${shortToFull[first]}${rest ? `/${rest}` : ""}`;
        return NextResponse.redirect(url, 308);
    }

    // ── 4. If missing locale, prepend default ──
    const hasLocale = locales.some(
        (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    );

    if (!hasLocale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
        return NextResponse.redirect(url, 308);
    }

    // ── 5. Fix common 404s (Aliases / Redirects) ──
    const targetPath = pathname.replace(`/${first}/`, "/");
    if (targetPath === "/podcasts" || targetPath === "podcasts") {
        const url = request.nextUrl.clone();
        url.pathname = `/${first}/kategorie/podcast`;
        return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|assets|images|audio|video|favicon.ico|sw.js|robots.txt|sitemap.xml|ads.txt|rss.xml).*)",
    ],
};
