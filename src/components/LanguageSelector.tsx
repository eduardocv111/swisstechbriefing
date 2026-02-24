'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { locales, localeNames, Locale } from '@/i18n/config';
import { getPathnameWithoutLocale } from '@/lib/i18n';

interface LanguageSelectorProps {
    currentLocale: string;
}

const FULL_LOCALE_NAMES: Record<Locale, string> = {
    'de-CH': 'Deutsch (CH)',
    'fr-CH': 'Français (CH)',
    'it-CH': 'Italiano (CH)',
    'en': 'English',
};

export default function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const purePathname = getPathnameWithoutLocale(pathname);
    const queryString = searchParams.toString();
    const queryAppend = queryString ? `?${queryString}` : '';

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                aria-label="Sprache wählen / Select Language"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="material-symbols-outlined text-[20px] notranslate normal-case">language</span>
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
                    {localeNames[currentLocale as Locale] || currentLocale}
                </span>
                <span className="material-symbols-outlined text-[16px] notranslate normal-case opacity-50">
                    expand_more
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1f2e] border border-white/10 rounded-xl shadow-2xl py-2 z-[60] animate-in fade-in zoom-in duration-200">
                    <div className="px-3 py-1.5 mb-1 border-b border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                            Language / Sprache
                        </span>
                    </div>
                    {locales.map((loc) => (
                        <Link
                            key={loc}
                            href={`/${loc}${purePathname}${queryAppend}`}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${currentLocale === loc
                                ? 'text-blue-400 font-bold bg-blue-500/5'
                                : 'text-slate-300 hover:text-white'
                                }`}
                        >
                            <span>{FULL_LOCALE_NAMES[loc as Locale]}</span>
                            {currentLocale === loc && (
                                <span className="material-symbols-outlined text-sm notranslate normal-case">check</span>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
