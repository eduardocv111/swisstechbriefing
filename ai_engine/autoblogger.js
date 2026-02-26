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

        // --- STEP 2.2: ENHANCED MULTI-SOURCE RESEARCH ---
        const Researcher = require('./researcher');
        console.log(`[AutoBlogger] 🔎 Initiating Elite Multi-Source Investigation...`);
        const researchResult = await Researcher.deepResearch(selectedNews.link, selectedNews.title);

        if (researchResult.success) {
            console.log(`[AutoBlogger] 🛡️ Investigation Complete: ${researchResult.sourceCount} sources integrated.`);
        } else {
            console.log(`[AutoBlogger] ⚠️ Context gathering failed. Using headline only.`);
        }

        // 2.5 FETCH EDITORIAL MEMORY (Last 5 articles)
        const pastArticles = await prisma.article.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { translations: { where: { locale: 'de-CH' } } }
        });
        const pastContext = pastArticles.map(a => a.translations[0]?.title).filter(Boolean).join(', ');

        // 3. GENERATE ARTICLE CONTENT (Elite Multi-Agent Workflow)
        // Pass the extracted facts to give the agents more "Hard Data"
        const articleData = await AIBridge.generateArticle(selectedNews.title, pastContext, researchResult.rawText);

        // --- STEP 3.1: SMART ART DIRECTION FOR MULTIPLE IMAGES ---
        console.log('🎨 AI Art Director is designing a coherent visual set (3 images)...');

        const LORA_MAP = {
            'altman': 'sam_altman.safetensors',
            'sam': 'sam_altman.safetensors',
            'huang': 'jensen_huang.safetensors',
            'jensen': 'jensen_huang.safetensors',
            'zuckerberg': 'zuckerberg.safetensors',
            'mark': 'zuckerberg.safetensors',
            'putin': 'putin.safetensors',
            'xi jinping': 'xi_jinping.safetensors',
            'nvidia': 'jensen_huang.safetensors',
            'openai': 'sam_altman.safetensors',
            'musk': 'musk.safetensors',
            'elon': 'musk.safetensors',
            'trump': 'trump.safetensors',
            'default': 'super_realism.safetensors'
        };

        const detectedActor = Object.keys(LORA_MAP).find(actor =>
            actor !== 'default' &&
            (articleData.title.toLowerCase().includes(actor) || articleData.contentHtml.toLowerCase().includes(actor))
        );

        let masterLoraPath = detectedActor ? path.join(__dirname, 'loras', LORA_MAP[detectedActor]) : path.join(__dirname, 'loras', LORA_MAP['default']);

        const finalImages = {};
        const imageTypes = ['hero', 'detail', 'context'];

        const slugBase = selectedNews.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '').substring(0, 50);
        const uniqueId = Math.floor(Math.random() * 1000);
        const slug = `${slugBase}-${uniqueId}`;

        // Prepare prompts for all images
        const batchPrompts = { hero: "", detail: "", context: "" };

        for (const type of imageTypes) {
            const rawPrompt = articleData.imagePrompts[type] || articleData.title;

            console.log(`[Art Director] 🎨 Designing ${type} image DNA...`);

            const promptResponse = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                body: JSON.stringify({
                    model: 'llama3.1:8b',
                    prompt: `Refine this image prompt for a LUXURY TECH MAGAZINE (Wired/Bloomberg).
                            BASE THEME: ${articleData.title}
                            IMAGE PURPOSE: ${type}
                            RAW IDEA: ${rawPrompt}
                            
                            DNA REQUIREMENTS (MUST BE CONSISTENT):
                            - STYLE: Cinematic, 8k, photorealistic, minimal and clean.
                            - COLORS: Deep Black, Surgical White, and bold Swiss Red (#FF0000).
                            - LIGHTING: Dramatic studio lighting, high contrast.
                            - TONE: Authoritative and expensive.
                            
                            Return ONLY the refined English prompt.`,
                    stream: false
                }),
            });
            batchPrompts[type] = (await promptResponse.json()).response.trim();
        }

        console.log(`📸 Generating BATCH images (3)...`);
        Object.assign(finalImages, await AIBridge.generateImagesBatch(batchPrompts, slug, masterLoraPath));

        const imagePublicPath = finalImages.hero;


        // --- STEP 4: PLACEHOLDER INJECTION ---
        console.log('💉 Injecting support images into article body...');
        let finalHtml = articleData.contentHtml;

        // Replacement Logic (using production-relative paths)
        finalHtml = finalHtml.replace('[IMAGE_2]',
            `<figure class="my-8"><img src="/assets/images/news/stb_${slug}_detail.png" alt="Technical Detail" class="rounded-xl shadow-2xl w-full border border-gray-800"/><figcaption class="text-center text-sm text-gray-400 mt-2">Technical Insight: ${articleData.title}</figcaption></figure>`);

        finalHtml = finalHtml.replace('[IMAGE_3]',
            `<figure class="my-8"><img src="/assets/images/news/stb_${slug}_context.png" alt="Contextual Atmosphere" class="rounded-xl shadow-2xl w-full border border-gray-800"/><figcaption class="text-center text-sm text-gray-400 mt-2">Strategic Context</figcaption></figure>`);

        articleData.contentHtml = finalHtml;
        const mainImage = finalImages.hero;


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
                    expertQuote: articleData.expertQuote,
                    keyFactsJson: articleData.keyFacts,
                    isVerified: true,
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
                expertQuote: articleData.expertQuote,
                keyFactsJson: articleData.keyFacts,
                isVerified: true,
                title: articleData.title,
                excerpt: articleData.excerpt,
                contentHtml: articleData.contentHtml,
                metaTitle: `${articleData.title} | SwissTech Briefing`,
                metaDescription: articleData.excerpt,
                translations: translations // Include DeepL translations
            };

            formData.append('article', JSON.stringify(uploadData));

            // Attach all generated images
            for (const type of imageTypes) {
                const imgPath = finalImages[type];
                if (imgPath) {
                    const fullPath = path.join(__dirname, '..', 'public', imgPath);
                    if (fs.existsSync(fullPath)) {
                        const buffer = fs.readFileSync(fullPath);
                        const blob = new Blob([buffer], { type: 'image/png' });
                        formData.append(type === 'hero' ? 'image' : `image_${type}`, blob, `stb_${slug}_${type}.png`);
                    }
                }
            }

            const syncResponse = await fetch('https://swisstechbriefing.ch/api/v1/ingest', {
                method: 'POST',
                headers: {
                    'x-ai-secret': process.env.AI_INGESTION_SECRET || 'SwissTech_AI_Secret_2026_!#'
                },
                body: formData
            });

            if (!syncResponse.ok) {
                const errorText = await syncResponse.text();
                throw new Error(`Server responded with ${syncResponse.status}: ${errorText}`);
            }

            const syncResult = await syncResponse.json();

            if (syncResult.success) {
                console.log('\n✨ [AutoBlogger] PUBLISHED TO LIVE SITE SUCCESSFULLY!');
                console.log(`🔗 Live URL: ${syncResult.url}`);

                // --- LEARNING PHASE (NEW) ---
                const KnowledgeManager = require('./knowledge_manager');
                articleData.slug = slug; // Añadir slug para referencia
                await KnowledgeManager.learnFromArticle(articleData);
            } else {
                console.error('\n❌ [AutoBlogger] Sync Failed (Logic Error):', syncResult.error);
            }

        } catch (syncError) {
            console.error('\n❌ [AutoBlogger] Network/Sync Error:', syncError.message);
            console.log('⚠️ [AutoBlogger] Article is saved locally but could not reach the server.');
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

const THIRTY_MINUTES = 30 * 60 * 1000;

async function startService() {
    while (true) {
        await runAutoBlogger();

        console.log(`\n[Scheduler] ☕ Job finished. Sleeping for 30 minutes...`);
        console.log(`[Scheduler] Next run at: ${new Date(Date.now() + THIRTY_MINUTES).toLocaleTimeString()}`);

        await new Promise(resolve => setTimeout(resolve, THIRTY_MINUTES));
    }
}

if (require.main === module) {
    startService();
}
