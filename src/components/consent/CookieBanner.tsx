'use client';

import { useState, useEffect } from 'react';
import { updateGoogleConsent, getStoredConsent, UserConsent } from '@/lib/ga';

interface CookieConsentBannerProps {
    dict: {
        title: string;
        description: string;
        accept_all: string;
        only_necessary: string;
    };
}

/**
 * CookieConsentBanner - Production Ready
 * Handles user choice and triggers Google Consent Mode updates.
 */
export default function CookieConsentBanner({ dict }: CookieConsentBannerProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user already has a saved consent decision
        const consent = getStoredConsent();
        if (!consent) {
            // Delay slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const choice: UserConsent = { analytics: 'granted', marketing: 'granted' };
        updateGoogleConsent(choice);
        setIsVisible(false);
    };

    const handleNecessaryOnly = () => {
        const choice: UserConsent = { analytics: 'denied', marketing: 'denied' };
        updateGoogleConsent(choice);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6 animate-in slide-in-from-bottom duration-700"
            role="dialog"
            aria-labelledby="cookie-title"
        >
            <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl backdrop-blur-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1">
                        <h2 id="cookie-title" className="text-white font-black text-lg mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">cookie</span>
                            {dict.title}
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {dict.description}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                        <button
                            onClick={handleNecessaryOnly}
                            className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                        >
                            {dict.only_necessary}
                        </button>
                        <button
                            onClick={handleAcceptAll}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            {dict.accept_all}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
