const path = require('path');
const { PrismaClient } = require(path.join(__dirname, '..', 'src', 'generated', 'prisma'));
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const dbPath = path.resolve(__dirname, '..', 'data', 'stb.db');
const databaseUrl = `file:${dbPath.replace(/\\/g, '/')}`;

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        const articles = await prisma.article.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { translations: true }
        });

        console.log('--- CONTENT AUDIT ---');
        articles.forEach((a, i) => {
            const es = a.translations.find(t => t.locale === 'es-ES');
            console.log(`\nITEM ${i + 1}: ${a.slug}`);
            console.log(`Title ES: ${es?.title}`);
            console.log(`Excerpt ES: ${es?.excerpt}`);
            console.log(`Facts JSON: ${es?.keyFactsJson || a.keyFactsJson}`);
            console.log(`Content Sample (First 300 chars): ${es?.contentHtml?.substring(0, 300)}...`);
            console.log(`Audio: ${a.audioUrl || 'None'}`);
        });
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}
main();
