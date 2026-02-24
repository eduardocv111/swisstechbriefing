import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Exclude public assets, API, and internal Next.js paths
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/assets') ||
        pathname.includes('.') || // e.g., favicon.ico, sitemap.xml
        pathname.startsWith('/_next')
    ) {
        return;
    }

    // 2. Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // 3. Special case: Root "/" -> redirect to default locale
    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url), 308);
    }

    // 4. Redirect if no locale: e.g. /ueber-uns -> /de-CH/ueber-uns
    // In this project, we want everything under a locale.
    const locale = defaultLocale; // Could use negotiator to detect browser lang
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|assets|favicon.ico).*)',
    ],
};
