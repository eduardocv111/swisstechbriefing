'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/ga';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NewsletterPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Track GA4 event
        trackEvent('newsletter_cta_click', {
            location: 'dedicated_page',
            lead_magnet: 'ai_report_pdf'
        });

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source: 'dedicated_page',
                    leadMagnet: 'ai_report_pdf'
                }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Subscription failed:', err);
            setStatus('error');
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-xl w-full">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/5 rounded-full blur-3xl" />

                        {status === 'idle' ? (
                            <>
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                    </span>
                                    Exklusives Angebot
                                </div>

                                <h1 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                                    Der Schweizer <span className="text-primary italic">AI-Vorsprung</span> für Ihr Postfach.
                                </h1>

                                <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
                                    Treten Sie 2.000+ Experten bei. Erhalten Sie wöchentliche Insights und den monatlichen
                                    <span className="font-bold text-slate-900 dark:text-white"> «AI in Switzerland» Report (PDF)</span> kostenlos.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Ihre professionelle E-Mail"
                                            required
                                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-6 py-4 text-lg outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? 'Verarbeitung...' : 'Jetzt kostenlos abonnieren'}
                                    </button>
                                </form>

                                <p className="mt-6 text-sm text-slate-500 italic">
                                    Abmeldung jederzeit mit einem Klick möglich. Spamschutz inklusive.
                                </p>
                            </>
                        ) : status === 'success' ? (
                            <div className="py-12 animate-in fade-in zoom-in duration-500">
                                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Fast geschafft!</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400">
                                    Wir haben Ihnen soeben den Bestätigungslink und Ihren <span className="font-bold">AI Intelligence Report</span> zugeschickt. Bitte prüfen Sie Ihr Postfach.
                                </p>
                            </div>
                        ) : (
                            <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold mb-4">Hoops! Da lief etwas schief</h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-8">
                                    Wir konnten Ihre Anmeldung zur Zeit nicht verarbeiten. Bitte versuchen Sie es später noch einmal.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-primary font-bold hover:underline"
                                >
                                    Eskat erneut versuchen
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
