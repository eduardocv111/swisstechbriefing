'use client';

import { trackEvent } from '@/lib/ga';

export default function NewsletterInlineCard() {
    const handleSubscribe = () => {
        trackEvent('newsletter_cta_click', {
            location: 'inline_card',
            lead_magnet: 'ai_report_pdf'
        });
    };
    return (
        <section className="my-8 p-6 md:p-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                    </span>
                    Kostenloses Extra
                </div>
                <h2 className="mb-2 text-xl font-bold md:text-2xl">
                    SwissTech Intelligence Briefing
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Abonnieren Sie unseren Newsletter und erhalten Sie zusätzlich den monatlichen
                    <strong> «AI in Switzerland» Report (PDF)</strong> kostenlos direkt in Ihr Postfach.
                </p>
                <form
                    className="mb-4 flex flex-col gap-3 sm:flex-row"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubscribe();
                    }}
                >
                    <input
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900"
                        placeholder="Ihre E-Mail-Adresse"
                        required
                        type="email"
                    />
                    <button
                        className="whitespace-nowrap rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                        type="submit"
                    >
                        Report anfordern
                    </button>
                </form>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 italic">
                    Wir respektieren Ihre Privatsphäre. Abmeldung jederzeit möglich.
                </p>
            </div>
        </section>
    );
}
