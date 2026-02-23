'use client';

import { useEffect } from 'react';
import { getConsent } from '@/lib/consent';


/**
 * Google Consent Mode v2 bootstrap.
 *
 * MUST render before any Google script (GA4, AdSense, GTM).
 * Sets consent defaults to "denied" immediately, then updates
 * when our CMP fires `stb-consent-updated`.
 *
 * Consent signal mapping:
 *   analytics consent  → analytics_storage
 *   marketing consent  → ad_storage, ad_user_data, ad_personalization
 */
export default function GoogleConsentMode() {
    useEffect(() => {
        // ── 1. Initial Check on Mount ──
        // If user already made a choice, update Google immediately
        const existing = getConsent();
        if (existing) {
            updateGoogleConsent(existing.categories.analytics, existing.categories.marketing);
        }

        // ── 2. Listen for User Life-cycle Changes ──
        function handleConsentChange() {
            const consent = getConsent();
            if (consent) {
                updateGoogleConsent(consent.categories.analytics, consent.categories.marketing);
            }
        }

        window.addEventListener('stb-consent-updated', handleConsentChange);
        return () => window.removeEventListener('stb-consent-updated', handleConsentChange);
    }, []);

    return null;
}

/**
 * Updates Google Consent Mode v2 based on CMP selection
 */
function updateGoogleConsent(analytics: boolean, marketing: boolean) {
    if (typeof window === 'undefined' || !(window as any).dataLayer) return;

    (window as any).gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: marketing ? 'granted' : 'denied',
    });
}

