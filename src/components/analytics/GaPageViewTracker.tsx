'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/ga';
import { hasConsent } from '@/lib/consent';

/**
 * Tracks page views on route changes in Next.js App Router.
 */
export default function GaPageViewTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!pathname) return;

        // Only track if consent is granted
        if (!hasConsent('analytics')) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        trackPageView(url);
    }, [pathname, searchParams]);

    return null;
}
