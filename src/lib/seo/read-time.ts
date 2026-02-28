/**
 * Estimate reading time based on HTML content text length
 * Calculates based on ~200 words per minute
 */
export function estimateReadingTime(html: string = ""): number {
    if (!html) return 1;
    const plainText = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(wordCount / 200));
}
