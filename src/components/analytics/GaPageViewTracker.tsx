'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, getStoredConsent } from '@/lib/ga';

/**
 * NavigationTracker - Senior Implementation
 * Tracks page views on route changes for Next.js App Router (SPA).
 */
export default function GaPageViewTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!pathname) return;

        // Only track if consent has been explicitly granted
        const consent = getStoredConsent();
        if (consent && consent.analytics === 'granted') {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
            trackPageView(url);
        }
    }, [pathname, searchParams]);

    return null;
}
