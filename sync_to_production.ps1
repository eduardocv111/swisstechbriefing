$token = "Jesus1994-051834"
$apiUrl = "https://swisstechbriefing.ch/api/admin/publish"

$files = Get-ChildItem "c:\web noticias\SwissTechBriefingClean\data\articles\*.json"

foreach ($file in $files) {
    Write-Host "SYNCING: $($file.Name)" -ForegroundColor Cyan
    $content = Get-Content $file.FullName -Raw | ConvertFrom-Json
    $json = $content | ConvertTo-Json -Depth 10 -Compress
    
    try {
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Headers @{
            "Authorization" = "Bearer $token"
            "Content-Type"  = "application/json"
        } -Body ([System.Text.Encoding]::UTF8.GetBytes($json))
        Write-Host "SUCCESS: $($content.slug)" -ForegroundColor Green
    }
    catch {
        Write-Host "FAILED: $($content.slug) - $($_.Exception.Message)" -ForegroundColor Red
    }
}
