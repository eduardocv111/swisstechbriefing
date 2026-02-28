const { PrismaClient } = require('./src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');

const dbParamPath = path.resolve(__dirname, 'data', 'stb.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbParamPath}` });
const prisma = new PrismaClient({ adapter });

async function check() {
    const last = await prisma.article.findFirst({ orderBy: { createdAt: 'desc' } });
    console.log('SLUG_START[' + last.slug + ']SLUG_END');
    console.log('IMAGE_URL_START[' + last.imageUrl + ']IMAGE_URL_END');
    await prisma.$disconnect();
}
check();
