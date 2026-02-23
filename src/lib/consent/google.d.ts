/**
 * Global type extensions for Google services (GA4, AdSense, Consent Mode).
 * Used by GoogleConsentMode, AnalyticsLoader, AdSenseLoader, and AdSlot.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export { };

declare global {
    interface Window {
        /** Google Tag Manager / gtag.js dataLayer */
        dataLayer: any[];
        /** Google AdSense ad units queue */
        adsbygoogle: any[];
        /** gtag function (injected by gtag.js) */
        gtag?: (...args: any[]) => void;
    }
}
