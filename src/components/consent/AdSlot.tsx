'use client';

import { useEffect, useState, useRef, type ReactNode } from 'react';
import { hasConsent, getConsent } from '@/lib/consent';


const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const ADS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADS !== 'false';

interface AdSlotProps {
    /** Unique slot identifier, e.g. "home-after-hero", "article-mid" */
    slotId: string;
    /** AdSense ad format */
    format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
    /** Additional CSS classes */
    className?: string;
    /** Optional label shown above the ad */
    label?: string;
    /** Custom fallback when ads not available */
    fallback?: ReactNode;
    /** Minimum height in pixels */
    minHeight?: number;
    /** ── Category-aware targeting prep (Phase 2.5) ── */
    pageType?: 'home' | 'article' | 'category';
    category?: string;
}

const FORMAT_TO_ADSENSE: Record<string, string> = {
    auto: 'auto',
    rectangle: 'rectangle',
    horizontal: 'horizontal',
    vertical: 'vertical',
};

/**
 * Production-ready ad slot component.
 *
 * - Marketing consent + AdSense → real <ins class="adsbygoogle">
 * - Marketing consent + no AdSense → dev placeholder
 * - No marketing consent → fallback or nothing
 */
export default function AdSlot({
    slotId,
    format = 'auto',
    className = '',
    label,
    fallback,
    minHeight = 90,
    pageType,
    category,
}: AdSlotProps) {
    const [hasMarketing, setHasMarketing] = useState(false);
    const [adsenseReady, setAdsenseReady] = useState(false);
    const adPushed = useRef(false);
    const insRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        setHasMarketing(hasConsent('marketing'));

        function handleConsentChange() {
            const consent = getConsent();
            setHasMarketing(consent?.categories.marketing ?? false);
        }

        window.addEventListener('stb-consent-updated', handleConsentChange);
        return () => window.removeEventListener('stb-consent-updated', handleConsentChange);
    }, []);

    useEffect(() => {
        if (!ADSENSE_CLIENT || !ADS_ENABLED) return;

        if (typeof window.adsbygoogle !== 'undefined') {
            setAdsenseReady(true);
            return;
        }

        function handleReady() {
            setAdsenseReady(true);
        }

        window.addEventListener('stb-adsense-ready', handleReady);
        return () => window.removeEventListener('stb-adsense-ready', handleReady);
    }, []);

    useEffect(() => {
        if (!hasMarketing || !adsenseReady || adPushed.current) return;
        if (!ADSENSE_CLIENT || !ADS_ENABLED) return;
        if (!insRef.current) return;

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            adPushed.current = true;
        } catch {
            // Silently handle ad blocker errors
        }
    }, [hasMarketing, adsenseReady]);

    if (!hasMarketing) {
        if (fallback) {
            return <div className={className}>{fallback}</div>;
        }
        return null;
    }

    if (!ADSENSE_CLIENT || !ADS_ENABLED) {
        return (
            <div
                id={`ad-slot-${slotId}`}
                data-ad-slot={slotId}
                data-page-type={pageType}
                data-category={category}
                className={`mx-auto flex items-center justify-center rounded-lg border border-dashed border-slate-700/40 bg-slate-800/20 text-[10px] uppercase tracking-widest text-slate-600 ${className}`}
                style={{ minHeight }}
            >
                <span className="opacity-40">Werbefläche · {slotId}</span>
            </div>
        );
    }

    return (
        <div
            id={`ad-slot-${slotId}`}
            data-page-type={pageType}
            data-category={category}
            className={`mx-auto ${className}`}
            style={{ minHeight }}
        >
            {label && (
                <p className="mb-1 text-center text-[9px] uppercase tracking-widest text-slate-500/60">
                    {label}
                </p>
            )}
            <ins
                ref={insRef}
                className="adsbygoogle"
                style={{ display: 'block', minHeight }}
                data-ad-client={ADSENSE_CLIENT}
                data-ad-slot={slotId}
                data-ad-format={FORMAT_TO_ADSENSE[format] || 'auto'}
                data-full-width-responsive="true"
            />
        </div>
    );
}
