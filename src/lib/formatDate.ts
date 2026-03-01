/**
 * Formats an ISO date string or Date object into localized version.
 * Example: "20. Mai 2026" (de-CH)
 */
export function formatSwissDate(date: string | Date, locale: string = 'de-CH'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const normalizedLocale = locale.replace('_', '-');

    try {
        return d.toLocaleDateString(normalizedLocale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (e) {
        // Fallback for environments where de-CH or other variants might not be loaded in ICU
        return d.toLocaleDateString('de', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
}
