import { PrismaClient } from "../src/generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

async function main() {
    const adapter = new PrismaBetterSqlite3({ url: "file:./data/stb.db" });
    const prisma = new PrismaClient({ adapter });

    const slug = "deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina";

    const title =
        "Deutsche Telekom demonstriert Quanten-Teleportation über 30 Kilometer kommerzielle Glasfaser in Berlin";

    const excerpt =
        "Deutsche Telekom (T-Labs) und Qunnect haben Quanten-Teleportation über eine rund 30 Kilometer lange kommerzielle Glasfaserstrecke in Berlin demonstriert und dabei laut Unternehmensangaben eine durchschnittliche Fidelity von rund 90 Prozent erreicht. Strategisch entscheidend ist nicht der Begriff «Teleportation», sondern der Nachweis, dass sich Quanten-Netzwerkfunktionen in bestehende Betreiberinfrastruktur integrieren lassen. Für Europa und die Schweiz erhöht das den Druck, bei Quanten-Netzwerken, Sicherheitsarchitekturen und Standardisierung früh operative Kompetenz aufzubauen.";

    const contentHtml = `<h2>Einordnung: Warum diese Demonstration strategisch relevant ist</h2>
<p>Die Meldung über Quanten-Teleportation wirkt spektakulär, wird aber häufig missverstanden. Es geht nicht um den Transport von Materie oder Menschen, sondern um die <strong>Übertragung eines Quantenzustands</strong> (also der Information eines Qubits) von einem Ort zu einem anderen. Das Verfahren basiert auf <strong>Verschränkung</strong> und zusätzlicher klassischer Kommunikation. In der Forschung ist das Prinzip seit den 1990er-Jahren bekannt; neu und strategisch relevant ist hier der Schritt in eine <strong>reale Telekommunikationsumgebung</strong> ausserhalb einer isolierten Laborstrecke.</p>
<p>Nach Angaben von Deutsche Telekoms T-Labs und Qunnect wurde in Berlin eine Quanten-Teleportation über rund <strong>30 Kilometer kommerzielle Glasfaser</strong> demonstriert \u2013 bei gleichzeitiger Koexistenz mit klassischem Datenverkehr und mit einer gemeldeten durchschnittlichen Erfolgsrate bzw. Fidelity von rund <strong>90 Prozent</strong>. Diese Kombination aus Distanz, Infrastruktur-Nähe und betrieblicher Umgebung verschiebt die Debatte: weg von der Frage, ob Quanten-Netzwerke physikalisch möglich sind, hin zur Frage, <strong>wie sie als Infrastrukturkomponente betrieben, überwacht und skaliert werden können</strong>.</p>
<p>Für SwissTech Briefing ist das vor allem ein Infrastrukturthema mit Security-Relevanz. Sobald Quanten-Netzwerke aus dem Labor in Betreiberumgebungen übergehen, betrifft das nicht nur Forschung, sondern auch Netzbetrieb, Standards, Lieferketten, Zertifizierung und später Beschaffung durch staatliche und kritische Betreiber. Genau an diesem Übergang setzt die Berliner Demonstration an.</p>

<figure class="my-10">
  <img src="/assets/images/articles/deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina/image-1.webp" alt="Visualisierung eines urbanen Quanten-Netzwerks über Berliner Glasfaserinfrastruktur" class="w-full rounded-xl border border-slate-200 shadow-sm" />
  <figcaption class="mt-3 text-center text-sm text-slate-500 italic">Visualisierung der Kernidee: Quanten-Netzwerkfunktionen werden nicht als Ersatz des heutigen Internets verstanden, sondern als zusätzliche Ebene auf bestehender Glasfaserinfrastruktur.</figcaption>
</figure>

<h2>Strategischer Kontext</h2>
<h3>Von der Theorie (1993) zur Infrastrukturfrage (2026)</h3>
<p>Die theoretische Grundlage der Quanten-Teleportation wurde 1993 beschrieben. 1997 folgte mit Anton Zeilingers Team ein früher experimenteller Nachweis, dass sich das Prinzip praktisch umsetzen lässt. Seither wurde die Teleportation in vielen Konfigurationen und über steigende Distanzen demonstriert. Der Unterschied zur aktuellen Phase ist jedoch entscheidend: Früher stand der <strong>physikalische Nachweis</strong> im Vordergrund, heute rückt die <strong>Systemintegration in reale Netze</strong> in den Mittelpunkt.</p>
<p>Damit verändert sich auch die Bewertung. Ein einzelner Rekordwert ist weniger relevant als Fragen wie: Funktioniert das auf bestehender Betreiber-Glasfaser? Bleibt die Qualität über Zeit stabil? Wie verhält sich das System bei realer Netzumgebung, Temperaturdrift und betrieblicher Variabilität? Lässt sich das überwachen, automatisieren und in ein Carrier-Modell übersetzen? Diese Fragen sind typisch für den Übergang von Forschung zu Infrastrukturtechnologie.</p>

<h3>Warum Betreiber-Demos strategisch wichtiger sind als reine Laborergebnisse</h3>
<p>Ein Telekom-Operator-Test in einer Live-Umgebung hat eine andere Aussagekraft als ein isoliertes Labor-Experiment. Betreiber müssen Technologien in heterogene Netze, bestehende Prozesse und Sicherheitsvorgaben integrieren. Wenn T-Labs zeigen, dass Quanten-Teleportation auf kommerzieller Glasfaser in einer Berliner Umgebung parallel zu konventionellem Internetverkehr demonstriert werden kann, ist das ein Hinweis auf <strong>Integrationsfähigkeit</strong> \u2013 nicht auf Marktreife, aber auf einen relevanten Zwischenschritt.</p>
<p>Gerade in Europa ist dieser Punkt wichtig: Der Wettbewerb wird nicht nur über Quantenprozessoren entschieden, sondern auch über <strong>Netzwerkinfrastruktur, Orchestrierung und Betriebsfähigkeit</strong>. Wer diese Ebene kontrolliert, kontrolliert später Teile der Wertschöpfung rund um Quantum Networking.</p>

<h2>Kernanalyse: Was T-Labs und Qunnect gezeigt haben</h2>
<h3>Die Rolle der Carina-Plattform von Qunnect</h3>
<p>Im Zentrum der Demonstration steht die <strong>Carina-Plattform von Qunnect</strong>, die laut den Angaben Komponenten für die Verteilung verschränkter Photonen bereitstellt. Der praktische Nutzen liegt darin, dass die Plattform auf einen realen Netzkontext ausgerichtet ist und nicht nur auf eine hochkontrollierte Laborumgebung. Für Betreiber ist das entscheidend, weil Quanten-Signale empfindlich auf Störungen reagieren und deshalb Stabilisierung, Kalibrierung und reproduzierbare Qualität über Zeit eine zentrale Rolle spielen.</p>
<p>Im beschriebenen Setup werden verschränkte Photonenpaare erzeugt und über Glasfaser verteilt. Die Teleportation selbst basiert auf vorab geteilter Verschränkung und einer Messoperation, deren Resultat zusätzlich über einen klassischen Kanal übertragen wird. Damit wird auch klar, was diese Demonstration <strong>nicht</strong> ist: keine «sofortige Kommunikation» im populären Sinn, sondern ein quantenphysikalisches Protokoll, das klassische Infrastruktur weiterhin benötigt.</p>

<h3>30 km kommerzielle Glasfaser und Koexistenz mit klassischem Traffic</h3>
<p>Ein besonders relevanter Aspekt der Berliner Demonstration ist die Strecke von rund <strong>30 km</strong> auf kommerzieller Glasfaser. Noch wichtiger als die reine Distanz ist jedoch die Aussage, dass die Demonstration in einer Umgebung stattfand, in der die Glasfaser zugleich für konventionelle Kommunikation genutzt wird. Diese Koexistenz ist aus Betreiberperspektive zentral, weil ein späterer Einsatz kaum auf dedizierte «Quanten-only»-Netze beschränkt bleiben dürfte.</p>
<p>Damit adressiert die Demonstration eine der wichtigsten Hürden für die nächste Phase des Quantum Networking: <strong>Wie lassen sich Quantenkanäle in bestehende Metronetze integrieren, ohne den klassischen Betrieb grundlegend umzubauen?</strong> Genau hier entsteht der potenzielle wirtschaftliche Hebel \u2013 und zugleich die operative Komplexität.</p>

<figure class="my-10">
  <img src="/assets/images/articles/deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina/image-2.webp" alt="Photonik-Hardware für Quanten-Netzwerkexperimente in Betreiberumgebung" class="w-full rounded-xl border border-slate-200 shadow-sm" />
  <figcaption class="mt-3 text-center text-sm text-slate-500 italic">Die Hardware-Seite bleibt ein kritischer Faktor: Quanten-Netzwerke benötigen nicht nur physikalische Machbarkeit, sondern stabile Komponenten, Kalibrierung und carrier-taugliche Betriebsprozesse.</figcaption>
</figure>

<h3>Einordnung der gemeldeten 90 Prozent Fidelity</h3>
<p>Die gemeldete durchschnittliche Fidelity von rund <strong>90 Prozent</strong> ist ein relevanter technischer Indikator, aber kein Endpunkt. In strategischer Einordnung bedeutet dieser Wert: Das System ist unter realitätsnäheren Bedingungen leistungsfähig genug, um die Diskussion in Richtung Betrieb, Skalierung und Standards zu verschieben. Für produktive Dienste wären jedoch zusätzlich Fragen zu Verfügbarkeit, Fehlerkorrekturpfaden, Wiederholbarkeit, Monitoring und Service-Level zentral.</p>
<p>Die oft geäusserte Erwartung, man könne durch weitere Optimierung «nahe 100 Prozent» erreichen, ist als Entwicklungsrichtung plausibel, ersetzt aber keine Betriebsmetriken. Für Infrastrukturbetreiber ist nicht nur Peak-Performance wichtig, sondern vor allem <strong>vorhersagbare Performance über Zeit</strong>, inklusive Umgang mit Drift, Wartung und Interoperabilität zwischen Komponenten verschiedener Hersteller.</p>

<h3>Technische Einordnung: 795 nm und vorab geteilte Verschränkung</h3>
<p>Die Berichte zur Demonstration verweisen auf eine Teleportationswellenlänge von <strong>795 nm</strong> und auf «pre-shared entanglement» (vorab geteilte Verschränkung). Diese Details sind nicht bloss akademisch. Sie zeigen, dass die Demonstration in eine breitere Entwicklungsrichtung passt, in der Netzwerke nicht nur Daten transportieren, sondern Zustände, Taktinformationen und später potenziell Ressourcen für verteilte Quantenanwendungen bereitstellen. Die konkrete technische Ausgestaltung wird künftig stark von Interoperabilität und Standardisierung abhängen.</p>

<h2>Europäische Implikationen</h2>
<h3>Von Forschungsprogrammen zu Betreiberfähigkeit</h3>
<p>Europa verfügt über starke Forschungskapazitäten in Quantenphysik und Quantentechnologien, aber der strategische Wettbewerb verlagert sich zunehmend auf <strong>Infrastrukturkompetenz</strong>: Wer kann Quantenfunktionen in reale Telekom- und Rechenzentrumsumgebungen integrieren? Wer liefert die Hardware? Wer kontrolliert die Netzwerksoftware und das Orchestrierungsmodell? Die Berliner Demonstration ist deshalb nicht nur eine PR-Meldung, sondern ein Hinweis auf die nächste Wettbewerbsebene.</p>
<p>Im Kontext europäischer Initiativen wie EuroQCI und nationaler Quantenprogramme stärkt ein Betreiber-Use-Case die Argumentation für praxisnahe Pilotnetze. Gleichzeitig entsteht das Risiko neuer Abhängigkeiten, falls kritische Komponenten \u2013 von Photonik über Steuerung bis zu Netzwerksoftware \u2013 in wenigen nicht-europäischen Stacks konzentriert werden. Europa wird deshalb stärker zwischen Forschungsförderung und <strong>industriepolitischer Architektur</strong> unterscheiden müssen.</p>

<h3>Standardisierung, Zertifizierung und Security-by-Design</h3>
<p>Mit der Verlagerung in reale Betreiberumgebungen wird Standardisierung zum strategischen Thema. Ohne interoperable Schnittstellen drohen proprietäre Inseln. Für Verteidigungs-, Behörden- und kritische Infrastrukturkontexte wäre das problematisch, weil Beschaffung, Auditierbarkeit und Sicherheitszertifizierung dadurch erschwert werden.</p>
<p>Ebenso wichtig ist ein Security-by-Design-Ansatz. Quanten-Netzwerke werden häufig nur unter dem Gesichtspunkt «mehr Sicherheit» betrachtet. In der Praxis entstehen aber neue Angriffsflächen: Manipulation von Kalibrierung, Side-Channels, Supply-Chain-Risiken bei Hardware sowie softwareseitige Schwachstellen im Orchestrierungs- und Monitoring-Layer. Die strategische Frage lautet daher nicht nur, <strong>ob</strong> Quanten-Netzwerke sicherere Eigenschaften ermöglichen, sondern <strong>wie</strong> ihre Betriebsumgebung abgesichert wird.</p>

<h3>Signalwirkung durch parallele Entwicklungen in den USA</h3>
<p>Dass zeitnah auch Cisco und Qunnect eine metro-scale Quanten-Netzwerkdemonstration auf bestehender Glasfaser in New York kommuniziert haben, unterstreicht eine internationale Dynamik: Quantum Networking entwickelt sich vom Forschungsthema zur <strong>Telekom- und Infrastrukturdisziplin</strong>. Für Europa bedeutet das, dass Marktstruktur, Standards und Referenzarchitekturen in den kommenden Jahren geformt werden \u2013 nicht erst in einer fernen Zukunft.</p>

<h2>Relevanz für die Schweiz</h2>
<h3>Quantum-safe Transition bleibt Pflicht \u2013 Quantum Networking wird strategische Option</h3>
<p>Für die Schweiz steht kurzfristig weiterhin die Umstellung auf <strong>Post-Quantum-Kryptografie (PQC)</strong> im Vordergrund. Diese Transition ist unabhängig davon notwendig, wie schnell Quanten-Netzwerke in den Regelbetrieb kommen. Die Berliner Demonstration zeigt jedoch, dass parallel eine zweite strategische Linie entsteht: Quanten-Netzwerke als mögliche Ergänzung für hochsichere Kommunikation, Verifikationsmechanismen und später spezialisierte Anwendungen in kritischen Sektoren.</p>
<p>Für Finanzmarktinfrastruktur, Energie, Gesundheitswesen und staatliche Stellen ist das relevant, weil die Schweiz stark von verlässlicher, sicherer und auditierbarer digitaler Infrastruktur abhängt. Frühzeitige Pilotkompetenz kann hier ein Vorteil sein \u2013 nicht zwingend durch sofortige Grossinvestitionen, sondern durch gezielte Testfelder, Governance-Modelle und Beschaffungswissen.</p>

<h3>Industrie- und Forschungsstandort: Wo die Schweiz Hebel hat</h3>
<p>Die Schweiz verfügt mit ETH-/EPFL-nahen Ökosystemen, Photonik- und Präzisionsindustrie sowie starker Sicherheits- und Engineering-Kompetenz über Ansatzpunkte, um bei Quantum Networking nicht nur Endanwenderin zu sein. Besonders realistisch sind Rollen in <strong>Photonikkomponenten, Präzisionsmesstechnik, Timing, Security Engineering und Test-/Validierungsumgebungen</strong>. Für ein kleines Land ist das strategisch oft wirksamer als der Versuch, die gesamte Stack-Tiefe allein abzudecken.</p>
<p>Auch die Telekom- und Rechenzentrumslandschaft der Schweiz könnte von frühen Pilotstrecken profitieren. Der Mehrwert läge weniger in kurzfristiger Kommerzialisierung als in <strong>operativen Lernkurven</strong>: Welche Anforderungen ergeben sich im Betrieb? Welche Sicherheits- und Compliance-Fragen entstehen? Welche Schnittstellen und Standards sind für spätere Beschaffung relevant?</p>

<h2>Ausblick 2027\u20132028: Vom Demonstrator zu ersten Betreiber-Piloten</h2>
<p>Für die Jahre <strong>2027\u20132028</strong> ist realistisch, dass sich der Fokus von einzelnen Teleportationsdemos auf <strong>mehrknotige Quanten-Netzwerk-Piloten</strong> verschiebt. Dazu gehören robustere Verschränkungsverteilung, Entanglement-Swapping über mehrere Knoten, bessere automatische Stabilisierung sowie die Kopplung an konkrete Anwendungen (z.B. Schlüsselmanagement, verteilte Quantenrechenressourcen oder Timing-/Sensor-Netze).</p>
<p>Der wirtschaftliche und geopolitische Hebel wird dann nicht primär aus dem Schlagwort «Teleportation» entstehen, sondern aus der Frage, welche Akteure die operative Architektur definieren: Hardware-Lieferanten, Netzwerkausrüster, Carrier, Software-Orchestrierung und Zertifizierungsregime. Wer diese Bausteine früh in Referenzprojekten verankert, gewinnt später Einfluss auf Standards und Beschaffungsentscheidungen.</p>
<p>Für die Schweiz ergibt sich daraus eine nüchterne Doppelstrategie: <strong>PQC-Migration konsequent umsetzen</strong> und gleichzeitig <strong>Quantum-Networking-Kompetenz über gezielte Piloten und Partnerschaften</strong> aufbauen. Die Berliner Demonstration von Deutsche Telekom und Qunnect ist dafür kein Endpunkt, aber ein klares Signal, dass sich das Feld vom Labor schrittweise in Richtung Betreiberrealität bewegt.</p>`;

    const sourcesJson = JSON.stringify([
        {
            name: "Deutsche Telekom \u2013 Teleportation via fiber optics in Berlin",
            url: "https://www.telekom.com/en/media/media-information/archive/teleportation-via-fiber-optics-in-berlin-1102518",
        },
        {
            name: "Reuters \u2013 Cisco and Qunnect build quantum network using New York fiber optic cables",
            url: "https://www.reuters.com/business/media-telecom/cisco-qunnect-build-quantum-network-using-new-york-fiber-optic-cables-2026-02-18/",
        },
    ]);

    const imageUrl =
        "/assets/images/articles/deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina/cover-deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina.webp";

    try {
        const result = await prisma.article.upsert({
            where: { slug },
            update: {
                title,
                excerpt,
                contentHtml,
                category: "Defense & Security Tech",
                authorName: "SwissTech Redaktion",
                authorRole: "Geopolitik & Defense Tech",
                sourcesJson,
                imageUrl,
                date: new Date("2026-02-23T15:50:00+01:00"),
            },
            create: {
                slug,
                title,
                excerpt,
                contentHtml,
                category: "Defense & Security Tech",
                authorName: "SwissTech Redaktion",
                authorRole: "Geopolitik & Defense Tech",
                sourcesJson,
                imageUrl,
                date: new Date("2026-02-23T15:50:00+01:00"),
            },
        });

        console.log("Article erfolgreich aktualisiert: " + result.slug);
    } catch (error) {
        console.error("\u274C Fehler beim Update:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
