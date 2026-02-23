import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/lib/seo/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Datenschutzerklärung | ${SITE_CONFIG.name}`,
    description: 'Datenschutzerklärung von SwissTech Briefing gemäss DSGVO und dem Schweizer DSG.',
};

export default function DatenschutzPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12 md:py-20">
                <article className="prose prose-slate max-w-none dark:prose-invert">
                    <h1>Datenschutzerklärung</h1>
                    <p className="text-sm text-slate-500">Letzte Aktualisierung: 23. Februar 2026</p>

                    <h2>1. Verantwortliche Stelle</h2>
                    <p>
                        {/* TODO: Ergänzen Sie hier den vollständigen Firmennamen und die Adresse */}
                        <strong>[Firmenname / Betreiber]</strong><br />
                        [Strasse und Hausnummer]<br />
                        [PLZ Ort], Schweiz<br />
                        E-Mail: <a href="mailto:redaktion@swisstechbriefing.ch">redaktion@swisstechbriefing.ch</a>
                    </p>

                    <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
                    <p>
                        Beim Besuch unserer Website werden automatisch bestimmte technische Daten erhoben, die Ihr
                        Browser an unseren Server übermittelt (sog. Server-Logfiles). Dazu gehören unter anderem:
                    </p>
                    <ul>
                        <li>IP-Adresse (anonymisiert)</li>
                        <li>Datum und Uhrzeit des Zugriffs</li>
                        <li>Aufgerufene Seite und Referrer-URL</li>
                        <li>Browsertyp und Betriebssystem</li>
                    </ul>
                    <p>
                        Diese Daten sind nicht bestimmten Personen zuordenbar und werden nur zur Sicherstellung
                        eines reibungslosen Betriebs und zur Verbesserung unseres Angebots ausgewertet.
                    </p>

                    <h2>3. Cookies und Einwilligungsverwaltung</h2>
                    <p>
                        Wir verwenden Cookies auf unserer Website. Details zu den eingesetzten Cookies, deren Zweck
                        und Ihren Wahlmöglichkeiten finden Sie in unserer{' '}
                        <a href="/cookie-richtlinie">Cookie-Richtlinie</a>.
                    </p>
                    <p>
                        Beim ersten Besuch unserer Website wird Ihnen ein Cookie-Banner angezeigt, über das Sie
                        Ihre Einwilligung zu nicht notwendigen Cookies erteilen oder verweigern können. Sie können
                        Ihre Entscheidung jederzeit über den Link &laquo;Cookie-Einstellungen&raquo; im Footer ändern.
                    </p>
                    <p>
                        <strong>Notwendige Cookies</strong> werden auf Grundlage unseres berechtigten Interesses
                        gesetzt (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO / Art.&nbsp;31 DSG).
                        <strong> Analyse- und Marketing-Cookies</strong> werden nur mit Ihrer ausdrücklichen
                        Einwilligung aktiviert (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO / Art.&nbsp;30 Abs.&nbsp;2 DSG).
                    </p>

                    <h2>4. Webanalyse</h2>
                    <p>
                        Sofern Sie Ihre Einwilligung erteilen, verwenden wir Google Analytics 4, einen Webanalysedienst
                        der Google LLC. Google Analytics verwendet Cookies, um die Nutzung der Website zu analysieren.
                        Die dabei erzeugten Informationen werden an einen Server von Google übertragen und dort gespeichert.
                    </p>
                    <p>
                        Wir haben die IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google innerhalb von
                        Mitgliedstaaten der EU bzw. des EWR vor der Übermittlung gekürzt wird.
                    </p>
                    <p>
                        Sie können die Erfassung durch Google Analytics verhindern, indem Sie keine Einwilligung
                        für Analyse-Cookies erteilen oder Ihre Einwilligung jederzeit widerrufen.
                    </p>

                    <h2>5. Newsletter</h2>
                    <p>
                        {/* TODO: Falls ein Newsletter-Dienst genutzt wird, Details hier ergänzen */}
                        Wenn Sie sich für unseren Newsletter anmelden, verwenden wir Ihre E-Mail-Adresse
                        ausschliesslich für den Versand des Newsletters. Sie können sich jederzeit abmelden.
                    </p>

                    <h2>6. Ihre Rechte</h2>
                    <p>
                        Nach DSGVO und dem Schweizer Datenschutzgesetz (DSG) haben Sie folgende Rechte bezüglich
                        Ihrer personenbezogenen Daten:
                    </p>
                    <ul>
                        <li><strong>Auskunftsrecht</strong> — welche Daten wir über Sie gespeichert haben</li>
                        <li><strong>Berichtigungsrecht</strong> — Korrektur unrichtiger Daten</li>
                        <li><strong>Löschungsrecht</strong> — Löschung Ihrer Daten</li>
                        <li><strong>Widerspruchsrecht</strong> — Widerspruch gegen die Verarbeitung</li>
                        <li><strong>Recht auf Datenübertragbarkeit</strong></li>
                        <li><strong>Beschwerderecht</strong> — bei der zuständigen Aufsichtsbehörde</li>
                    </ul>
                    <p>
                        In der Schweiz ist die zuständige Aufsichtsbehörde der{' '}
                        <a href="https://www.edoeb.admin.ch/" target="_blank" rel="noopener noreferrer">
                            Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB)
                        </a>.
                    </p>

                    <h2>7. Datensicherheit</h2>
                    <p>
                        Wir setzen technische und organisatorische Sicherheitsmassnahmen ein, um Ihre Daten
                        gegen Manipulation, Verlust, Zerstörung oder unbefugten Zugriff zu schützen.
                        Unsere Website verwendet TLS-Verschlüsselung (HTTPS).
                    </p>

                    <h2>8. Änderungen dieser Datenschutzerklärung</h2>
                    <p>
                        Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte
                        Rechtslagen oder Änderungen unseres Angebots anzupassen. Es gilt die jeweils aktuelle Fassung.
                    </p>

                    <h2>9. Kontakt</h2>
                    <p>
                        Bei Fragen zum Datenschutz wenden Sie sich bitte an:{' '}
                        <a href="mailto:redaktion@swisstechbriefing.ch">redaktion@swisstechbriefing.ch</a>
                    </p>
                </article>
            </main>
            <Footer />
        </div>
    );
}
