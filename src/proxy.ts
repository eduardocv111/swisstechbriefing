import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

const shortToFull: Record<string, string> = {
    de: "de-CH",
    fr: "fr-CH",
    it: "it-CH",
    en: "en",
};

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip paths that don't need locale prefixes
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/assets") ||
        pathname === "/favicon.ico" ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0] ?? "";

    // 1) Normalize short locale: /de/... -> /de-CH/...
    // Only redirect if the target state is DIFFERENT from current state to avoid loops (e.g. /en)
    if (shortToFull[first] && shortToFull[first] !== first) {
        const url = request.nextUrl.clone();
        const rest = segments.slice(1).join("/");
        url.pathname = `/${shortToFull[first]}${rest ? `/${rest}` : ""}`;
        return NextResponse.redirect(url, 308);
    }

    // 2) If missing locale, prepend default
    const hasLocale = locales.some(
        (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    );

    if (!hasLocale) {
        const url = request.nextUrl.clone();
        // Ensure / -> /de-CH (exactly, no trailing slash added by concatenation)
        url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
        return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|robots.txt|sitemap.xml|ads.txt|rss.xml).*)",
    ],
};
