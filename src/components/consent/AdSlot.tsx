'use client';

import { useEffect, useState, useRef, type ReactNode } from 'react';
import { getStoredConsent, trackEvent } from '@/lib/ga';


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
    const [hasMarketing, setHasMarketing] = useState(() => {
        if (typeof window === 'undefined') return false;
        const consent = getStoredConsent();
        return consent?.marketing === 'granted';
    });
    const [adsenseReady, setAdsenseReady] = useState(() =>
        typeof window !== 'undefined' && typeof (window as any).adsbygoogle !== 'undefined'
    );
    const adPushed = useRef(false);
    const insRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        function handleConsentChange() {
            const consent = getStoredConsent();
            setHasMarketing(consent?.marketing === 'granted');
        }

        window.addEventListener('stb-consent-updated', handleConsentChange);
        return () => window.removeEventListener('stb-consent-updated', handleConsentChange);
    }, []);

    useEffect(() => {
        if (!ADSENSE_CLIENT || !ADS_ENABLED) return;
        if (adsenseReady) return;

        function handleReady() {
            setAdsenseReady(true);
        }

        window.addEventListener('stb-adsense-ready', handleReady);
        return () => window.removeEventListener('stb-adsense-ready', handleReady);
    }, []);

    // ── Visibility & Impression Tracking (Fase 2.5) ──
    useEffect(() => {
        if (!hasMarketing || !adsenseReady || adPushed.current) return;
        if (!ADSENSE_CLIENT || !ADS_ENABLED) return;
        if (!insRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !adPushed.current) {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                            adPushed.current = true;

                            // ── Track impression in GA4 (Fase 2.5 Upgrade) ──
                            trackEvent('ad_slot_impression', {
                                ad_slot: slotId,
                                page_type: pageType,
                                category: category,
                            });
                        } catch {
                            // Silently handle ad blocker errors
                        }
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.5 } // visible al menos el 50%
        );

        observer.observe(insRef.current);
        return () => observer.disconnect();
    }, [hasMarketing, adsenseReady, slotId, pageType, category]);

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
                <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500/40">
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
