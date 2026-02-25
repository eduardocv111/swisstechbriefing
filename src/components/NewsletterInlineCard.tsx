"use client";

import NewsletterBox from "./newsletter/NewsletterBox";

interface NewsletterInlineCardProps {
    dict: any; // Keep prop for compatibility but use internal strings or common dict
    locale?: string;
}

/**
 * Compatibility wrapper for the new Sender.net NewsletterBox
 */
export default function NewsletterInlineCard({ locale = "de-CH" }: NewsletterInlineCardProps) {
    return <NewsletterBox locale={locale} variant="inline" />;
}
