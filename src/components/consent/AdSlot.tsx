'use client';

import { useEffect, useState } from 'react';
import { hasConsent, getConsent } from '@/lib/consent';

interface AdSlotProps {
    /** Unique slot identifier, e.g. "home-top", "article-sidebar" */
    slotId: string;
    /** Display format */
    format?: 'banner' | 'rectangle' | 'leaderboard';
    /** Optional class overrides */
    className?: string;
}

const FORMAT_STYLES: Record<string, string> = {
    banner: 'h-[90px] max-w-[728px]',
    rectangle: 'h-[250px] max-w-[300px]',
    leaderboard: 'h-[90px] w-full',
};

/**
 * Reusable ad slot component.
 *
 * Phase 1: Shows a contextual placeholder.
 * Phase 2: Will load real ad network scripts (AdSense/GAM)
 *          when marketing consent is given.
 *
 * Insertion points:
 * - Home page: between article cards (slotId="home-feed-1")
 * - Article page: after content (slotId="article-bottom")
 * - Article page: sidebar (slotId="article-sidebar")
 */
export default function AdSlot({
    slotId,
    format = 'banner',
    className = '',
}: AdSlotProps) {
    const [hasMarketing, setHasMarketing] = useState(false);

    useEffect(() => {
        setHasMarketing(hasConsent('marketing'));

        function handleConsentChange() {
            const consent = getConsent();
            setHasMarketing(consent?.categories.marketing ?? false);
        }

        window.addEventListener('stb-consent-updated', handleConsentChange);
        return () => window.removeEventListener('stb-consent-updated', handleConsentChange);
    }, []);

    // Phase 2: If marketing consent given, render real ad network tag here
    // For now, show a subtle placeholder
    if (hasMarketing) {
        return (
            <div
                id={`ad-slot-${slotId}`}
                data-ad-slot={slotId}
                data-ad-format={format}
                className={`mx-auto flex items-center justify-center rounded-lg border border-dashed border-slate-700/40 bg-slate-800/20 text-[10px] uppercase tracking-widest text-slate-600 ${FORMAT_STYLES[format]} ${className}`}
            >
                {/* Phase 2: Ad network script will render here */}
                <span className="opacity-50">Werbefläche</span>
            </div>
        );
    }

    // No marketing consent — render nothing (or minimal placeholder)
    return null;
}
