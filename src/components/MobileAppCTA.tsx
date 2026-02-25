import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/config';

interface MobileAppCTAProps {
    locale: string;
}

const MobileAppCTA: React.FC<MobileAppCTAProps> = async ({ locale }) => {
    const dict = await getDictionary(locale as Locale);

    return (
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 md:px-12 md:py-16">
            {/* Background Accent */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-slate-800/50 blur-3xl" />

            <div className="relative flex flex-col items-center justify-between gap-12 lg:flex-row">
                <div className="flex-1 text-center lg:text-left">
                    <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        Mobile App Beta
                    </span>
                    <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-5xl">
                        SwissTech Briefing <br />
                        <span className="text-primary">immer dabei.</span>
                    </h2>
                    <p className="mb-8 max-w-lg text-lg text-slate-400">
                        Holen Sie sich die neuesten Analysen und Nachrichten direkt auf Ihr Smartphone.
                        Snel, premium und unabhängig. Distribución gratuita para Android.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                        {/* Download APK Button */}
                        <Link
                            href="/downloads/swisstech-briefing-v1.apk"
                            className="group flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20"
                        >
                            <span className="material-symbols-outlined text-2xl notranslate">download</span>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px] uppercase tracking-wider opacity-80">Download para Android</span>
                                <span className="text-base">Beta APK v1.0.0</span>
                            </div>
                        </Link>

                        <div className="text-xs text-slate-500 max-w-[200px] text-center sm:text-left">
                            * iOS Version próximamente vía TestFlight.
                        </div>
                    </div>
                </div>

                {/* Mockup Preview (Visual placeholder) */}
                <div className="relative flex-1 perspective-1000">
                    <div className="relative mx-auto h-[400px] w-[200px] transform rotate-[-5deg] rounded-[2.5rem] border-4 border-slate-800 bg-slate-950 p-1.5 shadow-2xl transition-transform hover:rotate-0">
                        {/* Internal Screen Mockup */}
                        <div className="h-full w-full overflow-hidden rounded-[2rem] bg-slate-900 relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                            <div className="p-4 pt-10">
                                <div className="h-32 w-full rounded-xl bg-slate-800 mb-4 animate-pulse" />
                                <div className="h-4 w-3/4 rounded bg-slate-700 mb-2" />
                                <div className="h-4 w-1/2 rounded bg-slate-700" />
                            </div>
                        </div>
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-slate-800 rounded-b-xl" />
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-1/2 right-1/4 h-16 w-16 -translate-y-1/2 animate-bounce rounded-2xl bg-white/5 p-3 backdrop-blur-md hidden md:block">
                        <span className="material-symbols-outlined text-primary text-3xl notranslate">notifications_active</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileAppCTA;
