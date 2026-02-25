import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterBox from "@/components/newsletter/NewsletterBox";
import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from "@/i18n/config";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function NewsletterPage({ params }: PageProps) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
            <Header locale={locale} />

            <main className="flex-1 flex items-center justify-center px-4 py-20 md:py-32">
                <div className="w-full max-w-5xl">
                    <NewsletterBox locale={locale} variant="hero" />

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        <div>
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                                <span className="material-symbols-outlined text-primary">analytics</span>
                            </div>
                            <h4 className="text-white font-bold mb-3 tracking-tight">Exklusive Analysen</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Erhalten Sie Einblicke in die Schweizer Tech-Szene, die Sie sonst nirgendwo finden.
                            </p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                                <span className="material-symbols-outlined text-primary">security</span>
                            </div>
                            <h4 className="text-white font-bold mb-3 tracking-tight">Digitale Souveränität</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Berichte über Cybersecurity, Datenschutz und die Zukunft der digitalen Schweiz.
                            </p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                                <span className="material-symbols-outlined text-primary">rocket_launch</span>
                            </div>
                            <h4 className="text-white font-bold mb-3 tracking-tight">Startup Monitor</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Bleiben Sie informiert über die spannendsten Neugründungen und Finanzierungen.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer locale={locale} />
        </div>
    );
}
