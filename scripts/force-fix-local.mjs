import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../data/stb.db');
const db = new Database(dbPath);

async function askAI(prompt) {
    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            body: JSON.stringify({
                model: "llama3.2:3b",
                prompt: prompt,
                stream: false,
            }),
        });
        const data = await response.json();
        return data.response;
    } catch (e) {
        return null;
    }
}

function normalizeFacts(raw) {
    if (!raw) return "[]";
    const items = raw.split('\n')
        .map(l => l.replace(/^[-*•\d.]+\s*/, '').trim())
        .filter(l => l.length > 5);
    return JSON.stringify(items.slice(0, 5).map(f => ({ fact: f })));
}

async function forceFix() {
    console.log("🛠️ FORCE FIXING ALL ARTICLES AND TRANSLATIONS...");

    // 1. Articles
    const articles = db.prepare("SELECT id, slug FROM Article").all();
    for (const art of articles) {
        const trans = db.prepare("SELECT title, contentHtml FROM ArticleTranslation WHERE articleId = ? AND locale = 'de-CH'").get(art.id);
        if (!trans) continue;

        console.log(`Fixing Article: ${art.slug}`);
        const ai = await askAI(`Extract 5 facts for: ${trans.title}\n${trans.contentHtml.replace(/<[^>]*>/g, ' ').substring(0, 1000)}`);
        if (ai) {
            db.prepare("UPDATE Article SET keyFactsJson = ? WHERE id = ?").run(normalizeFacts(ai), art.id);
        }
    }

    // 2. Translations
    const translations = db.prepare("SELECT id, locale, title, contentHtml FROM ArticleTranslation").all();
    for (const t of translations) {
        console.log(`Fixing Translation: ${t.locale} - ${t.title}`);
        const ai = await askAI(`Extract 5 facts in ${t.locale} for: ${t.title}\n${t.contentHtml.replace(/<[^>]*>/g, ' ').substring(0, 1000)}`);
        if (ai) {
            db.prepare("UPDATE ArticleTranslation SET keyFactsJson = ? WHERE id = ?").run(normalizeFacts(ai), t.id);
        }
    }

    console.log("✅ Local DB is now fully populated.");
    db.close();
}

forceFix();
