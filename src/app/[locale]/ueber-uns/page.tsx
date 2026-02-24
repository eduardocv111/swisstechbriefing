import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/lib/seo/site';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Über uns | ${SITE_CONFIG.name}`,
    description: 'Erfahren Sie mehr über die Mission und die Redaktion von SwissTech Briefing.',
};

export default async function UeberUnsPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
            <Header locale={locale} />
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-slate-900 dark:text-white leading-tight">
                        Editorial Mission & Fokus
                    </h1>

                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                            SwissTech Briefing ist das führende digitale Magazin for die Schnittstelle von Technologie, Wirtschaft und Sicherheit in der Schweiz. Unsere Mission ist es, komplexe technologische Entwicklungen präzise einzuordnen und ihre Relevanz for den Standort Schweiz aufzuzeigen.
                        </p>

                        <h2 className="text-2xl font-bold mt-12 mb-6">Unsere Schwerpunkte</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                            <li className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">Künstliche Intelligenz</h3>
                                <p className="text-sm">Fokus auf ETH/EPFL-Forschung und Schweizer KI-Compliance.</p>
                            </li>
                            <li className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">Defense Tech</h3>
                                <p className="text-sm">Cybersicherheit und technologische Innovationen der Armee.</p>
                            </li>
                            <li className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">Startups</h3>
                                <p className="text-sm">Deep-Tech Investment-Trends und Unicorn-Wachstum.</p>
                            </li>
                            <li className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">Regulierung</h3>
                                <p className="text-sm">FINMA-Richtlinien und Auswirkungen globaler Gesetze (EU AI Act).</p>
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-16 mb-6">Transparenz-Statement</h2>
                        <div className="bg-primary/5 p-8 rounded-2xl border-l-4 border-primary italic text-slate-700 dark:text-slate-300">
                            "Wir glauben an unabhängigen, faktenbasierten Journalismus. Alle unsere Analysen werden von Fachredaktoren verfasst. Bei Gastbeiträgen von Experten legen wir deren Hintergründe und mögliche Interessenbindungen stets offen dar. Wir nutzen KI-Tools ausschliesslich zur Unterstützung bei Recherche und Formatierung, niemals zur ungeprüften Generierung von Inhalten."
                        </div>

                        <h2 className="text-2xl font-bold mt-16 mb-6">Die Redaktion</h2>
                        <p>
                            Unser Team besteht aus erfahrenen Technologie-Journalisten und Fachreferenten mit Standorten in Zürich und Lausanne. Wir arbeiten eng mit Experten aus Wissenschaft und Industrie zusammen, um höchste fachliche Qualität zu garantieren.
                        </p>
                    </div>
                </div>
            </main>
            <Footer locale={locale} />
        </div>
    );
}
