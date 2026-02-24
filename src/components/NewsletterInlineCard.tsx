'use client';

import { useNewsletterSignup } from '@/hooks/useNewsletterSignup';

interface NewsletterInlineCardProps {
    dict: {
        badge: string;
        title: string;
        description: string;
        email_label: string;
        placeholder: string;
        button: string;
        submitting: string;
        privacy: string;
        success_title: string;
        success_message: string;
        error: string;
    };
}

/**
 * NewsletterInlineCard - Premium CTA for newsletter signup.
 * Integrated with Formspree and Local Database via useNewsletterSignup hook.
 */
export default function NewsletterInlineCard({ dict }: NewsletterInlineCardProps) {
    const {
        email,
        setEmail,
        company,
        setCompany,
        status,
        handleSubmit,
        isSubmitting,
        isSuccess,
        isError
    } = useNewsletterSignup({
        source: 'newsletter_inline_card'
    });

    return (
        <section
            className="my-8 p-6 md:p-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300"
            aria-live="polite"
        >
            <div className="max-w-2xl mx-auto text-center">
                {!isSuccess ? (
                    <>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                            <span className="relative flex h-2 w-2">
                                <span className={`absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 ${!isSubmitting ? 'animate-ping' : ''}`}></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                            </span>
                            {dict.badge}
                        </div>
                        <h2 className="mb-2 text-xl font-bold md:text-2xl text-slate-900 dark:text-white">
                            {dict.title}
                        </h2>
                        <p
                            className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                            dangerouslySetInnerHTML={{ __html: dict.description }}
                        />

                        <form
                            className="mb-4 flex flex-col gap-3 sm:flex-row relative"
                            onSubmit={handleSubmit}
                            noValidate={status === 'idle'}
                        >
                            {/* Honeypot field (hidden from users) */}
                            <div className="hidden" aria-hidden="true">
                                <input
                                    type="text"
                                    name="company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="flex-1 relative">
                                <label htmlFor="newsletter-email-inline" className="sr-only">{dict.email_label}</label>
                                <input
                                    id="newsletter-email-inline"
                                    name="email"
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-900 ${isError ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-primary'
                                        }`}
                                    placeholder={dict.placeholder}
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <button
                                className={`whitespace-nowrap rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]`}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {dict.submitting}
                                    </span>
                                ) : dict.button}
                            </button>
                        </form>

                        {isError && (
                            <p className="text-red-500 text-xs mt-2 animate-in fade-in slide-in-from-top-1">
                                {dict.error}
                            </p>
                        )}

                        <p className="text-[11px] text-slate-500 dark:text-slate-500 italic">
                            {dict.privacy}
                        </p>
                    </>
                ) : (
                    <div className="py-8 animate-in fade-in zoom-in duration-300">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white underline decoration-primary decoration-4 underline-offset-4">{dict.success_title}</h2>
                        <p
                            className="text-slate-600 dark:text-slate-400"
                            dangerouslySetInnerHTML={{ __html: dict.success_message }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
