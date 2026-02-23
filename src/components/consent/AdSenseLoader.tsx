'use client';

import { useEffect, useRef } from 'react';
import { hasConsent, getConsent } from '@/lib/consent';


const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const ADS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADS !== 'false';

/**
 * AdSense script loader — Phase 2.
 *
 * Only loads when: ADSENSE_CLIENT configured + ads enabled + marketing consent granted.
 * Idempotent, fires 'stb-adsense-ready' when script loads.
 */
export default function AdSenseLoader() {
    const loaded = useRef(false);

    useEffect(() => {
        if (!ADSENSE_CLIENT || !ADS_ENABLED) return;

        function tryLoad() {
            if (loaded.current) return;
            if (!hasConsent('marketing')) return;

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
                window.dispatchEvent(new CustomEvent('stb-adsense-ready'));
            };
        }

        tryLoad();

        function handleConsentChange() {
            const consent = getConsent();
            if (consent?.categories.marketing) {
                tryLoad();
            }
        }

        window.addEventListener('stb-consent-updated', handleConsentChange);
        return () => window.removeEventListener('stb-consent-updated', handleConsentChange);
    }, []);

    return null;
}
