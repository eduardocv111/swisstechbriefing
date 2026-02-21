/**
 * Formats an ISO date string or Date object into Swiss German style.
 * Example: "20. Mai 2026"
 */
export function formatSwissDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    return d.toLocaleDateString('de-CH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
