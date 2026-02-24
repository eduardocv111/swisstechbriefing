'use client';

import { useEffect, useRef } from 'react';
import { getStoredConsent } from '@/lib/ga';

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-1495161909176032";
const ADS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADS !== 'false';

/**
 * AdSense script loader - Integrated with professional Consent Mode v2.
 * Only loads if marketing consent is granted.
 */
export default function AdSenseLoader() {
    const loaded = useRef(false);

    useEffect(() => {
        if (!ADSENSE_CLIENT || !ADS_ENABLED) return;

        function tryLoad() {
            if (loaded.current) return;

            // Check new consent system
            const consent = getStoredConsent();
            if (consent?.marketing !== 'granted') return;

            if (document.getElementById('stb-adsense-script')) {
                loaded.current = true;
                return;
            }

            const script = document.createElement('script');
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
            script.async = true;
            script.crossOrigin = 'anonymous';
            script.id = 'stb-adsense-script';
            document.head.appendChild(script);
            loaded.current = true;

            script.onload = () => {
                // Trigger event for any ad slots waiting
                window.dispatchEvent(new CustomEvent('stb-adsense-ready'));
            };
        }

        // Initial check
        tryLoad();

        // Listen for internal consent updates (triggered by CookieBanner)
        const handleConsentUpdate = () => {
            tryLoad();
        };

        window.addEventListener('stb-consent-updated', handleConsentUpdate);
        return () => window.removeEventListener('stb-consent-updated', handleConsentUpdate);
    }, []);

    return null;
}
