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
    } catch (e) { return null; }
}

function normalizeFacts(raw) {
    if (!raw) return "[]";
    const items = raw.split('\n').map(l => l.replace(/^[-*•\d.]+\s*/, '').trim()).filter(l => l.length > 5);
    return JSON.stringify(items.slice(0, 5).map(f => ({ fact: f })));
}

async function fix() {
    console.log("Fixing translations only...");
    const trans = db.prepare("SELECT id, locale, title, contentHtml FROM ArticleTranslation").all();
    for (const t of trans) {
        console.log(` -> ${t.locale}: ${t.title.substring(0, 30)}...`);
        const ai = await askAI(`Extract 5 facts in ${t.locale} for: ${t.title}`);
        if (ai) {
            const json = normalizeFacts(ai);
            db.prepare("UPDATE ArticleTranslation SET keyFactsJson = ? WHERE id = ?").run(json, t.id);
            console.log("    Applied.");
        }
    }
    db.close();
}
fix();
