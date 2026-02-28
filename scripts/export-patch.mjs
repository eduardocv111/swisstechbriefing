import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../data/stb.db');
const db = new Database(dbPath);

function exportPatch() {
    console.log("📦 Exporting high-quality facts from local DB...");
    const patch = {
        articles: [],
        translations: []
    };

    // Export Articles
    const articles = db.prepare("SELECT slug, keyFactsJson FROM Article WHERE keyFactsJson IS NOT NULL AND keyFactsJson != '[]'").all();
    patch.articles = articles;

    // Export Translations
    const translations = db.prepare(`
        SELECT t.locale, a.slug, t.keyFactsJson 
        FROM ArticleTranslation t
        JOIN Article a ON t.articleId = a.id
        WHERE t.keyFactsJson IS NOT NULL AND t.keyFactsJson != '[]'
    `).all();
    patch.translations = translations;

    const outputPath = path.resolve(__dirname, 'facts-patch.json');
    fs.writeFileSync(outputPath, JSON.stringify(patch, null, 2));

    console.log(`✅ Patch created with ${articles.length} articles and ${translations.length} translations.`);
    console.log(`Saved to: ${outputPath}`);
    db.close();
}

exportPatch();
