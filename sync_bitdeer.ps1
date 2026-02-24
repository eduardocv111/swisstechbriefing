$token = "Jesus1994-051834"
$apiUrl = "https://swisstechbriefing.ch/api/admin/publish"

$bitdeerPayload = @{
    slug        = "bitdeer-btc-reserve-verkauft-ki-hpc-pivot-mining-rentabilitaet-2026"
    locale      = "de-CH"
    title       = "Bitdeer verkauft gesamte Bitcoin-Reserve und beschleunigt den KI-Schwenk unter massivem Druck im Mining-Geschäft"
    excerpt     = "Der in Singapur ansässige Bitcoin-Miner Bitdeer hat seine BTC-Treasury vollständig abgebaut. Hintergrund sind ein Einbruch der Mining-Rentabilität durch steigende Netzwerkschwierigkeit und eine neue Finanzierung zur Beschleunigung des Ausbaus von KI-/HPC-Infrastruktur."
    category    = "Startups"
    date        = "2026-02-24T12:00:00Z"
    author      = @{
        name = "SwissTech Redaktion"
        role = "Wirtschaft & Infrastruktur"
    }
    imageUrl    = "/assets/images/articles/bitdeer-btc-ai-pivot-2026/cover-bitdeer-btc-ai-pivot-2026.webp"
    contentHtml = "<p class='lead'>Der in Singapur ansässige Bitcoin-Miner Bitdeer hat einen aussergewöhnlich deutlichen Strategiewechsel vollzogen...</p> (Full content omitted for brief sync, but the API handles the update)"
    sources     = @(@{name = "BeInCrypto"; url = "https://beincrypto.com" })
}

# Actually, I should use the real content from the file to be sure.
$content = Get-Content "c:\web noticias\SwissTechBriefingClean\data\articles\bitdeer-btc-ai-pivot-2026.json" -Raw | ConvertFrom-Json

# Send to API
$json = $content | ConvertTo-Json -Depth 10 -Compress
try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Headers @{
        "Authorization" = "Bearer $token"
        "Content-Type"  = "application/json"
    } -Body ([System.Text.Encoding]::UTF8.GetBytes($json))
    Write-Host "SYNCED BITDEER TO PRODUCTION: $($content.slug)" -ForegroundColor Green
}
catch {
    Write-Host "FAILED TO SYNC: $($_.Exception.Message)" -ForegroundColor Red
}
