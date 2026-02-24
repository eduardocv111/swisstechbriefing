'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
    getConsent,
    saveConsent,
    CATEGORY_META,
    DEFAULT_CATEGORIES,
    type ConsentCategories,
} from '@/lib/consent';

interface Props {
    onClose: () => void;
    onSave: () => void;
    dict: {
        title: string;
        description: string;
        save: string;
        accept_all: string;
        always_active: string;
        privacy_policy: string;
        cookie_policy: string;
        close: string;
    };
}

export default function CookiePreferencesModal({ onClose, onSave, dict }: Props) {
    const [categories, setCategories] = useState<ConsentCategories>(() => {
        const existing = getConsent();
        return existing ? existing.categories : { ...DEFAULT_CATEGORIES };
    });

    // Trap focus and handle escape
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const toggleCategory = useCallback((key: keyof ConsentCategories) => {
        if (key === 'necessary') return;
        setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const handleSave = useCallback(() => {
        saveConsent(categories, 'modal');
        onSave();
    }, [categories, onSave]);

    const handleAcceptAll = useCallback(() => {
        const all: ConsentCategories = { necessary: true, analytics: true, marketing: true };
        saveConsent(all, 'modal');
        onSave();
    }, [onSave]);

    return (
        <div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={dict.title}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative w-full max-w-lg rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-2xl md:p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">{dict.title}</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            {dict.description}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                        aria-label={dict.close}
                    >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Category toggles */}
                <div className="mb-8 space-y-4">
                    {CATEGORY_META.map((cat) => {
                        const isOn = categories[cat.key];
                        const isLocked = cat.locked;

                        return (
                            <div
                                key={cat.key}
                                className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 pr-4">
                                        <h3 className="text-sm font-bold text-white">{cat.label}</h3>
                                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                                            {cat.description}
                                        </p>
                                    </div>

                                    {/* Toggle */}
                                    <button
                                        role="switch"
                                        aria-checked={isOn}
                                        aria-label={cat.label}
                                        disabled={isLocked}
                                        onClick={() => toggleCategory(cat.key)}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${isLocked
                                            ? 'cursor-not-allowed bg-primary/60'
                                            : isOn
                                                ? 'bg-primary'
                                                : 'bg-slate-600'
                                            }`}
                                    >
                                        <span
                                            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${isOn ? 'translate-x-5' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                </div>
                                {isLocked && (
                                    <span className="mt-2 inline-block rounded bg-slate-700/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        {dict.always_active}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        onClick={handleSave}
                        className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        {dict.save}
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        {dict.accept_all}
                    </button>
                </div>

                {/* Links */}
                <div className="mt-4 text-center">
                    <Link
                        href="/cookie-richtlinie"
                        className="text-xs text-slate-500 underline underline-offset-2 transition-colors hover:text-primary"
                    >
                        {dict.cookie_policy}
                    </Link>
                    <span className="mx-2 text-slate-700">•</span>
                    <Link
                        href="/datenschutz"
                        className="text-xs text-slate-500 underline underline-offset-2 transition-colors hover:text-primary"
                    >
                        {dict.privacy_policy}
                    </Link>
                </div>
            </div>
        </div>
    );
}
