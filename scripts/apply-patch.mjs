import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../data/stb.db');
const patchPath = path.resolve(__dirname, 'facts-patch.json');

if (!fs.existsSync(patchPath)) {
    console.error("❌ Error: facts-patch.json not found. Did you download it?");
    process.exit(1);
}

const db = new Database(dbPath);
const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));

function apply() {
    console.log("🚀 Applying Facts Patch to Database...");

    // Apply to Articles
    console.log(`-> Processing ${patch.articles.length} articles...`);
    const artStmt = db.prepare("UPDATE Article SET keyFactsJson = ? WHERE slug = ?");
    for (const art of patch.articles) {
        artStmt.run(art.keyFactsJson, art.slug);
    }

    // Apply to Translations
    console.log(`-> Processing ${patch.translations.length} translations...`);
    const transStmt = db.prepare(`
        UPDATE ArticleTranslation 
        SET keyFactsJson = ? 
        WHERE locale = ? AND articleId = (SELECT id FROM Article WHERE slug = ?)
    `);
    for (const t of patch.translations) {
        try {
            transStmt.run(t.keyFactsJson, t.locale, t.slug);
        } catch (e) {
            console.warn(`   ! Failed to update translation for ${t.slug} [${t.locale}]: ${e.message}`);
        }
    }

    console.log("✨ Patch applied successfully!");
    db.close();
}

apply();
