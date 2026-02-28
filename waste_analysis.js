const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('./src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const dbParamPath = path.resolve(__dirname, 'data', 'stb.db');
const adapter = new PrismaBetterSqlite3({
    url: `file:${dbParamPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('--- 🔍 SwissTech Waste Analysis ---');

    // 1. Get DB Slugs
    const dbArticles = await prisma.article.findMany({ select: { slug: true } });
    const dbSlugs = dbArticles.map(a => a.slug);
    console.log(`[DB] Found ${dbSlugs.length} articles.`);

    // 2. Scan data/articles
    const jsonPath = path.resolve(__dirname, 'data', 'articles');
    const jsonFiles = fs.readdirSync(jsonPath).filter(f => f.endsWith('.json'));
    const jsonSlugs = jsonFiles.map(f => f.replace('.json', ''));

    // 3. Scan public/assets/images/news
    const newsImagePath = path.resolve(__dirname, 'public', 'assets', 'images', 'news');
    const newsImages = fs.existsSync(newsImagePath) ? fs.readdirSync(newsImagePath) : [];

    // 4. Scan public/assets/images/articles (folders)
    const artFolderPath = path.resolve(__dirname, 'public', 'assets', 'images', 'articles');
    const artFolders = fs.existsSync(artFolderPath) ? fs.readdirSync(artFolderPath).filter(f => fs.statSync(path.join(artFolderPath, f)).isDirectory()) : [];

    console.log('\n--- 🗑️ Orphan JSONs (In data/articles but NOT in DB) ---');
    jsonSlugs.forEach(slug => {
        if (!dbSlugs.includes(slug)) {
            console.log(`- ${slug}.json`);
        }
    });

    console.log('\n--- 🗑️ Orphan News Images (In public/.../news but NOT in DB) ---');
    newsImages.forEach(img => {
        if (img === 'default-news.svg') return;
        // Images usually look like stb_slug_id.png or stb_slug_type_id.png
        const match = img.match(/^stb_(.+?)(?:_(?:hero|detail|context))?(_\d+)?\.png$/);
        if (match) {
            const potentialSlug = match[1];
            // Since slugs can have hyphens, we check if any DB slug is contained or vice-versa
            const found = dbSlugs.some(s => potentialSlug.includes(s) || s.includes(potentialSlug));
            if (!found) {
                console.log(`- ${img}`);
            }
        } else {
            // If pattern doesn't match perfectly, check directly
            const potentialSlug = img.replace('stb_', '').replace('.png', '');
            const found = dbSlugs.some(s => potentialSlug.includes(s) || s.includes(potentialSlug));
            if (!found) console.log(`- ${img}`);
        }
    });

    console.log('\n--- 🗑️ Orphan Image Folders (In public/.../articles but NOT in DB) ---');
    artFolders.forEach(folder => {
        if (!dbSlugs.includes(folder)) {
            console.log(`- /articles/${folder}`);
        }
    });

    await prisma.$disconnect();
}

main();
