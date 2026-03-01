const { withRetry } = require('./retryPolicy');
const { checkHealth } = require('./health');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

// Existing Engine Imports
const scanner = require('../scanner');
const AIBridge = require('../bridge');
const Translator = require('../translator');
const Researcher = require('../researcher');
const KnowledgeManager = require('../knowledge_manager');
const { updateMarketData } = require('../market_updater');
const { PrismaClient } = require('../../src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const Database = require('better-sqlite3');
const openclawClient = require('./openclawClient');
// 1. Database Initialization Strategy (Robust)
// Detect relative paths and convert to absolute to prevent Prisma crash when running from subdirectory
const repoRoot = path.resolve(__dirname, '..', '..');

if (!process.env.DATABASE_URL) {
    const fallbackPath = path.join(repoRoot, 'data', 'stb.db');
    process.env.DATABASE_URL = `file:${fallbackPath.replace(/\\/g, '/')}`;
    console.warn(`[Supervisor] 🛡️ DATABASE_URL missing. Fallback applied: ${process.env.DATABASE_URL}`);
} else if (process.env.DATABASE_URL.startsWith('file:./')) {
    const relativePath = process.env.DATABASE_URL.replace('file:./', '');
    const absolutePath = path.join(repoRoot, relativePath);
    process.env.DATABASE_URL = `file:${absolutePath.replace(/\\/g, '/')}`;
    console.log(`[Supervisor] 🛡️ Rewrote relative DATABASE_URL to absolute: ${process.env.DATABASE_URL}`);
} else {
    console.log(`[Supervisor] 🛡️ Using DATABASE_URL: ${process.env.DATABASE_URL}`);
}

// Ensure the directory exists (equivalent to mkdir -p)
const dbFilePath = process.env.DATABASE_URL.startsWith('file:')
    ? process.env.DATABASE_URL.replace('file:', '')
    : process.env.DATABASE_URL;
const dbFileDir = path.dirname(dbFilePath);

if (!fs.existsSync(dbFileDir)) {
    console.log(`[Supervisor] 🛡️ Creating database directory: ${dbFileDir}`);
    fs.mkdirSync(dbFileDir, { recursive: true });
}

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

class Supervisor {
    constructor() {
        this.logPrefix = '[Supervisor] 🛡️ ';
        this.isPipelineRunning = false;
    }

    log(msg, data = {}) {
        console.log(this.logPrefix + msg, JSON.stringify(data));
    }

    getCycleState() {
        const statePath = path.resolve(__dirname, '..', 'cycle_state.json');
        try {
            if (fs.existsSync(statePath)) {
                return JSON.parse(fs.readFileSync(statePath, 'utf8'));
            }
        } catch (e) {
            this.log('Error reading cycle state, resetting...', { error: e.message });
        }
        return { count: 0, lastRun: null };
    }

    saveCycleState(state) {
        const statePath = path.resolve(__dirname, '..', 'cycle_state.json');
        try {
            fs.writeFileSync(statePath, JSON.stringify(state, null, 4));
        } catch (e) {
            this.log('Error saving cycle state', { error: e.message });
        }
    }

    /**
     * HEARTBEAT: Integrated 5-minute tasks (Market, Macro, etc.)
     */
    async startHeartbeat() {
        this.log('Heartbeat started (Market updates every 5m)');

        // Schedule next runs
        setInterval(async () => {
            if (this.isPipelineRunning) {
                this.log('Heartbeat: Pipeline is busy, skipping market update to save GPU/CPU.');
                return;
            }
            await this.runMaintenance();
        }, 5 * 60 * 1000);
    }

    async runMaintenance() {
        this.log('Running scheduled maintenance tasks...');
        try {
            await updateMarketData();
            this.log('Market data updated successfully.');
            await this.reportToOpenClaw('HEARTBEAT_SUCCESS', { type: 'market_update' });
        } catch (e) {
            this.log('Market update failed', { error: e.message });
        }
    }

    /**
     * MAIN AI PIPELINE
     */
    async runPipeline() {
        if (this.isPipelineRunning) return;
        this.isPipelineRunning = true;

        this.log('Initializing Elite AI Pipeline...');

        try {
            const health = await checkHealth();
            if (!health.ollama) throw new Error('Ollama is offline');
            await this.reportToOpenClaw('PIPELINE_START', { health });

            const trendsRaw = await withRetry(async () => {
                const results = await scanner.scanTrends();
                return [
                    ...(results['KI'] || []),
                    ...(results['Startups'] || []),
                    ...(results['Regulierung'] || []),
                    ...(results['Defense Tech'] || []),
                    ...(results['Space Tech'] || []),
                    ...(results['Space & Discovery'] || []),
                    ...(results['Discovery'] || []),
                    ...(results['Podcast'] || [])
                ];
            }, { maxRetries: 2 });

            // 🔀 SHUFFLE: Randomize candidates to prevent category starvation (e.g. 'Regulierung' being ignored)
            const trends = trendsRaw.sort(() => Math.random() - 0.5);

            let selectedNews = null;
            let research = null;

                        let articleData = null;

            // 🚀 ADVANCED SELECTION LOOP: Try multiple trends until one succeeds in research AND generation
            for (const news of trends) {
                const existing = await prisma.article.findFirst({ where: { sourcesJson: { contains: news.link } } });
                if (existing) continue;

                this.log(`Attempting research for: ${news.title}`);
                const res = await Researcher.deepResearch(news.link, news.title);
                
                if (res.success) {
                    const state = this.getCycleState();
                    /* 🚀 ELITE 3-1-1 CYCLE LOGIC: 3 News, 1 Technical, 1 Podcast Special */
                    let cycleMode = "NEWS";
                    if (state.count === 3) cycleMode = "TECHNICAL_EDITORIAL";
                    if (state.count === 4) cycleMode = "PODCAST_SPECIAL";

                    this.log(`Research successful. Drafting "${news.title}" in ${cycleMode} mode...`);
                    
                    try {
                        const draft = await withRetry(async () => AIBridge.generateArticle(news.title, "", res.rawText, cycleMode), { maxRetries: 2 });
                        const articleBody = draft?.contentHtml ?? draft?.content ?? draft?.html ?? "";

                        // Validation Guardrail
                        if (!articleBody || String(articleBody).trim().length < 500) {
                            this.log(`🛑 Draft too thin (${articleBody?.length} chars) for "${news.title}". Trying next trend...`);
                            continue;
                        }

                        if (articleBody.toLowerCase().includes("i apologize") || articleBody.toLowerCase().includes("unable to generate")) {
                            this.log(`🛑 LLM refused to generate content for "${news.title}". Trying next trend...`);
                            continue;
                        }

                        // Success!
                        selectedNews = news;
                        research = res;
                        articleData = draft;
                        break; 
                    } catch (draftError) {
                        this.log(`❌ Drafting failed for "${news.title}": ${draftError.message}. Trying next trend...`);
                        continue;
                    }
                } else {
                    this.log(`⚠️ Research failed for "${news.title}". Trying next trend...`, { reason: res.reason });
                }
            }

            if (!selectedNews || !articleData) {
                this.log('All available trends failed research or already processed. Standing down.');
                this.isPipelineRunning = false;
                return;
            }

            const state = this.getCycleState();
            let cycleMode = "NEWS";
            if (state.count === 3) cycleMode = "TECHNICAL_EDITORIAL";
            if (state.count === 4) cycleMode = "PODCAST_SPECIAL";

            this.log(`Final Selection: ${selectedNews.title}. Proceeding with visuals.`);

            // Force categories based on Cycle Mode
            if (cycleMode === "TECHNICAL_EDITORIAL") {
                selectedNews.category = "Analyse & Insights";
            } else if (cycleMode === "PODCAST_SPECIAL") {
                selectedNews.category = "Podcast";
            }

            const slug = this.generateSlug(selectedNews.title);
            const loraPath = path.join(__dirname, '..', 'loras', 'super_realism.safetensors');
            const finalImages = await withRetry(async () => AIBridge.generateImagesBatch(articleData.imagePrompts, slug, loraPath), { maxRetries: 1 });

            let video = null;
            if (finalImages.hero) {
                try {
                    this.log('🚀 Starting AI Video Generation (Elite Mode)...');

                    // Use the specific image prompt for animation if available
                    const videoPrompt = articleData.imagePrompts?.hero || articleData.title;

                    video = await AIBridge.generateVideoAnimation(
                        'ltx_cover',
                        videoPrompt,
                        `stb_${slug}_hero.mp4`,
                        finalImages.hero
                    );

                    this.log(`✅ Video generated: ${video}`);
                } catch (vErr) {
                    this.log(`⚠️ Video generation skipped or failed: ${vErr.message}`);
                }
            }

            // 🛡️ Normalization: Ensure the expert quote is a clean string before translating
            const originalQuote = this.normalizeQuote(articleData.expertQuote);
            articleData.expertQuote = originalQuote; // Mutate for translator

            // 🎨 IMAGE INJECTION: Inject detail and context images into the body if they exist
            if (finalImages.detail) {
                const detailImgHtml = `
<figure class="my-14 group">
    <div class="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50">
        <img src="${finalImages.detail}" alt="Technical Insight" class="w-full h-auto transition-transform duration-700 group-hover:scale-105"/>
        <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <figcaption class="mt-4 text-center">
        <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Insight Detail</span>
        <p class="text-xs font-medium text-slate-400 mt-1 italic">${articleData.title}</p>
    </figcaption>
</figure>`;
                if (articleData.contentHtml.includes('[IMAGE_2]')) {
                    articleData.contentHtml = articleData.contentHtml.replace('[IMAGE_2]', detailImgHtml);
                } else {
                    // Fallback: Inject after 2nd paragraph
                    const parts = articleData.contentHtml.split('</p>');
                    if (parts.length > 2) {
                        parts[1] += `\n${detailImgHtml}`;
                        articleData.contentHtml = parts.join('</p>');
                    }
                }
            }

            if (finalImages.context) {
                const contextImgHtml = `
<figure class="my-14 group">
    <div class="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50">
        <img src="${finalImages.context}" alt="Strategic Context" class="w-full h-auto transition-transform duration-700 group-hover:scale-105"/>
    </div>
    <figcaption class="mt-4 text-center">
        <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Strategischer Fokus</span>
        <p class="text-xs font-medium text-slate-400 mt-1 italic">Analyse & Impact</p>
    </figcaption>
</figure>`;
                if (articleData.contentHtml.includes('[IMAGE_3]')) {
                    articleData.contentHtml = articleData.contentHtml.replace('[IMAGE_3]', contextImgHtml);
                } else {
                    // Fallback: Inject before the last paragraph
                    const parts = articleData.contentHtml.split('</p>');
                    if (parts.length > 4) {
                        parts[parts.length - 2] += `\n${contextImgHtml}`;
                        articleData.contentHtml = parts.join('</p>');
                    }
                }
            }

            const translations = await Translator.translateArticle(articleData, ['fr-CH', 'it-CH', 'es-ES', 'en']);

            // 🎙️ TOP TIER: Batch Podcast Generation (Local GPU)
            this.log('🎙️ Starting AI Podcast Batch Generation (All Languages)...');
            const podcasts = await withRetry(async () => AIBridge.generatePodcastBatch(articleData, slug), { maxRetries: 1 });

            // Map podcasts to data structures for publishing
            articleData.audioUrl = podcasts['de-CH'] || null;
            translations.forEach(t => {
                t.audioUrl = podcasts[t.locale] || null;
            });

            await this.publishLocally(selectedNews, articleData, finalImages, video, translations, slug);

            // 🚀 Now syncing to production with full context (Images, Video & Podcasts)
            await this.postPublish(slug, finalImages, { ...articleData, videoUrl: video }, selectedNews, translations);

            // Update Cycle State
            state.count = (state.count + 1) % 5;
            state.lastRun = new Date().toISOString();
            this.saveCycleState(state);

            await this.reportToOpenClaw('PIPELINE_SUCCESS', { slug, cycleCount: state.count });

        } catch (err) {
            this.log('Pipeline Critical Failure', { error: err.message, stack: err.stack });
            await this.reportToOpenClaw('PIPELINE_FAILURE', { error: err.message });
        } finally {
            this.isPipelineRunning = false;
        }
    }

    generateSlug(title) {
        const safeTitle = (title ?? "").toString().trim().toLowerCase().replace(/\s+/g, ' ');
        return safeTitle.replace(/ /g, '-').replace(/[^\w-]+/g, '').substring(0, 50) + '-' + Math.floor(Math.random() * 1000);
    }

    normalizeQuote(q) {
        if (!q) return null;
        if (typeof q === "string") return q.trim() || null;

        if (typeof q === "object" && q !== null) {
            const quoteText = (q.quote ?? q.text ?? q.content ?? "").toString().trim();
            const author = (q.authorName ?? q.author ?? "").toString().trim();
            const titleStr = (q.authorTitle ?? "").toString().trim();
            const dateStr = (q.datePublished ?? q.date ?? "").toString().trim();

            const parts = [];
            if (quoteText) parts.push(`“${quoteText}”`);
            if (author) parts.push(`— ${author}${titleStr ? `, ${titleStr}` : ""}`);
            if (dateStr) parts.push(`(${dateStr})`);

            const outText = parts.join(" ");
            return outText.trim() || null;
        }

        return String(q).trim() || null;
    }

    async publishLocally(news, data, images, video, translations, slug) {
        return await prisma.article.create({
            data: {
                slug, category: news.category, date: new Date(),
                authorName: 'SwissTech AI Editor', authorRole: 'Automated Insight Engine',
                imageUrl: images.hero || '/assets/images/news/default-news.svg', videoUrl: video,
                audioUrl: data.audioUrl || null,
                sourcesJson: JSON.stringify([{ name: news.source, url: news.link }]),
                expertQuote: this.normalizeQuote(data.expertQuote), keyFactsJson: JSON.stringify(data.keyFacts || []), isVerified: true,
                translations: {
                    create: [
                        {
                            locale: 'de-CH',
                            title: data.title,
                            excerpt: data.excerpt,
                            contentHtml: data.contentHtml,
                            metaTitle: `${data.title} | SwissTech Briefing`,
                            metaDescription: data.excerpt,
                            expertQuote: this.normalizeQuote(data.expertQuote),
                            keyFactsJson: JSON.stringify(data.keyFacts || []),
                            audioUrl: data.audioUrl || null
                        },
                        ...translations.map(t => ({
                            locale: t.locale,
                            title: t.title,
                            excerpt: t.excerpt,
                            contentHtml: t.contentHtml,
                            metaTitle: t.metaTitle || `${t.title} | SwissTech Briefing`,
                            metaDescription: t.metaDescription || t.excerpt,
                            expertQuote: t.expertQuote,
                            keyFactsJson: t.keyFactsJson,
                            audioUrl: t.audioUrl || null
                        }))
                    ]
                }
            }
        });
    }

    async postPublish(slug, images, articleData, selectedNews, translations) {
        this.log(`🚀 Production Ingestion starting for: ${slug}`);

        const SITE_URL = 'https://swisstechbriefing.ch';
        const INGEST_SECRET = process.env.AI_INGESTION_SECRET;

        if (!INGEST_SECRET) {
            this.log('⚠️ AI_INGESTION_SECRET missing in .env. Skipping production upload.');
            return;
        }

        try {
            const formData = new FormData();

            // 1. Prepare Article Metadata & Translations
            // Bundling everything into a single "article" JSON field for the ingestion API
            const uploadData = {
                slug,
                category: articleData.category || selectedNews.category,
                authorName: 'SwissTech AI Editor',
                authorRole: 'Automated Insight Engine',
                sourcesJson: JSON.stringify([{ name: selectedNews.source, url: selectedNews.link }]),
                expertQuote: articleData.expertQuote,
                keyFactsJson: JSON.stringify(articleData.keyFacts || []),
                isVerified: true,
                title: articleData.title,
                excerpt: articleData.excerpt,
                contentHtml: articleData.contentHtml,
                metaTitle: `${articleData.title} | SwissTech Briefing`,
                metaDescription: articleData.excerpt,
                translations: translations.map(t => ({
                    locale: t.locale,
                    title: t.title,
                    excerpt: t.excerpt,
                    contentHtml: t.contentHtml,
                    expertQuote: t.expertQuote,
                    keyFactsJson: t.keyFactsJson,
                    metaTitle: t.metaTitle || `${t.title} | SwissTech Briefing`,
                    metaDescription: t.metaDescription || t.excerpt
                }))
            };

            formData.append('article', JSON.stringify(uploadData));

            // 2. Attach Binary Files (Images, Video & Podcasts)
            const attachFile = (name, localPath, type) => {
                if (!localPath) return;
                const absolutePath = path.join(__dirname, '..', '..', 'public', localPath.startsWith('/') ? localPath.slice(1) : localPath);
                if (fs.existsSync(absolutePath)) {
                    const buffer = fs.readFileSync(absolutePath);
                    const blob = new Blob([buffer], { type });
                    formData.append(name, blob, path.basename(absolutePath));
                    this.log(`   📎 Attached ${name}: ${path.basename(absolutePath)}`);
                } else {
                    this.log(`   ⚠️ File not found locally: ${absolutePath}`);
                }
            };

            attachFile('image', images.hero, 'image/png');
            attachFile('image_detail', images.detail, 'image/png');
            attachFile('image_context', images.context, 'image/png');
            attachFile('video', articleData.videoUrl, 'video/mp4');

            // --- AUDIO SYNC (TOP TIER) ---
            attachFile('audio', articleData.audioUrl, 'audio/mpeg');

            translations.forEach(t => {
                if (t.audioUrl) {
                    attachFile(`audio_${t.locale}`, t.audioUrl, 'audio/mpeg');
                }
            });


            // 3. Send to Secure Ingestion Endpoint
            this.log(`✈️ Sending Secure Ingestion request to production...`);
            const res = await fetch(`${SITE_URL}/api/v1/ingest`, {
                method: 'POST',
                headers: {
                    'x-ai-secret': INGEST_SECRET
                },
                body: formData
            });

            if (res.ok) {
                const result = await res.json();
                this.log(`✅ Production ingestion successful! URL: ${result.url}`);
            } else {
                const errData = await res.text();
                this.log(`❌ Production ingestion failed: ${res.status}`, { error: errData });
            }

        } catch (error) {
            this.log(`❌ Post-Publish ingestion error: ${error.message}`);
        }

        // Final local step: Learn from this article for the knowledge base
        await KnowledgeManager.learnFromArticle({ ...articleData, slug });
    }

    async reportToOpenClaw(event, data) {
        // Now using WebSocket client for resilience and to avoid 405 Method Not Allowed
        try {
            await openclawClient.sendEvent(event, data);
        } catch (e) {
            this.log('OpenClaw Integration Warning', { error: e.message });
        }
    }
    async cleanupOrphans() {
        const { exec } = require('child_process');
        this.log('Initiating orphan AI process cleanup...');

        return new Promise((resolve) => {
            const cmd = `Get-Process | Where-Object { $_.Path -like "*\\.venv-flux\\*" } | Stop-Process -Force`;
            const proc = exec(`powershell -Command "${cmd}"`);

            // We only give it 5 seconds, then we move on regardless
            const timer = setTimeout(() => {
                this.log('Orphan cleanup is taking too long, moving on...');
                resolve();
            }, 5000);

            proc.on('exit', () => {
                clearTimeout(timer);
                this.log('Orphan cleanup scan finished.');
                resolve();
            });
        });
    }
}

async function startSupervisor() {
    const s = new Supervisor();

    // 0. Kill any zombies from previous runs
    await s.cleanupOrphans();

    // 1. Run maintenance ONCE at very startup
    await s.runMaintenance();

    // 2. Start the 5m interval for maintenance (Heartbeat)
    await s.startHeartbeat();

    // 3. Trigger AI Pipeline after 30 seconds for verification
    setTimeout(async () => {
        s.log('Triggering scheduled AI Pipeline run now...');
        await s.runPipeline();
    }, 30 * 1000);

    // 4. Then continue every 30 minutes
    setInterval(async () => {
        await s.runPipeline();
    }, 30 * 60 * 1000);
}

if (require.main === module) {
    startSupervisor();
}

module.exports = Supervisor;
