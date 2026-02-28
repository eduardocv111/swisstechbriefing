const { PrismaClient } = require('./src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');

const dbParamPath = path.resolve(__dirname, 'data', 'stb.db');
const adapter = new PrismaBetterSqlite3({
    url: `file:${dbParamPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    const articles = await prisma.article.findMany({
        include: {
            translations: {
                select: {
                    title: true,
                    locale: true
                }
            }
        }
    });

    console.log('ARTICLES IN DB:');
    articles.forEach(a => {
        console.log(`- Slug: ${a.slug}`);
        a.translations.forEach(t => {
            console.log(`  [${t.locale}] ${t.title}`);
        });
    });

    await prisma.$disconnect();
}

main();
