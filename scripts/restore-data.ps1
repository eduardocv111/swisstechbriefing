$articles = Get-Content -Raw articles_backup.json | ConvertFrom-Json

foreach ($art in $articles) {
    Write-Host "Restoring: $($art.slug)"
    
    # 1. Insert Article
    $authRole = if ($null -eq $art.authorRole) { "NULL" } else { "'$($art.authorRole)'" }
    $imgUrl = if ($null -eq $art.imageUrl) { "NULL" } else { "'$($art.imageUrl)'" }
    
    $sqlArt = "INSERT INTO Article (id, slug, category, date, authorName, authorRole, sourcesJson, imageUrl, createdAt, updatedAt) VALUES ('$($art.id)', '$($art.slug)', '$($art.category)', '$($art.date)', '$($art.authorName)', $authRole, '$($art.sourcesJson)', $imgUrl, '$($art.createdAt)', '$($art.updatedAt)');"
    sqlite3 ./data/stb.db $sqlArt
    
    # 2. Insert Translation
    # Sanitize strings for SQL
    $title = $art.title -replace "'", "''"
    $excerpt = $art.excerpt -replace "'", "''"
    $content = $art.contentHtml -replace "'", "''"
    
    $sqlTrans = "INSERT INTO ArticleTranslation (id, articleId, locale, title, excerpt, contentHtml, updatedAt) VALUES ('$(New-Guid)', '$($art.id)', 'de-CH', '$title', '$excerpt', '$content', '$($art.updatedAt)');"
    sqlite3 ./data/stb.db $sqlTrans
}
