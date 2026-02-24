/**
 * Professional Analytics \u0026 Consent Module
 * Compliant with GA4 Consent Mode v2 (GDPR / nDSG Switzerland)
 */

export const GA_ID = "G-CFKRPH9TGJ";

export type ConsentChoice = 'granted' | 'denied';

export interface UserConsent {
    analytics: ConsentChoice;
    marketing: ConsentChoice;
}

const CONSENT_STORAGE_KEY = "stb_user_consent_v2";

/**
 * Access the global gtag function with safety checks
 */
export const gtag = (...args: any[]) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag(...args);
    }
};

/**
 * Persist consent to LocalStorage
 */
export const saveConsentToStorage = (consent: UserConsent) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
};

/**
 * Retrieve consent from LocalStorage
 */
export const getStoredConsent = (): UserConsent | null => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch (e) {
        return null;
    }
};

/**
 * Update Google Consent Mode and notify GA4
 */
export const updateGoogleConsent = (consent: UserConsent) => {
    gtag("consent", "update", {
        analytics_storage: consent.analytics,
        ad_storage: consent.marketing,
        ad_user_data: consent.marketing,
        ad_personalization: consent.marketing,
    });

    // Persist the choice
    saveConsentToStorage(consent);

    // If newly granted, trigger an immediate page view to initialize the session
    if (consent.analytics === "granted") {
        trackPageView(window.location.pathname + window.location.search);
    }

    // Notify other components (like AdSense)
    window.dispatchEvent(new CustomEvent('stb-consent-updated'));
};

/**
 * Professional Page View Tracking
 * Handles manual page views to ensure control over Consent Mode
 */
export const trackPageView = (url: string) => {
    if (!GA_ID) return;

    // We explicitly send a manual config update + page_view event
    gtag("config", GA_ID, {
        page_path: url,
        send_page_view: false, // Prevent GA4 from double-tracking automatically
    });

    gtag("event", "page_view", {
        page_path: url,
        send_to: GA_ID
    });
};

/**
 * Generic Event Tracking
 */
export const trackEvent = (name: string, params?: Record<string, unknown>) => {
    gtag("event", name, params);
};
