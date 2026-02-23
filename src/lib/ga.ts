/**
 * Utility for GA4 tracking - SwissTech Briefing
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

interface TrackEventProps {
    action: string;
    category?: string;
    label?: string;
    value?: number;
    [key: string]: unknown;
}

/**
 * Sends a custom event to GA4
 * Safe to call anywhere (checks for window.gtag)
 */
export const trackEvent = (name: string, params?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', name, params);
    }
};

/**
 * Specialized page view tracking
 */
export const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag && GA_ID) {
        (window as any).gtag('config', GA_ID, {
            page_path: url,
        });
    }
};
