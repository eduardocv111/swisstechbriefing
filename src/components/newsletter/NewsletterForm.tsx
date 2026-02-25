"use client";

import React, { useActionState, useEffect } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { trackEvent } from "@/lib/ga";

interface NewsletterFormProps {
    locale?: string;
    variant?: "compact" | "default";
}

export default function NewsletterForm({ locale = "de-CH", variant = "default" }: NewsletterFormProps) {
    const [state, formAction, isPending] = useActionState(subscribeToNewsletter, {
        status: "idle",
    });

    useEffect(() => {
        if (state.status === "success") {
            trackEvent("newsletter_signup_success", { method: "sender_net" });
        } else if (state.status === "error") {
            trackEvent("newsletter_signup_error", { error: state.message });
        }
    }, [state.status, state.message]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        trackEvent("newsletter_signup_submit", { variant });
    };

    if (state.status === "success") {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-500">
                <span className="material-symbols-outlined text-emerald-500 text-4xl mb-3">check_circle</span>
                <p className="text-emerald-500 font-bold text-sm tracking-tight uppercase">Danke für Ihr Interesse</p>
                <p className="text-slate-400 text-sm mt-1">Bitte prüfen Sie Ihren Posteingang zur Bestätigung.</p>
            </div>
        );
    }

    return (
        <form action={formAction} onSubmit={handleFormSubmit} className="space-y-5">
            {/* Honeypot Field */}
            <input type="text" name="full_name_field" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <div className="relative group">
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Adresse"
                    className="w-full bg-slate-900 border border-white/5 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all group-hover:border-white/10"
                />
            </div>

            <div className="flex items-start gap-3 px-1">
                <div className="flex items-center h-5">
                    <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        required
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary focus:ring-offset-slate-950"
                    />
                </div>
                <div className="text-xs leading-5">
                    <label htmlFor="consent" className="text-slate-500 select-none">
                        Ich stimme zu, dass SwissTech Briefing mich per E-Mail kontaktiert.
                    </label>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isPending ? (
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <span>Abonnieren</span>
                        <span className="material-symbols-outlined text-sm">send</span>
                    </>
                )}
            </button>

            {state.status === "error" && (
                <div className="flex items-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-1 px-1">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {state.message}
                </div>
            )}

            <p className="text-[10px] text-slate-700 uppercase tracking-widest text-center">
                <a href={`/${locale}/datenschutz`} className="hover:text-slate-500 transition-colors">Datenschutz</a>
                <span className="mx-2 opacity-50">•</span>
                <a href={`/${locale}/impressum`} className="hover:text-slate-500 transition-colors">Impressum</a>
            </p>
        </form>
    );
}
