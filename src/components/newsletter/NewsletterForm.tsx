"use client";

import React, { useActionState, useEffect, useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { trackEvent } from "@/lib/ga";
import { NEWSLETTER_CONFIG } from "@/lib/newsletter";

interface NewsletterFormProps {
    locale?: string;
    variant?: "compact" | "default";
}

export default function NewsletterForm({ locale = "de-CH", variant = "default" }: NewsletterFormProps) {
    const texts = NEWSLETTER_CONFIG.messages[locale as keyof typeof NEWSLETTER_CONFIG.messages] || NEWSLETTER_CONFIG.messages["de-CH"];

    const [state, formAction, isPending] = useActionState(subscribeToNewsletter, {
        status: "idle",
    });

    // Frontend validation states
    const [emailError, setEmailError] = useState<string | null>(null);
    const [consentError, setConsentError] = useState<string | null>(null);

    useEffect(() => {
        if (state.status === "success") {
            // TODO: newsletter_subscribe_success
            trackEvent("newsletter_subscribe_success", { method: "sender_net", variant });
        } else if (state.status === "error") {
            // TODO: newsletter_subscribe_error
            trackEvent("newsletter_subscribe_error", { error: state.message, variant });
        }
    }, [state.status, state.message, variant]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const consent = formData.get("consent") === "on";

        let hasError = false;

        // Reset errors
        setEmailError(null);
        setConsentError(null);

        // Validation
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError(texts.error_email);
            hasError = true;
        }

        if (!consent) {
            setConsentError(texts.error_consent);
            hasError = true;
        }

        if (hasError) {
            e.preventDefault();
            return;
        }

        // TODO: newsletter_subscribe_attempt
        trackEvent("newsletter_subscribe_attempt", { variant });
    };

    if (state.status === "success") {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-500">
                <span className="material-symbols-outlined text-emerald-500 text-4xl mb-3">check_circle</span>
                <p className="text-emerald-500 font-bold text-sm tracking-tight uppercase">Erfolgreich</p>
                <p className="text-slate-400 text-sm mt-1">{texts.success}</p>
            </div>
        );
    }

    return (
        <form action={formAction} onSubmit={handleFormSubmit} className="space-y-4" noValidate>
            {/* Honeypot Field */}
            <input type="text" name="full_name_field" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="space-y-1.5">
                <label htmlFor="newsletter-email" className="sr-only">{texts.placeholder}</label>
                <div className="relative group">
                    <input
                        id="newsletter-email"
                        type="email"
                        name="email"
                        required
                        placeholder={texts.placeholder}
                        aria-invalid={emailError || (state.status === "error" && state.message === texts.error_email) ? "true" : "false"}
                        aria-describedby={emailError ? "email-error" : undefined}
                        className={`w-full bg-slate-900 border ${emailError ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-white/5 group-hover:border-white/10 focus:ring-primary/50'} rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all`}
                    />
                </div>
                {emailError && (
                    <p id="email-error" className="text-[10px] text-rose-500 font-bold uppercase tracking-widest pl-1 animate-in fade-in slide-in-from-top-1">
                        {emailError}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-start gap-3 px-1">
                    <div className="flex items-center h-5 mt-0.5">
                        <input
                            id="consent"
                            name="consent"
                            type="checkbox"
                            required
                            aria-invalid={consentError ? "true" : "false"}
                            aria-describedby={consentError ? "consent-error" : undefined}
                            className={`h-4 w-4 rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary focus:ring-offset-slate-950 transition-colors cursor-pointer ${consentError ? 'border-rose-500' : ''}`}
                        />
                    </div>
                    <div className="text-xs leading-relaxed">
                        <label htmlFor="consent" className="text-slate-500 select-none cursor-pointer hover:text-slate-400 transition-colors">
                            {texts.consent}
                        </label>
                    </div>
                </div>
                {consentError && (
                    <p id="consent-error" className="text-[10px] text-rose-500 font-bold uppercase tracking-widest pl-1 animate-in fade-in slide-in-from-top-1">
                        {consentError}
                    </p>
                )}
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isPending ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>{texts.button_loading}</span>
                        </>
                    ) : (
                        <>
                            <span>{texts.button}</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </>
                    )}
                </button>

                <p className="text-[10px] text-slate-600 font-medium text-center mt-3 tracking-wide">
                    {texts.trust_note}
                </p>
            </div>

            {state.status === "error" && !emailError && !consentError && (
                <div className="flex items-center justify-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-1 px-1 text-center bg-rose-500/5 py-3 rounded-lg border border-rose-500/10">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {state.message}
                </div>
            )}

            <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/5 mt-4">
                <a href={`/${locale}/datenschutz`} className="text-[10px] text-slate-700 font-bold uppercase tracking-widest hover:text-slate-500 transition-colors">
                    {texts.privacy_note}
                </a>
                <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                <a href={`/${locale}/impressum`} className="text-[10px] text-slate-700 font-bold uppercase tracking-widest hover:text-slate-500 transition-colors">
                    {texts.imprint_note}
                </a>
            </div>
        </form>
    );
}
