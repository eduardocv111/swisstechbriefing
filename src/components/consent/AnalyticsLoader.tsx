'use client';

import { Suspense } from 'react';
import GaPageViewTracker from '@/components/analytics/GaPageViewTracker';

/**
 * AnalyticsLoader - Phase 2.5
 * 
 * Central tracker for GA4 events and page views.
 * The script is loaded in layout.tsx via next/script for better performance.
 * This component handles route tracking (via GaPageViewTracker).
 */
export default function AnalyticsLoader() {
    return (
        <Suspense fallback={null}>
            <GaPageViewTracker />
        </Suspense>
    );
}
