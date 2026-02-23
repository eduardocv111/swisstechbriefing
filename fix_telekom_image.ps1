$token = "Jesus1994-051834"
$apiUrl = "https://swisstechbriefing.ch/api/admin/publish"

function Update-Article-Image($slug, $imageUrl) {
    # We fetch the current article first to keep its content
    try {
        $article = Invoke-RestMethod -Uri "https://swisstechbriefing.ch/api/articles/$slug" -Method GET
        
        $payload = @{
            slug = $slug
            title = $article.title
            excerpt = $article.excerpt
            category = $article.category
            author = @{ name = $article.author.name; role = $article.author.role }
            date = $article.datePublished
            imageUrl = $imageUrl
            contentHtml = $article.contentHtml
            sources = $article.sources
        }

        $json = $payload | ConvertTo-Json -Depth 10 -Compress
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Headers @{
            "Authorization" = "Bearer $token"
            "Content-Type" = "application/json"
        } -Body ([System.Text.Encoding]::UTF8.GetBytes($json))
        Write-Host "UPDATED IMAGE: $slug" -ForegroundColor Green
    } catch {
        Write-Host "FAILED TO UPDATE $slug : $($_.Exception.Message)" -ForegroundColor Red
    }
}

# The specific fix for Telekom
Update-Article-Image "deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina" "/assets/images/articles/deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina/cover-deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina.webp"
