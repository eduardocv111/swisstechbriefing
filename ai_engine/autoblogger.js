const { scanTrends } = require('./scanner');
const AIBridge = require('./bridge');
const Translator = require('./translator');
const { updateMarketData } = require('./market_updater');
const { PrismaClient } = require('../src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

// Initialize Prisma with Adapter
// We assume the DB is always in the root 'data' folder
const dbParamPath = path.resolve(__dirname, '..', 'data', 'stb.db');
console.log(`[AI Engine] 💾 Using Database at: ${dbParamPath}`);

const adapter = new PrismaBetterSqlite3({
    url: `file:${dbParamPath}`,
});
const prisma = new PrismaClient({ adapter });

/**
 * Professional AutoBlogger 2.0
 * Fully integrated with Prisma for real-time publishing
 */
async function runAutoBlogger() {
    console.log('\n--- 🚀 SwissTech AutoBlogger (Professional Edition) ---');

    try {
        // 0. UPDATE MARKET TICKERS (Ensures no "STALE" data)
        await updateMarketData();

        // 1. SCAN FOR TRENDS
        const trends = await scanTrends();

        // Flatten news items and prioritize
        const allNews = [
            ...(trends['KI'] || []),
            ...(trends['Startups'] || []),
            ...(trends['Regulierung'] || []),
            ...(trends['Defense Tech'] || [])
        ];

        if (allNews.length === 0) {
            console.log('No news found in the last 24h.');
            return;
        }

        // 2. DEDUPLICATION (Check if URL exists in sourcesJson)
        console.log('Running deduplication check...');
        let selectedNews = null;

        for (const news of allNews) {
            // Very basic check in the raw sources string
            // In a more complex system, we'd use a dedicated column
            const existing = await prisma.article.findFirst({
                where: {
                    sourcesJson: {
                        contains: news.link
                    }
                }
            });

            if (!existing) {
                selectedNews = news;
                break;
            }
        }

        if (!selectedNews) {
            console.log('✅ All current trends have already been published. Keeping the feed clean.');
            return;
        }

        console.log(`\n💎 New Topic Identified: ${selectedNews.title}`);
        console.log(`📡 Source: ${selectedNews.source}`);

        // 2.5 FETCH EDITORIAL MEMORY (Last 5 articles)
        const pastArticles = await prisma.article.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { translations: { where: { locale: 'de-CH' } } }
        });
        const pastContext = pastArticles.map(a => a.translations[0]?.title).filter(Boolean).join(', ');

        // 3. GENERATE ARTICLE CONTENT (Elite Multi-Agent Workflow)
        const articleData = await AIBridge.generateArticle(selectedNews.title, pastContext);

        // 3.1 GENERATE ELITE IMAGE PROMPT (Llama 3.1)
        console.log('🎨 Generating elite editorial image prompt...');
        const promptResponse = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            body: JSON.stringify({
                model: 'llama3.1:8b',
                prompt: `You are a world-class creative director for a premium tech magazine like Wired or Bloomberg. 
                        Create a highly detailed, professional English prompt for FLUX.1 (an AI image generator).
                        
                        TOPIC: ${articleData.title}
                        THEME: SwissTech Briefing (Minimalist, Expensive, Tech-Editorial, Red and Black focus).
                        
                        RULES:
                        - STYLE: High-end photojournalism, editorial photography for a premium tech magazine (Wired, Bloomberg).
                        - NO generic clichés: No robots, no glowing brains, no neon cyberpunk lights.
                        - PHOTOGRAPHY: Sharp focus, natural or clean studio lighting, 35mm lens, realistic depth of field, high-resolution RAW quality.
                        - SETTINGS: Modern Swiss corporate architecture, clean tech labs, high-end server rooms, professional boardrooms with mountain views in the background.
                        - COLORS: Natural color palette, clean surgical whites, deep professional greys, and minimal wooden or metallic accents. No artificial glowing neons.
                        - AESTHETICS: Swiss precision, minimalist, authoritative, and sophisticated.
                        
                        OUTPUT: Only the prompt text in English, no quotes, no extra talk.`,
                stream: false
            }),
        });
        const promptData = await promptResponse.json();
        const elitePrompt = promptData.response.trim();

        // Clean and generate Slug
        const slug = selectedNews.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
            .substring(0, 60) + '-' + Math.floor(Math.random() * 1000);

        // 4. GENERATE PREMIUM ART (FLUX)
        const imageFilename = `stb_${slug}.png`;

        console.log(`\n📸 Elite Prompt: "${elitePrompt.substring(0, 100)}..."`);
        console.log('🎨 FLUX.1-schnell is rendering the cover art (Local GPU)...');
        const imagePublicPath = await AIBridge.generateImage(elitePrompt, imageFilename);

        // 5. ATOMIC PUBLICATION (Prisma Transaction)
        console.log('📤 Publishing to SwissTech Briefing Database...');

        const sourceJson = JSON.stringify([{ name: selectedNews.source || 'Swiss Media', url: selectedNews.link }]);

        const result = await prisma.$transaction(async (tx) => {
            const newArticle = await tx.article.create({
                data: {
                    slug: slug,
                    category: selectedNews.category,
                    date: new Date(),
                    authorName: 'SwissTech AI Editor',
                    authorRole: 'Automated Insight Engine',
                    imageUrl: imagePublicPath,
                    sourcesJson: sourceJson,
                    translations: {
                        create: {
                            locale: 'de-CH',
                            title: articleData.title,
                            excerpt: articleData.excerpt,
                            contentHtml: articleData.contentHtml,
                            metaTitle: `${articleData.title} | SwissTech Briefing`,
                            metaDescription: articleData.excerpt
                        }
                    }
                }
            });
            return newArticle;
        });

        console.log(`\n✅ LOCAL STORAGE SUCCESSFUL!`);
        console.log(`📁 Image: ${imagePublicPath}`);

        // --- DEEPL PROFESSIONAL TRANSLATION (NEW) ---
        console.log('\n🌎 DeepL is performing professional translations (FR, IT, ES, EN)...');
        const translations = await Translator.translateArticle(articleData, ['fr-CH', 'it-CH', 'es-ES', 'en']);

        // --- PRODUCTION SYNC (NEW) ---
        console.log('\n🌐 Synchronizing with Production Server (swisstechbriefing.ch)...');

        try {
            const formData = new FormData();

            // Prepare the direct article data for the server
            const uploadData = {
                slug: slug,
                category: selectedNews.category,
                authorName: 'SwissTech AI Editor',
                authorRole: 'Automated Insight Engine',
                sourcesJson: sourceJson,
                title: articleData.title,
                excerpt: articleData.excerpt,
                contentHtml: articleData.contentHtml,
                metaTitle: `${articleData.title} | SwissTech Briefing`,
                metaDescription: articleData.excerpt,
                translations: translations // Include DeepL translations
            };

            formData.append('article', JSON.stringify(uploadData));

            // Attach the actual image file
            const fullImagePath = path.join(__dirname, '..', 'public', imagePublicPath);
            const imageBuffer = fs.readFileSync(fullImagePath);
            const imageBlob = new Blob([imageBuffer], { type: 'image/png' });
            formData.append('image', imageBlob, imageFilename);

            const syncResponse = await fetch('https://swisstechbriefing.ch/api/v1/ingest', {
                method: 'POST',
                headers: {
                    'x-ai-secret': process.env.AI_INGESTION_SECRET || 'SwissTech_AI_Secret_2026_!#'
                },
                body: formData
            });

            const syncResult = await syncResponse.json();

            if (syncResult.success) {
                console.log('✨ PUBLISHED TO LIVE SITE SUCCESSFULLY!');
                console.log(`🔗 Live URL: ${syncResult.url}`);
            } else {
                console.error('❌ Sync Failed:', syncResult.error);
            }

        } catch (syncError) {
            console.error('❌ Network Error during Sync:', syncError.message);
            console.log('⚠️ Article is saved locally but could not reach the server.');
        }

    } catch (error) {
        console.error('\n❌ Workflow Error:', error);
        if (error.code === 'P2002') {
            console.error('Error: Slug already exists. Rare collision, skip this turn.');
        }
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    runAutoBlogger();
}
