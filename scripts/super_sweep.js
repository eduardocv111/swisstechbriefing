const path = require('path');
const { PrismaClient } = require(path.join(__dirname, '..', 'src', 'generated', 'prisma'));
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const dbPath = path.resolve(__dirname, '..', 'data', 'stb.db');
const databaseUrl = `file:${dbPath.replace(/\\/g, '/')}`;

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

/**
 * Super Clean logic
 */
function superClean(text) {
    if (!text) return "";
    return text
        // Eliminar leaks de prompt agresivamente
        .replace(/Title:.*?(\n|$)/gi, '')
        .replace(/Excerpt:.*?(\n|$)/gi, '')
        .replace(/Content:.*?(\n|$)/gi, '')
        .replace(/PROMPT:.*?(\n|$)/gi, '')
        .replace(/Generation:.*?(\n|$)/gi, '')
        .replace(/Here is the article:?/gi, '')
        .replace(/Based on the information:?/gi, '')
        .replace(/\[IMAGE_\d+\]/gi, '')
        .replace(/!\[.*?\]\(.*?\)/gi, '')
        .replace(/Image \d+:?/gi, '')
        .replace(/\n\n\n+/g, '\n\n')
        .trim();
}

async function sweep() {
    console.log('--- 🧹 SWEEPING ALL TRASH ---');
    try {
        const trans = await prisma.articleTranslation.findMany({
            where: {
                OR: [
                    { contentHtml: { contains: '[IMAGE' } },
                    { contentHtml: { contains: 'PROMPT' } },
                    { contentHtml: { contains: 'Generation' } },
                    { excerpt: { contains: 'PROMPT' } },
                    { excerpt: { contains: 'Excerpt:' } }
                ]
            }
        });

        console.log(`Found ${trans.length} translations needing cleanup.`);

        for (const t of trans) {
            console.log(`Cleaning: ${t.id} (Locale: ${t.locale})`);
            await prisma.articleTranslation.update({
                where: { id: t.id },
                data: {
                    contentHtml: superClean(t.contentHtml),
                    excerpt: superClean(t.excerpt)
                }
            });
        }
        console.log('--- ✅ SWEEP COMPLETED ---');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
sweep();
