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
        // Initialize dataLayer + gtag shim as early as possible
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) {
            window.dataLayer.push(args);
        }

        // ── 1. Set DEFAULTS to denied (before any Google script loads) ──
        gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500,
        });

        // Region-specific: be extra explicit for EEA + CH
        gtag('set', 'ads_data_redaction', true);
        gtag('set', 'url_passthrough', true);

        // ── 2. Check for existing consent and update immediately ──
        const existing = getConsent();
        if (existing) {
            updateGoogleConsent(existing.categories.analytics, existing.categories.marketing);
        }

        // ── 3. Listen for future consent changes ──
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

function updateGoogleConsent(analytics: boolean, marketing: boolean) {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
    }

    gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: marketing ? 'granted' : 'denied',
    });
}
