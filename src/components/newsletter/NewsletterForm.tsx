'use client';

import { useNewsletterSignup } from '@/hooks/useNewsletterSignup';

interface NewsletterFormProps {
    dict: {
        badge: string;
        offer: string;
        title: string;
        headline: string;
        description_extended: string;
        email_label: string;
        placeholder_extended: string;
        button_subscribe: string;
        submitting: string;
        privacy: string;
        success_title_short: string;
        success_message_extended: string;
        error: string;
    };
}

export default function NewsletterForm({ dict }: NewsletterFormProps) {
    const {
        email,
        setEmail,
        company,
        setCompany,
        handleSubmit,
        isSubmitting,
        isSuccess,
        isError
    } = useNewsletterSignup({
        source: 'dedicated_landing_page'
    });

    if (isSuccess) {
        return (
            <div className="py-12 animate-in fade-in zoom-in duration-500">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{dict.success_title_short}</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400" dangerouslySetInnerHTML={{ __html: dict.success_message_extended }} />
            </div>
        );
    }

    return (
        <>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <span className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 ${!isSubmitting ? 'animate-ping' : ''}`}></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                {dict.offer}
            </div>

            <h1
                className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-slate-900 dark:text-white leading-tight"
                dangerouslySetInnerHTML={{ __html: dict.headline }}
            />

            <p
                className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: dict.description_extended }}
            />

            <form onSubmit={handleSubmit} className="space-y-4 relative" noValidate>
                {/* Honeypot field */}
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

                <div className="relative group">
                    <label htmlFor="newsletter-email-page" className="sr-only">{dict.email_label}</label>
                    <input
                        id="newsletter-email-page"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={dict.placeholder_extended}
                        required
                        disabled={isSubmitting}
                        className={`w-full rounded-2xl border bg-white dark:bg-slate-950 px-6 py-4 text-lg outline-none transition-all focus:ring-4 focus:ring-primary/10 ${isError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-primary'
                            }`}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-h-[64px]"
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-3">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {dict.submitting}
                        </span>
                    ) : dict.button_subscribe}
                </button>
            </form>

            {isError && (
                <p className="mt-4 text-sm text-red-500 font-medium animate-in slide-in-from-bottom-2">
                    {dict.error}
                </p>
            )}

            <p className="mt-6 text-sm text-slate-500 italic">
                {dict.privacy}
            </p>
        </>
    );
}
