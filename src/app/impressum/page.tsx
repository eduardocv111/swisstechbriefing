import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/lib/seo/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Impressum | ${SITE_CONFIG.name}`,
    description: 'Impressum und rechtliche Angaben zu SwissTech Briefing.',
};

export default function ImpressumPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12 md:py-20">
                <article className="prose prose-slate max-w-none dark:prose-invert">
                    <h1>Impressum</h1>

                    <h2>Angaben gemäss Schweizer Recht</h2>
                    {/* TODO: Ergänzen Sie hier die vollständigen Angaben des Betreibers */}
                    <p>
                        <strong>[Firmenname / Name des Betreibers]</strong><br />
                        [Strasse und Hausnummer]<br />
                        [PLZ Ort]<br />
                        Schweiz
                    </p>

                    <h2>Kontakt</h2>
                    <p>
                        E-Mail: <a href="mailto:redaktion@swisstechbriefing.ch">redaktion@swisstechbriefing.ch</a>
                    </p>

                    <h2>Verantwortlich für den Inhalt</h2>
                    <p>
                        {/* TODO: Name der verantwortlichen Person */}
                        <strong>[Name der verantwortlichen Person]</strong><br />
                        SwissTech Briefing Redaktion
                    </p>

                    <h2>Haftungsausschluss</h2>
                    <p>
                        Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt erstellt.
                        Der Anbieter übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit
                        und Aktualität der bereitgestellten Inhalte.
                    </p>
                    <p>
                        Die Nutzung der Inhalte erfolgt auf eigene Gefahr. Namentlich gekennzeichnete
                        Beiträge geben die Meinung des jeweiligen Autors wieder.
                    </p>

                    <h2>Urheberrecht</h2>
                    <p>
                        Die durch den Betreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                        dem Schweizer Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                        Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
                        des Autors bzw. Erstellers.
                    </p>

                    <h2>Links zu externen Websites</h2>
                    <p>
                        Unsere Website kann Links zu externen Websites Dritter enthalten, auf deren Inhalte
                        wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der
                        jeweilige Anbieter verantwortlich.
                    </p>
                </article>
            </main>
            <Footer />
        </div>
    );
}
