/**
 * Formats an ISO date string or Date object into localized version.
 * Example: "20. Mai 2026" (de-CH)
 */
export function formatSwissDate(date: string | Date, locale: string = 'de-CH'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const normalizedLocale = locale.replace('_', '-');

    return d.toLocaleDateString(normalizedLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
