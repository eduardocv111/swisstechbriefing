const fs = require('fs');
const path = require('path');

/**
 * Knowledge Manager (The AI's Long-Term Memory)
 * Guarda y recupera conocimientos clave para que el sistema aprenda de lo que escribe.
 */
class KnowledgeManager {
    constructor() {
        this.knowledgePath = path.join(__dirname, 'knowledge');
        if (!fs.existsSync(this.knowledgePath)) {
            fs.mkdirSync(this.knowledgePath, { recursive: true });
        }
    }

    /**
     * Guarda un resumen de conocimiento basado en un artículo recién publicado.
     */
    /**
     * Guarda un resumen de conocimiento basado en un artículo recién publicado.
     * Ahora también sincroniza con OpenClaw MEMORY.md para memoria compartida del Agente.
     */
    async learnFromArticle(articleData) {
        try {
            console.log(`[Knowledge] 🧠 Learning from: "${articleData.title}"...`);

            const knowledgeEntry = {
                title: articleData.title,
                date: new Date().toISOString(),
                slug: articleData.slug,
                keyFindings: articleData.keyFacts,
                expertInsight: articleData.expertQuote,
                summary: articleData.excerpt
            };

            // 1. Local Storage (JSON)
            const filename = `k_${Date.now()}.json`;
            fs.writeFileSync(
                path.join(this.knowledgePath, filename),
                JSON.stringify(knowledgeEntry, null, 2)
            );
            this.updateIndex(knowledgeEntry);

            // 2. OpenClaw Sync (Markdown)
            // Esto llenará el MEMORY.md que veíamos como MISSING en la captura.
            await this.syncToOpenClaw(knowledgeEntry);

        } catch (error) {
            console.error('[Knowledge] ❌ Error during learning phase:', error.message);
        }
    }

    async syncToOpenClaw(entry) {
        try {
            const openclawClient = require('./supervisor/openclawClient');

            // Construimos un bloque de memoria profesional
            const memoryBlock = `
## ${entry.title} (${new Date().toLocaleDateString('de-CH')})
**Slug:** ${entry.slug}
**Executive Summary:** ${entry.summary}
**Key Facts:**
${Array.isArray(entry.keyFindings) ? entry.keyFindings.map(f => `- ${f}`).join('\n') : '- ' + entry.keyFindings}
**Expert Perspective:** ${entry.expertInsight}
---
`;

            // Enviamos al Agente para que lo guarde en MEMORY.md
            // El Gateway de OpenClaw maneja la creación del archivo si no existe.
            await openclawClient.request('logs.append', {
                sessionKey: process.env.OPENCLAW_SESSION_KEY || 'agent:main:main',
                file: 'MEMORY.md',
                content: memoryBlock
            });
            console.log(`[Knowledge] 🔄 Synced to OpenClaw MEMORY.md`);
        } catch (e) {
            console.warn(`[Knowledge] ⚠️ OpenClaw Sync skipped: ${e.message}`);
        }
    }

    /**
     * Busca en la memoria si tenemos conocimientos previos sobre un tema.
     */
    async getPastInsights(topic) {
        try {
            const indexPath = path.join(this.knowledgePath, 'index.json');
            if (!fs.existsSync(indexPath)) {
                // Si no hay local, intentamos devolver algo genérico
                return "First time researching this specific topic.";
            }

            const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

            // Simular búsqueda semántica básica por palabras clave
            const keywords = topic.toLowerCase().split(' ').filter(w => w.length > 4);
            const matches = index.filter(entry => {
                const titleMatch = entry.title ? entry.title.toLowerCase() : "";
                const summaryMatch = entry.summary ? entry.summary.toLowerCase() : "";
                const searchContent = titleMatch + ' ' + summaryMatch;
                return keywords.some(kw => searchContent.includes(kw));
            });

            if (matches.length === 0) return "First time researching this specific topic.";

            console.log(`[Knowledge] 💡 Found ${matches.length} past insights in memory.`);

            // Devolver un briefing de lo que ya sabemos
            return matches.slice(0, 3).map(m =>
                `- En el artículo "${m.title}", aprendimos que: ${m.summary}`
            ).join('\n');

        } catch (error) {
            return "Knowledge base temporarily unavailable.";
        }
    }

    updateIndex(entry) {
        const indexPath = path.join(this.knowledgePath, 'index.json');
        let index = [];
        if (fs.existsSync(indexPath)) {
            index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
        }

        index.push({
            title: entry.title,
            summary: entry.summary,
            date: entry.date,
            tags: (entry.title || "").split(' ').filter(w => w.length > 5)
        });

        // Limitar índice a los últimos 100 conocimientos para mantener velocidad
        if (index.length > 100) index.shift();

        fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    }
}

module.exports = new KnowledgeManager();
