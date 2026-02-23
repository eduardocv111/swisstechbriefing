import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/lib/seo/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Cookie-Richtlinie | ${SITE_CONFIG.name}`,
    description: 'Informationen zu den von SwissTech Briefing verwendeten Cookies, deren Zweck und Ihren Wahlmöglichkeiten.',
};

export default function CookieRichtliniePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12 md:py-20">
                <article className="prose prose-slate max-w-none dark:prose-invert">
                    <h1>Cookie-Richtlinie</h1>
                    <p className="text-sm text-slate-500">Letzte Aktualisierung: 23. Februar 2026</p>

                    <h2>Was sind Cookies?</h2>
                    <p>
                        Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät gespeichert werden.
                        Sie ermöglichen es der Website, Ihren Browser bei zukünftigen Besuchen wiederzuerkennen und bestimmte
                        Informationen zu speichern (z.&nbsp;B. Ihre Spracheinstellungen oder Ihre Cookie-Präferenzen).
                    </p>

                    <h2>Welche Cookies verwenden wir?</h2>
                    <p>SwissTech Briefing verwendet Cookies in drei Kategorien:</p>

                    <h3>1. Notwendige Cookies</h3>
                    <p>
                        Diese Cookies sind für den grundlegenden Betrieb der Website unerlässlich. Sie ermöglichen
                        Kernfunktionen wie Seitennavigation, Sicherheit und die Speicherung Ihrer Cookie-Einstellungen.
                        Diese Cookies können nicht deaktiviert werden.
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Cookie</th>
                                <th>Zweck</th>
                                <th>Dauer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>stb_consent</code></td>
                                <td>Speichert Ihre Cookie-Einwilligungsentscheidung</td>
                                <td>13 Monate</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>2. Analyse-Cookies</h3>
                    <p>
                        Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen, welche Seiten am
                        häufigsten besucht werden und wo Verbesserungspotenzial besteht. Die Daten werden anonymisiert
                        und aggregiert erhoben. Wir verwenden hierfür <strong>Google Analytics 4</strong>.
                    </p>
                    <p>
                        Diese Cookies werden <strong>nur mit Ihrer ausdrücklichen Einwilligung</strong> gesetzt.
                    </p>

                    <h3>3. Marketing-Cookies</h3>
                    <p>
                        Marketing-Cookies werden verwendet, um Ihnen relevante Werbeanzeigen auf Grundlage Ihrer
                        Interessen anzuzeigen und deren Wirksamkeit zu messen. In der aktuellen Phase setzt SwissTech
                        Briefing noch keine Marketing-Cookies ein. Die Kategorie ist vorbereitet für eine zukünftige
                        Integration mit Werbepartnern.
                    </p>
                    <p>
                        Auch diese Cookies werden <strong>nur mit Ihrer Einwilligung</strong> aktiviert.
                    </p>

                    <h2>Wie können Sie Ihre Einstellungen ändern?</h2>
                    <p>
                        Sie können Ihre Cookie-Einstellungen jederzeit über den Link{' '}
                        <strong>&laquo;Cookie-Einstellungen&raquo;</strong> im Footer der Website anpassen.
                        Dort können Sie einzelne Kategorien aktivieren oder deaktivieren.
                    </p>
                    <p>
                        Darüber hinaus können Sie Cookies jederzeit in den Einstellungen Ihres Browsers löschen
                        oder blockieren. Bitte beachten Sie, dass das Blockieren notwendiger Cookies die Funktionalität
                        der Website beeinträchtigen kann.
                    </p>

                    <h2>Drittanbieter</h2>
                    <p>Folgende Drittanbieter können bei entsprechender Einwilligung Cookies setzen:</p>
                    <ul>
                        <li>
                            <strong>Google Analytics (Google LLC)</strong> — Webanalyse.{' '}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                                Datenschutzerklärung
                            </a>
                        </li>
                    </ul>
                    <p>
                        {/* TODO: Ergänzen Sie hier weitere Drittanbieter, sobald Marketing-/Werbepartner aktiv werden */}
                        Weitere Drittanbieter werden bei Aktivierung ergänzt und hier dokumentiert.
                    </p>

                    <h2>Rechtsgrundlage</h2>
                    <p>
                        Die Rechtsgrundlage für den Einsatz von notwendigen Cookies ist unser berechtigtes Interesse
                        am Betrieb der Website (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO bzw. Art.&nbsp;31 DSG).
                        Analyse- und Marketing-Cookies werden ausschliesslich auf Grundlage Ihrer Einwilligung
                        eingesetzt (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO bzw. Art.&nbsp;30 Abs.&nbsp;2 DSG).
                    </p>

                    <h2>Aktualisierung dieser Richtlinie</h2>
                    <p>
                        Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, insbesondere wenn neue
                        Cookies oder Drittanbieter hinzukommen. Bei wesentlichen Änderungen wird Ihre Einwilligung
                        erneut eingeholt (über eine aktualisierte Consent-Version).
                    </p>

                    <h2>Kontakt</h2>
                    <p>
                        Bei Fragen zu dieser Cookie-Richtlinie oder Ihrer Privatsphäre können Sie uns unter{' '}
                        <a href="mailto:redaktion@swisstechbriefing.ch">redaktion@swisstechbriefing.ch</a> erreichen.
                    </p>
                </article>
            </main>
            <Footer />
        </div>
    );
}
