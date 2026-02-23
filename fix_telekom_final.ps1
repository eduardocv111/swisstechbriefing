$token = "Jesus1994-051834"
$apiUrl = "https://swisstechbriefing.ch/api/admin/publish"

$telekomContent = @"
<p class="lead">Die Meldung über Quanten-Teleportation wirkt spektakulär, wird aber häufig missverstanden. Es geht um die Übertragung eines Quantenzustands über 30 Kilometer kommerzielle Glasfaser – ein entscheidender Schritt für künftige Infrastrukturen.</p>
<h2>Einordnung: Warum diese Demonstration strategisch relevant ist</h2>
<p>Nach Angaben von Deutsche Telekoms T-Labs und Qunnect wurde in Berlin eine Quanten-Teleportation über rund <strong>30 Kilometer kommerzielle Glasfaser</strong> demonstriert – bei gleichzeitiger Koexistenz mit klassischem Datenverkehr. Diese Kombination verschiebt die Debatte: weg von der Frage, ob Quanten-Netzwerke physikalisch möglich sind, hin zur Frage, <strong>wie sie als Infrastrukturkomponente betrieben werden können</strong>.</p>

<figure class="my-10">
  <img src="/assets/images/articles/deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina/image-1.webp" alt="Visualización de una red cuántica urbana" class="w-full rounded-xl border border-slate-200 shadow-sm" />
  <figcaption class="mt-3 text-center text-sm text-slate-500 italic">Visualisierung der Kernidee: Quanten-Netzwerkfunktionen werden als zusätzliche Ebene auf bestehender Glasfaserinfrastruktur verstanden. <br/><strong>Fuente: Deutsche Telekom / Qunnect (imagen de prensa)</strong></figcaption>
</figure>

<h2>Strategischer Kontext</h2>
<p>Die theoretische Grundlage wurde 1993 beschrieben. Früher stand der physikalische Nachweis im Vordergrund, heute rückt die <strong>Systemintegration in reale Netze</strong> in den Mittelpunkt. Ein Telekom-Operator-Test in einer Live-Umgebung hat eine andere Aussagekraft als ein isoliertes Labor-Experiment.</p>

<figure class="my-10">
  <img src="/assets/images/articles/deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina/image-2.webp" alt="Hardware fotónica" class="w-full rounded-xl border border-slate-200 shadow-sm" />
  <figcaption class="mt-3 text-center text-sm text-slate-500 italic">Die Hardware-Seite bleibt ein kritischer Faktor: Quanten-Netzwerke benötigen stabile Komponenten und carrier-taugliche Betriebsprozesse. <br/><strong>Fuente: Qunnect (imagen corporativa)</strong></figcaption>
</figure>

<h2>Kernanalyse: Was T-Labs und Qunnect gezeigt haben</h2>
<p>Im Zentrum steht die Carina-Plattform von Qunnect. Ein besonders relevanter Aspekt ist die Koexistenz mit klassischem Traffic. Die gemeldete <strong>90 Prozent Fidelity</strong> ist ein relevanter technischer Indikator, der die Diskussion in Richtung Skalierung verschiebt.</p>

<h2>Relevanz für die Schweiz</h2>
<p>Für die Schweiz steht kurzfristig die Umstellung auf <strong>Post-Quantum-Kryptografie (PQC)</strong> im Vordergrund. Die Berliner Demonstration zeigt jedoch, dass parallel eine zweite strategische Linie entsteht: Quanten-Netzwerke als Ergänzung für hochsichere Kommunikation.</p>

<h2>Ausblick 2027–2028: Vom Demonstrator zu ersten Betreiber-Piloten</h2>
<p>Für die Jahre 2027–2028 ist realistisch, dass sich el enfoque se desplace hacia <strong>pilotos de redes cuánticas multinodo</strong>. Die Berliner Demonstration ist ein klares Signal, dass sich das Feld vom Labor schrittweise in Richtung Betreiberrealität bewegt.</p>
"@

$payload = @{
    slug = "deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina"
    title = "Quanten-Teleportation im Live-Netz: Deutsche Telekom und Qunnect demonstrieren Berliner Infrastruktur-Pilot"
    excerpt = "T-Labs und Qunnect zeigen Quanten-Teleportation über 30 km kommerzielle Glasfaser in Berlin. Ein Meilenstein für die operative Integrationsfähigkeit künftiger Quanten-Netzwerke."
    category = "KI"
    author = @{ name = "SwissTech Redaktion"; role = "Redaktion" }
    date = "2026-02-23T12:00:00Z"
    imageUrl = "/assets/images/articles/deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina/cover-deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina.webp"
    contentHtml = $telekomContent
    sources = @(@{name="Deutsche Telekom"; url="https://telekom.com"})
}

$json = $payload | ConvertTo-Json -Depth 10 -Compress
Invoke-RestMethod -Uri $apiUrl -Method POST -Headers @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
} -Body ([System.Text.Encoding]::UTF8.GetBytes($json))
Write-Host "FIXED TELEKOM ARTICLE" -ForegroundColor Green
