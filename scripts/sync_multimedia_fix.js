/**
 * scripts/sync_multimedia_fix.js
 * HERO = video (mp4). Optional poster image for fallback/OG.
 * Attaches extra images: detail + context.
 */

const { PrismaClient } = require('../src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dbPath = path.resolve(__dirname, '../data/stb.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath.replace(/\\/g, '/')}` });
const prisma = new PrismaClient({ adapter });

// Change slug here if needed
const slug = 'sprachlupe-noch-ein-vermeintliches-schweizerdeutsc-691';

async function reSyncWithBinaries() {
    console.log(`🚀 Re-syncing Article with Binaries: ${slug}`);

    try {
        // 1) Fetch local data
        const article = await prisma.article.findUnique({
            where: { slug },
            include: { translations: true }
        });

        if (!article) {
            console.error('❌ Article not found in local DB.');
            return;
        }

        const deTrans = article.translations.find((t) => t.locale === 'de-CH');
        const otherTrans = article.translations.filter((t) => t.locale !== 'de-CH');

        if (!deTrans) {
            console.error('❌ Missing de-CH translation.');
            return;
        }

        // 2) Prepare FormData (Node 18+ has global FormData/Blob)
        const formData = new FormData();

        // IMPORTANT:
        // - expertQuote/keyFactsJson should come from the PRIMARY translation (de-CH) if Article model doesn't have them
        // - keep per-translation expertQuote/keyFactsJson as well
        const uploadData = {
            slug: article.slug,
            category: article.category,
            authorName: article.authorName,
            authorRole: article.authorRole,
            sourcesJson: article.sourcesJson,
            isVerified: article.isVerified,

            // Primary translation fields
            title: deTrans.title,
            excerpt: deTrans.excerpt,
            contentHtml: deTrans.contentHtml,
            metaTitle: deTrans.metaTitle,
            metaDescription: deTrans.metaDescription,

            // Optional: keep top-level expertQuote/keyFactsJson aligned with primary translation
            // (Only if your ingest endpoint expects them at root)
            expertQuote: deTrans.expertQuote ?? null,
            keyFactsJson: deTrans.keyFactsJson ?? null,

            translations: otherTrans.map((t) => ({
                locale: t.locale,
                title: t.title,
                excerpt: t.excerpt,
                contentHtml: t.contentHtml,
                metaTitle: t.metaTitle,
                metaDescription: t.metaDescription,
                expertQuote: t.expertQuote ?? null,
                keyFactsJson: t.keyFactsJson ?? null
            }))
        };

        formData.append('article', JSON.stringify(uploadData));

        // 3) Attach Files
        const publicDir = path.join(__dirname, '..', 'public');

        /**
         * Attach a file if it exists.
         * @returns {boolean} true if attached, false if missing or relPath empty.
         */
        const attach = (field, relPath, type) => {
            if (!relPath) return false;

            const fullPath = path.join(
                publicDir,
                relPath.startsWith('/') ? relPath.slice(1) : relPath
            );

            if (fs.existsSync(fullPath)) {
                const buffer = fs.readFileSync(fullPath);
                const blob = new Blob([buffer], { type });
                formData.append(field, blob, path.basename(fullPath));
                console.log(`   📎 Attached ${field}: ${relPath}`);
                return true;
            } else {
                console.warn(`   ⚠️ File not found: ${fullPath}`);
                return false;
            }
        };

        // Naming convention used by your pipeline
        const heroPosterRel = `/assets/images/news/stb_${slug}_hero.png`;     // optional poster
        const detailRel = `/assets/images/news/stb_${slug}_detail.png`;
        const contextRel = `/assets/images/news/stb_${slug}_context.png`;

        // HERO RULE:
        // - HERO is the video (2s mp4) -> always attach as "video"
        // - "image" is a poster/fallback (recommended for UX + OG). If poster not found, fallback to detail image.
        attach('video', article.videoUrl, 'video/mp4');

        const posterAttached = attach('image', heroPosterRel, 'image/png');
        if (!posterAttached) {
            attach('image', detailRel, 'image/png');
        }

        // Extra images
        attach('image_detail', detailRel, 'image/png');
        attach('image_context', contextRel, 'image/png');

        // 4) Send to Ingest
        const SITE_URL = 'https://swisstechbriefing.ch';
        const INGEST_SECRET = process.env.AI_INGESTION_SECRET;

        if (!INGEST_SECRET) {
            console.error('❌ Missing AI_INGESTION_SECRET in .env');
            return;
        }

        console.log('✈️ Sending Ingestion request to VPS...');
        const res = await fetch(`${SITE_URL}/api/v1/ingest`, {
            method: 'POST',
            headers: { 'x-ai-secret': INGEST_SECRET },
            body: formData
        });

        if (res.ok) {
            const json = await res.json();
            console.log('✅ SUCCESS! Article and binaries synced to production.');
            console.log(`🔗 URL: ${json.url}`);
        } else {
            console.error(`❌ FAILED: ${res.status}`, await res.text());
        }
    } catch (err) {
        console.error('❌ Critical Error:', err);
    } finally {
        await prisma.$disconnect();
    }
}

reSyncWithBinaries();