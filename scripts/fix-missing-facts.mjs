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
        console.error("AI Error:", e.message);
        return null;
    }
}

function normalizeFacts(raw) {
    if (!raw) return JSON.stringify([]);
    let items = [];
    try {
        // Try to parse if it's already a stringified JSON
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed)) {
            items = parsed.map(item => {
                if (typeof item === 'object' && item !== null) {
                    if (item.name && item.number) return { fact: `${item.name}: ${item.number}` };
                    if (item.fact) return { fact: item.fact };
                    return { fact: JSON.stringify(item) };
                }
                return { fact: String(item) };
            });
        } else if (typeof parsed === 'string') {
            if (parsed.includes('\n')) {
                items = parsed.split('\n').filter(l => l.trim().length > 5).map(l => ({ fact: l.replace(/^[-*•\d.]+\s*/, '').trim() }));
            } else {
                items = [{ fact: parsed }];
            }
        }
    } catch {
        if (typeof raw === 'string' && raw.includes('\n')) {
            items = raw.split('\n').filter(l => l.trim().length > 5).map(l => ({ fact: l.replace(/^[-*•\d.]+\s*/, '').trim() }));
        } else {
            items = [{ fact: String(raw) }];
        }
    }
    return JSON.stringify(items.filter(i => i.fact && i.fact.length > 5).slice(0, 5));
}

async function fixFacts() {
    console.log("🔍 Checking for articles with missing or incompatible facts...");

    // 1. Articles
    const articles = db.prepare("SELECT id, slug, keyFactsJson FROM Article").all();
    for (const art of articles) {
        const raw = art.keyFactsJson || '[]';
        const facts = JSON.parse(raw);

        // If empty OR if it's the old object format without .fact property
        const needsFix = facts.length === 0 || (facts.length > 0 && typeof facts[0] === 'object' && !facts[0].fact);

        if (needsFix) {
            console.log(`📄 Fixing Article: ${art.slug}`);
            const trans = db.prepare("SELECT title, contentHtml FROM ArticleTranslation WHERE articleId = ? AND locale = 'de-CH'").get(art.id);
            if (!trans) continue;

            const prompt = `Extraye exactamente 5 datos clave (fechas, nombres, porcentajes) del siguiente artículo técnico en ALEMÁN.
            TITEL: ${trans.title}
            TEXTO: ${trans.contentHtml.replace(/<[^>]*>/g, ' ').substring(0, 1500)}
            Requerimientos: 5 puntos concisos, en alemán, formato lista simple (un punto por línea). No incluyas números de lista.`;

            const aiResult = await askAI(prompt);
            if (aiResult) {
                const normalized = normalizeFacts(aiResult);
                db.prepare("UPDATE Article SET keyFactsJson = ? WHERE id = ?").run(normalized, art.id);
                console.log(`✅ Fixed: ${art.slug}`);
            }
        }
    }

    // 2. Translations
    const translations = db.prepare("SELECT id, locale, title, contentHtml, keyFactsJson FROM ArticleTranslation").all();
    for (const t of translations) {
        const raw = t.keyFactsJson || '[]';
        const facts = JSON.parse(raw);
        const needsFix = facts.length === 0 || (facts.length > 0 && typeof facts[0] === 'object' && !facts[0].fact);

        if (needsFix) {
            console.log(`🌐 Fixing Translation: ${t.locale} - ${t.title}`);
            const prompt = `Extract exactly 5 key facts (dates, numbers, names) from this technical article in ${t.locale}.
            TITLE: ${t.title}
            TEXT: ${t.contentHtml.replace(/<[^>]*>/g, ' ').substring(0, 1500)}
            5 concise bullet points (one per line).`;

            const aiResult = await askAI(prompt);
            if (aiResult) {
                const normalized = normalizeFacts(aiResult);
                db.prepare("UPDATE ArticleTranslation SET keyFactsJson = ? WHERE id = ?").run(normalized, t.id);
                console.log(`✅ Fixed Translation: ${t.locale}`);
            }
        }
    }

    console.log("\n✨ Database Backfill Complete!");
    db.close();
}

fixFacts();
