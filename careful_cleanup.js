const { PrismaClient } = require('./src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbParamPath = path.resolve(__dirname, 'data', 'stb.db');
const adapter = new PrismaBetterSqlite3({
    url: `file:${dbParamPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('--- 🧹 CAREFUL WASTE REMOVAL ---');

    const articles = await prisma.article.findMany({
        select: { slug: true, imageUrl: true }
    });

    const activeSlugs = articles.map(a => a.slug);
    const activeImages = articles.map(a => a.imageUrl).filter(Boolean);

    console.log(`Active Articles: ${activeSlugs.length}`);

    // --- 1. CLEAN ORPHAN JSONs ---
    const jsonPath = path.resolve(__dirname, 'data', 'articles');
    if (fs.existsSync(jsonPath)) {
        const jsonFiles = fs.readdirSync(jsonPath).filter(f => f.endsWith('.json'));
        jsonFiles.forEach(file => {
            const slug = file.replace('.json', '');
            if (!activeSlugs.includes(slug)) {
                // Check if it's one of the known "failed" ones
                if (slug.includes('fonds26') || slug.includes('handelsze') || slug.includes('eth-zurich')) {
                    console.log(`🗑️ Deleting orphan JSON: ${file}`);
                    fs.unlinkSync(path.join(jsonPath, file));
                } else {
                    console.log(`⚠️ Keeping JSON ${file} (Unrecognized but not in DB)`);
                }
            }
        });
    }

    // --- 2. CLEAN ORPHAN NEWS IMAGES ---
    const newsPath = path.resolve(__dirname, 'public', 'assets', 'images', 'news');
    if (fs.existsSync(newsPath)) {
        const newsImages = fs.readdirSync(newsPath);
        newsImages.forEach(img => {
            if (img === 'default-news.svg') return;

            const isUsed = activeImages.some(ai => ai.includes(img));
            if (!isUsed) {
                // Pattern for autoblogger failed residues
                if (img.includes('fonds26') || img.includes('handelsze') || img.includes('stb_')) {
                    // Double check if it's associated with ANY active slug
                    const associatedWithActive = activeSlugs.some(s => img.includes(s));
                    if (!associatedWithActive) {
                        console.log(`🗑️ Deleting orphan image: ${img}`);
                        fs.unlinkSync(path.join(newsPath, img));
                    }
                }
            }
        });
    }

    // --- 3. CLEAN ORPHAN ARTICLE FOLDERS ---
    const artFoldersPath = path.resolve(__dirname, 'public', 'assets', 'images', 'articles');
    if (fs.existsSync(artFoldersPath)) {
        const folders = fs.readdirSync(artFoldersPath).filter(f => fs.statSync(path.join(artFoldersPath, f)).isDirectory());
        folders.forEach(folder => {
            const isUsed = activeImages.some(ai => ai.includes(`/articles/${folder}/`));
            const isExactSlug = activeSlugs.includes(folder);

            if (!isUsed && !isExactSlug) {
                // Be very careful here. Only delete if it matches known failed prompts or empty
                if (folder === 'soft-power-2026') {
                    // DB has 'soft-power-ranking-2026-global-analysis'
                    console.log(`🗑️ Deleting duplicate/residue folder: ${folder}`);
                    fs.rmSync(path.join(artFoldersPath, folder), { recursive: true, force: true });
                }
            }
        });
    }

    await prisma.$disconnect();
    console.log('--- ✅ Cleanup Finished ---');
}

main();
