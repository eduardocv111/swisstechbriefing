import { Locale, defaultLocale, locales } from "@/i18n/config";

/**
 * Normalizes a locale string to one of the supported Locales.
 * Falls back to defaultLocale if the input is invalid.
 */
export function normalizeLocale(locale: string | undefined | null): Locale {
    if (!locale) return defaultLocale;

    // Try exact match
    if (locales.includes(locale as Locale)) {
        return locale as Locale;
    }

    // Try language-only match (e.g., 'de' -> 'de-CH')
    const lang = locale.split('-')[0].toLowerCase();
    const match = locales.find(l => l.startsWith(lang));

    if (match) return match as Locale;

    return defaultLocale;
}

/**
 * Builds a localized URL path.
 * Ensures the path starts with the locale and handles double slashes.
 */
export function buildLocalizedHref(locale: string, path: string): string {
    const normLocale = normalizeLocale(locale);
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    // If the path already starts with a locale, replace it or keep it
    const pathParts = cleanPath.split('/');
    const firstSegment = pathParts[1];

    if (locales.includes(firstSegment as Locale)) {
        pathParts[1] = normLocale;
        return pathParts.join('/') || '/';
    }

    return `/${normLocale}${cleanPath}`;
}

/**
 * Extracts the pathname without the locale prefix.
 */
export function getPathnameWithoutLocale(pathname: string): string {
    const parts = pathname.split('/');
    if (parts.length > 1 && locales.includes(parts[1] as Locale)) {
        return '/' + parts.slice(2).join('/');
    }
    return pathname;
}
