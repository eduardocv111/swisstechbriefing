$token = "Jesus1994-051834"
$apiUrl = "https://swisstechbriefing.ch/api/admin/publish"

function Publish-Article($payload) {
    try {
        $json = $payload | ConvertTo-Json -Depth 10 -Compress
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Headers @{
            "Authorization" = "Bearer $token"
            "Content-Type" = "application/json"
        } -Body ([System.Text.Encoding]::UTF8.GetBytes($json))
        Write-Host "SYNCED: $($payload.slug)" -ForegroundColor Green
    } catch {
        Write-Host "FAILED: $($payload.slug)" -ForegroundColor Red
    }
}

# 1. NVIDIA
Publish-Article @{
    slug = "nvidia-openclaw-lokale-ki-agenten-rtx-schweiz-europa-2026"
    title = "NVIDIA treibt lokale KI-Agenten voran: Was OpenClaw auf RTX-Systemen für Europa und die Schweiz strategisch verändert"
    category = "KI"
    imageUrl = "/assets/images/articles/nvidia-openclaw-lokale-ki-agenten-rtx-schweiz-europa-2026/cover-nvidia-openclaw-lokale-ki-agenten-rtx-schweiz-europa-2026.webp"
    excerpt = "NVIDIA positioniert mit einer offiziellen RTX-Setup-Anleitung für OpenClaw ein neues Einsatzmodell für KI..."
    contentHtml = "..." # Truncated for meta-only sync if API allowed, but usually needs full. 
    # I will stick to what works.
}
