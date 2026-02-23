'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    getConsent,
    saveConsent,
    ACCEPT_ALL_CATEGORIES,
    DEFAULT_CATEGORIES,
} from '@/lib/consent';
import CookiePreferencesModal from './CookiePreferencesModal';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Only show if no valid consent exists
        const consent = getConsent();
        if (!consent) {
            // Small delay to avoid layout shift on first paint
            const timer = setTimeout(() => setVisible(true), 600);
            return () => clearTimeout(timer);
        }
    }, []);

    // Listen for external "open preferences" requests (from footer button)
    useEffect(() => {
        function handleOpenPrefs() {
            setShowModal(true);
        }
        window.addEventListener('stb-open-cookie-prefs', handleOpenPrefs);
        return () => window.removeEventListener('stb-open-cookie-prefs', handleOpenPrefs);
    }, []);

    const handleAcceptAll = useCallback(() => {
        saveConsent(ACCEPT_ALL_CATEGORIES, 'banner');
        setVisible(false);
    }, []);

    const handleRejectOptional = useCallback(() => {
        saveConsent(DEFAULT_CATEGORIES, 'banner');
        setVisible(false);
    }, []);

    const handleOpenSettings = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleModalSave = useCallback(() => {
        setVisible(false);
        setShowModal(false);
    }, []);

    if (!visible && !showModal) return null;

    return (
        <>
            {/* ── Banner ── */}
            {visible && !showModal && (
                <div
                    className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6 animate-in slide-in-from-bottom duration-500"
                    role="dialog"
                    aria-label="Cookie-Banner"
                >
                    <div className="mx-auto max-w-3xl rounded-2xl border border-slate-700/60 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-md md:p-6">
                        {/* Text */}
                        <div className="mb-5">
                            <h2 className="mb-2 text-base font-bold text-white">
                                🍪 Wir respektieren Ihre Privatsphäre
                            </h2>
                            <p className="text-sm leading-relaxed text-slate-300">
                                Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten.
                                Notwendige Cookies sind für den Betrieb der Website erforderlich.
                                Analyse- und Marketing-Cookies setzen wir nur mit Ihrer ausdrücklichen Einwilligung.{' '}
                                <a
                                    href="/cookie-richtlinie"
                                    className="font-medium text-primary underline underline-offset-2 hover:text-blue-300 transition-colors"
                                >
                                    Cookie-Richtlinie
                                </a>
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <button
                                onClick={handleOpenSettings}
                                className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                Einstellungen
                            </button>
                            <button
                                onClick={handleRejectOptional}
                                className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                Nur notwendige
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                Alle akzeptieren
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Preferences Modal ── */}
            {showModal && (
                <CookiePreferencesModal
                    onClose={() => setShowModal(false)}
                    onSave={handleModalSave}
                />
            )}
        </>
    );
}
