'use client';

import { useEffect, useState, useCallback } from 'react';
import { hasConsent, getConsent } from '@/lib/consent';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Conditionally loads Google Analytics 4 when:
 * 1. A measurement ID is configured via env
 * 2. The user has given analytics consent
 *
 * Listens for consent changes and loads/unloads accordingly.
 * Does NOT load anything if GA_ID is missing — safe by default.
 */
export default function AnalyticsLoader() {
    const [loaded, setLoaded] = useState(false);

    const loadGA = useCallback(() => {
        if (!GA_ID || loaded) return;
        if (!hasConsent('analytics')) return;

        // Inject gtag.js script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        script.async = true;
        script.id = 'stb-ga-script';
        document.head.appendChild(script);

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', GA_ID, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=Lax;Secure',
        });

        setLoaded(true);
    }, [loaded]);

    // Check on mount
    useEffect(() => {
        loadGA();
    }, [loadGA]);

    // Listen for consent updates
    useEffect(() => {
        function handleConsentChange() {
            const consent = getConsent();
            if (consent?.categories.analytics) {
                loadGA();
            }
            // Note: Once GA is loaded, we can't fully "unload" it.
            // A page reload after revoking consent will simply not load it again.
        }

        window.addEventListener('stb-consent-updated', handleConsentChange);
        return () => window.removeEventListener('stb-consent-updated', handleConsentChange);
    }, [loadGA]);

    return null; // Renders nothing — pure side-effect component
}

// Extend Window type for dataLayer
declare global {
    interface Window {
        dataLayer?: unknown[];
    }
}
