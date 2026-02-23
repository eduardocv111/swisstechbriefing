'use client';

import { useEffect, useRef, useCallback } from 'react';
import { hasConsent, getConsent } from '@/lib/consent';


const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GA4 loader — Phase 2 (Consent Mode v2 aware).
 *
 * Architecture:
 * - GoogleConsentMode sets consent defaults to "denied" BEFORE this runs.
 * - This component only injects the gtag.js script when analytics consent is granted.
 * - With Consent Mode v2, gtag respects the consent state automatically.
 * - Listens for consent changes via `stb-consent-updated` event.
 * - Tracks App Router page navigations via title MutationObserver.
 */
export default function AnalyticsLoader() {
    const scriptLoaded = useRef(false);
    const configDone = useRef(false);

    const loadGA = useCallback(() => {
        if (!GA_ID) return;
        if (!hasConsent('analytics')) return;

        // Inject gtag.js script (only once)
        if (!scriptLoaded.current) {
            const existing = document.getElementById('stb-ga-script');
            if (!existing) {
                const script = document.createElement('script');
                script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
                script.async = true;
                script.id = 'stb-ga-script';
                document.head.appendChild(script);
            }
            scriptLoaded.current = true;
        }

        // Configure GA4 (only once)
        if (!configDone.current) {
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: unknown[]) {
                window.dataLayer.push(args);
            }
            gtag('js', new Date());
            gtag('config', GA_ID, {
                anonymize_ip: true,
                cookie_flags: 'SameSite=Lax;Secure',
                send_page_view: true,
            });
            configDone.current = true;
        }
    }, []);

    // Load on mount if consent already exists
    useEffect(() => {
        loadGA();
    }, [loadGA]);

    // React to consent changes
    useEffect(() => {
        function handleConsentChange() {
            const consent = getConsent();
            if (consent?.categories.analytics) {
                loadGA();
            }
        }

        window.addEventListener('stb-consent-updated', handleConsentChange);
        return () => window.removeEventListener('stb-consent-updated', handleConsentChange);
    }, [loadGA]);

    // Track App Router navigations
    useEffect(() => {
        if (!GA_ID) return;

        let previousUrl = window.location.href;

        const observer = new MutationObserver(() => {
            const currentUrl = window.location.href;
            if (currentUrl !== previousUrl) {
                previousUrl = currentUrl;
                if (configDone.current && hasConsent('analytics')) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push(['event', 'page_view', {
                        page_location: currentUrl,
                        page_title: document.title,
                    }]);
                }
            }
        });

        observer.observe(document.querySelector('head > title') || document.head, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        return () => observer.disconnect();
    }, []);

    return null;
}
