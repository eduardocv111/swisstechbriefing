import React from "react";
import NewsletterForm from "./NewsletterForm";

interface NewsletterBoxProps {
    locale?: string;
    variant?: "inline" | "footer" | "hero";
}

export default function NewsletterBox({ locale = "de-CH", variant = "inline" }: NewsletterBoxProps) {
    if (variant === "footer") {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="h-0.5 w-8 bg-blue-500 rounded-full"></span>
                    <h3 className="text-white font-bold text-xs uppercase tracking-widest">Newsletter</h3>
                </div>
                <p className="text-sm text-slate-400">Briefing zu Schweizer Tech-News und globaler Souveränität.</p>
                <NewsletterForm locale={locale} />
            </div>
        );
    }

    if (variant === "hero") {
        return (
            <div className="bg-slate-900 border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <span className="material-symbols-outlined text-8xl text-primary transform rotate-12">mail</span>
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-0.5 w-12 bg-primary rounded-full"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Direkt in Ihre Inbox</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-none">
                            SwissTech <span className="text-primary italic">Briefing</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                            Bleiben Sie an der Spitze der digitalen Transformation. Exklusive Analysen zu KI, Cybersecurity und Schweizer Innovation.
                        </p>
                    </div>
                    <div className="bg-slate-950/50 p-8 rounded-3xl border border-white/5">
                        <NewsletterForm locale={locale} />
                    </div>
                </div>
            </div>
        );
    }

    // Default: Inline (Article)
    return (
        <div className="my-16 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden relative group">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <div className="mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Insider Intelligence</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Verpassen Sie keine Analyse.</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                        Erhalten Sie wöchentlich das Wichtigste aus der Schweizer Tech-Szene und globale Insights.
                    </p>
                </div>
                <div className="w-full md:w-80 shrink-0">
                    <NewsletterForm locale={locale} />
                </div>
            </div>
        </div>
    );
}
