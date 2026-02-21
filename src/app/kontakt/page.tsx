import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/lib/seo/site';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Kontakt | ${SITE_CONFIG.name}`,
    description: 'Kontaktieren Sie die Redaktion von SwissTech Briefing for Presseanfragen oder Feedback.',
};

export default function KontaktPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
                        Kontakt
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Haben Sie Feedback, eine Newsmeldung oder Presseanfragen? Wir freuen uns auf Ihre Nachricht.
                    </p>

                    <div className="grid gap-8 text-left">
                        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                Redaktion
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-2">Für allgemeine Anfragen und Newsmeldungen:</p>
                            <a href="mailto:redaktion@swisstech-briefing.ch" className="text-primary font-bold hover:underline">
                                redaktion@swisstech-briefing.ch
                            </a>
                        </section>

                        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">campaign</span>
                                Presseanfragen
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-2">Medienanfragen und Interview-Wünsche:</p>
                            <a href="mailto:media@swisstech-briefing.ch" className="text-primary font-bold hover:underline">
                                media@swisstech-briefing.ch
                            </a>
                        </section>

                        <section className="bg-primary/5 p-8 rounded-2xl border border-primary/20 text-center">
                            <h2 className="text-xl font-bold mb-4">Bleiben Sie informiert</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Abonnieren Sie unseren Newsletter, um keine wichtige Meldung zu verpassen.
                            </p>
                            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-all">
                                Zum Newsletter anmelden
                            </button>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
