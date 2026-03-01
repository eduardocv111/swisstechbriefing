const path = require('path');
const fs = require('fs');
const { PrismaClient } = require(path.join(__dirname, '..', 'src', 'generated', 'prisma'));
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

// Database setup exactly like supervisor.js
const dbPath = path.resolve(__dirname, '..', 'data', 'stb.db');
const databaseUrl = `file:${dbPath.replace(/\\/g, '/')}`;

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        const articles = await prisma.article.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: { translations: true }
        });

        console.log('\n--- ÚLTIMOS 10 ARTÍCULOS ---');
        articles.forEach((a, i) => {
            const de = a.translations.find(t => t.locale === 'de-CH') || a.translations[0];
            const es = a.translations.find(t => t.locale === 'es-ES') || de;
            console.log(`\n${i + 1}. [${a.category}] ${es ? es.title : 'Untitled'}`);
            console.log(`   Slug: ${a.slug}`);
            console.log(`   Audios: ${a.audioUrl ? '✅' : '❌'} - ES: ${es?.audioUrl ? '✅' : '❌'}`);
        });
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}
main();
