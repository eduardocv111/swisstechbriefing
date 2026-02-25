const { scanTrends } = require('./scanner');
const AIBridge = require('./bridge');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Initialize Prisma
const prisma = new PrismaClient();

/**
 * Professional AutoBlogger 2.0
 * Fully integrated with Prisma for real-time publishing
 */
async function runAutoBlogger() {
    console.log('\n--- 🚀 SwissTech AutoBlogger (Professional Edition) ---');

    try {
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

        // 3. GENERATE ARTICLE CONTENT (Llama 3.1)
        console.log('🧠 Llama 3.1 is crafting the editorial content...');
        const articleData = await AIBridge.generateArticle(selectedNews.title);

        // Clean and generate Slug
        const slug = selectedNews.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
            .substring(0, 60) + '-' + Math.floor(Math.random() * 1000);

        // 4. GENERATE PREMIUM ART (FLUX)
        const imageFilename = `stb_${slug}.png`;
        const imagePrompt = `Premium editorial high-tech photography for a news article titled "${articleData.title}". Focus on Swiss precision, minimalist design, deep OLED black background, glowing ruby red futuristic elements. 8k resolution, professional lighting, zero noise.`;

        console.log('🎨 FLUX.1-schnell is rendering the cover art (Local GPU)...');
        const imagePublicPath = await AIBridge.generateImage(imagePrompt, imageFilename);

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
                metaDescription: articleData.excerpt
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
                    'x-ai-secret': 'SwissTech_AI_Secret_2026_!#'
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
