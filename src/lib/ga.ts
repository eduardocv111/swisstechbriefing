/**
 * Utility for GA4 tracking - SwissTech Briefing
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Sends a custom event to GA4
 * Safe to call anywhere (checks for window.gtag)
 */
export const trackEvent = (name: string, params?: Record<string, unknown>) => {
    const win = window as Window & { gtag?: (type: string, name: string, params?: Record<string, unknown>) => void };
    if (typeof window !== 'undefined' && win.gtag) {
        win.gtag('event', name, params);
    }
};

/**
 * Specialized page view tracking
 */
export const trackPageView = (url: string) => {
    const win = window as Window & { gtag?: (type: string, id: string, config: Record<string, string>) => void };
    if (typeof window !== 'undefined' && win.gtag && GA_ID) {
        win.gtag('config', GA_ID, {
            page_path: url,
        });
    }
};
