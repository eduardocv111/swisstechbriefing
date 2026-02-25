const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config({ path: '../.env' });

async function test() {
    console.log('Testing Prisma Connection...');
    console.log('--- Debugging Paths ---');
    console.log('__dirname:', __dirname);
    console.log('process.cwd():', process.cwd());
    const rawUrl = process.env.DATABASE_URL ?? "file:../data/stb.db";
    console.log('rawUrl:', rawUrl);
    const extractedPath = rawUrl.startsWith("file:") ? rawUrl.replace("file:", "") : rawUrl;
    console.log('extractedPath:', extractedPath);
    const dbParamPath = path.resolve(__dirname, '..', extractedPath);
    console.log('Final dbParamPath:', dbParamPath);
    console.log('-----------------------');
    console.log('DB Path:', dbParamPath);

    const adapter = new PrismaBetterSqlite3({
        url: `file:${dbParamPath}`,
    });
    const prisma = new PrismaClient({ adapter });

    try {
        await prisma.$connect();
        console.log('✅ Connected!');
        const count = await prisma.$executeRawUnsafe('SELECT COUNT(*) FROM Article');
        console.log('Article Count Query Result:', count);
    } catch (e) {
        console.error('❌ Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

test();
