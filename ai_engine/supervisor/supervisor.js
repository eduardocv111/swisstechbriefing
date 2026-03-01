const { withRetry } = require('./retryPolicy');
const { checkHealth } = require('./health');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

// Engine Domain Modules
const scanner = require('../scanner');
const AIBridge = require('../bridge');
const Translator = require('../translator');
const Researcher = require('../researcher');
const KnowledgeManager = require('../knowledge_manager');
const { updateMarketData } = require('../market_updater');
const { PrismaClient } = require('../../src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const openclawClient = require('./openclawClient');

/**
 * PRODUCTION-GRADE AI PIPELINE SUPERVISOR
 * Roles: Orchestration, Health Management, Mutex Control, Cleanup
 */
class Supervisor {
    constructor() {
        this.logPrefix = '[Supervisor] 🛡️ ';
        this.isPipelineRunning = false;
        this.lockPath = path.resolve(__dirname, '..', 'pipeline.lock');

        // --- GRACEFUL SHUTDOWN HOOKS ---
        ['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(sig => {
            process.on(sig, () => this.handleFatal(sig));
        });
    }

    log(msg, data = {}) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${this.logPrefix}${msg}`, Object.keys(data).length ? JSON.stringify(data) : '');
    }

    /**
     * MUTEX: Prevent race conditions if multiple instances are triggered
     */
    checkAndAcquireLock() {
        if (fs.existsSync(this.lockPath)) {
            try {
                const pidStr = fs.readFileSync(this.lockPath, 'utf8').trim();
                const pid = parseInt(pidStr, 10);
                if (pid) {
                    process.kill(pid, 0); // Check if process still exists
                    this.log('🛑 EXCLUSION: Pipeline is already locked by PID ' + pid);
                    return false;
                }
            } catch (e) {
                this.log('⚠️ Removing stale lock file from crashed process.');
                this.releaseLock();
            }
        }

        fs.writeFileSync(this.lockPath, process.pid.toString());
        return true;
    }

    releaseLock() {
        try {
            if (fs.existsSync(this.lockPath)) fs.unlinkSync(this.lockPath);
        } catch (e) {
            this.log('❌ Failed to release lock: ' + e.message);
        }
    }

    handleFatal(signal) {
        this.log(`Received ${signal}. Cleaning up and exiting...`);
        this.releaseLock();
        // Give time for logs to flush
        setTimeout(() => process.exit(0), 100);
    }

    async getCycleState() {
        const statePath = path.resolve(__dirname, '..', 'cycle_state.json');
        try {
            if (fs.existsSync(statePath)) {
                return JSON.parse(fs.readFileSync(statePath, 'utf8'));
            }
        } catch (e) {
            this.log('Cycle state reset required.', { error: e.message });
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
     * MAINTENANCE: Market Sync & Pulse
     */
    async startHeartbeat() {
        this.log('Heartbeat Service Initialized (Interval: 5m)');
        setInterval(async () => {
            if (this.isPipelineRunning) return;
            await this.runMaintenance();
        }, 5 * 60 * 1000);
    }

    async runMaintenance() {
        this.log('Running Maintenance (Market + Sync)...');
        try {
            await updateMarketData();
            this.log('Market successfully updated.');
            await this.reportToOpenClaw('HEARTBEAT_SUCCESS', { type: 'market_update' });
        } catch (e) {
            this.log('Maintenance failure', { error: e.message });
        }
    }

    /**
     * CORE PIPELINE: Selection -> Research -> Drafting -> Visuals -> Publish
     */
    async runPipeline() {
        if (this.isPipelineRunning) return;

        if (!this.checkAndAcquireLock()) return;
        this.isPipelineRunning = true;

        this.log('🚀 AI PRODUCTION RUN STARTING');

        try {
            // 1. Health & Dependency Check
            const health = await checkHealth();
            if (!health.ollama) throw new Error('Local Inference Engine (Ollama) is Offline');
            await this.reportToOpenClaw('PIPELINE_START', { health });

            // 2. Discover Trends
            const trendsRaw = await withRetry(async () => {
                const results = await scanner.scanTrends();
                return Object.values(results).flat();
            }, { maxRetries: 2 });

            const trends = trendsRaw.sort(() => Math.random() - 0.5); // Randomize sequence
            let selectedNews = null, research = null, articleData = null;

            // 3. Extraction & Quality Filter Loop
            for (const news of trends) {
                // Deduplication guard
                const existing = await prisma.article.findFirst({ where: { sourcesJson: { contains: news.link } } });
                if (existing) continue;

                this.log(`Investigating: ${news.title}`);
                const res = await Researcher.deepResearch(news.link, news.title);

                if (res.success) {
                    const state = await this.getCycleState();
                    let cycleMode = "NEWS";
                    if (state.count === 3) cycleMode = "TECHNICAL_EDITORIAL";
                    if (state.count === 4) cycleMode = "PODCAST_SPECIAL";

                    this.log(`Research Bundle Complete. Drafting | Mode: ${cycleMode}`);

                    try {
                        const draft = await withRetry(async () => AIBridge.generateArticle(news.title, "", res.rawText, cycleMode), { maxRetries: 2 });
                        const body = draft?.contentHtml || draft?.content || "";

                        // PRODUCTION QUALITY GATES
                        if (!body || body.length < 500) continue;
                        if (body.includes("i apologize") || body.includes("unable to provide")) continue;

                        selectedNews = news;
                        research = res;
                        articleData = draft;
                        break;
                    } catch (draftError) {
                        this.log(`⚠️ Drafting error (${news.title}): ${draftError.message}`);
                        continue;
                    }
                }
            }

            if (!selectedNews) {
                this.log('No eligible trends found this cycle. Suspending pipeline.');
                return;
            }

            // 4. Asset Generation (Visuals + Audio)
            const slug = this.generateSlug(selectedNews.title);
            const loraPath = path.join(__dirname, '..', 'loras', 'super_realism.safetensors');
            this.log(`Generating Assets for ${slug}...`);

            const images = await withRetry(async () => AIBridge.generateImagesBatch(articleData.imagePrompts, slug, loraPath), { maxRetries: 1 });

            let video = null;
            if (images.hero) {
                try {
                    video = await AIBridge.generateVideoAnimation('ltx_cover', articleData.title, `stb_${slug}_hero.mp4`, images.hero);
                } catch (vErr) { this.log('Video non-critical fail'); }
            }

            // 5. Localization & Audio
            const translations = await Translator.translateArticle(articleData, ['fr-CH', 'it-CH', 'es-ES', 'en']);
            this.log('🎙️ Batch Audio Generation starting...');
            const podcasts = await withRetry(async () => AIBridge.generatePodcastBatch(articleData, slug), { maxRetries: 1 });

            articleData.audioUrl = podcasts['de-CH'] || null;
            translations.forEach(t => t.audioUrl = podcasts[t.locale] || null);

            // 6. Local Persist
            await this.publishLocally(selectedNews, articleData, images, video, translations, slug);

            // 7. Global Production Sync
            await this.postPublish(slug, images, { ...articleData, videoUrl: video }, selectedNews, translations);

            // 8. State Commit
            const state = await this.getCycleState();
            state.count = (state.count + 1) % 5;
            state.lastRun = new Date().toISOString();
            this.saveCycleState(state);

            await this.reportToOpenClaw('PIPELINE_SUCCESS', { slug, cycleCount: state.count });
            this.log(`✨ CYCLE COMPLETE: ${slug}`);

        } catch (err) {
            this.log('❌ CRITICAL ERROR', { msg: err.message, stack: err.stack });
            await this.reportToOpenClaw('PIPELINE_FAILURE', { error: err.message });
        } finally {
            this.isPipelineRunning = false;
            this.releaseLock();
        }
    }

    generateSlug(title) {
        return (title || "").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 50) + '-' + Math.floor(Math.random() * 999);
    }

    async publishLocally(news, data, images, video, translations, slug) {
        return await prisma.article.create({
            data: {
                slug, category: news.category, date: new Date(),
                authorName: 'SwissTech AI Editor', authorRole: 'Automated Insight Engine',
                imageUrl: images.hero || '/assets/images/news/default-news.svg', videoUrl: video,
                audioUrl: data.audioUrl,
                sourcesJson: JSON.stringify([{ name: news.source, url: news.link }]),
                expertQuote: data.expertQuote, keyFactsJson: JSON.stringify(data.keyFacts || []), isVerified: true,
                translations: {
                    create: [
                        {
                            locale: 'de-CH', title: data.title, excerpt: data.excerpt, contentHtml: data.contentHtml,
                            metaTitle: data.title, metaDescription: data.excerpt, expertQuote: data.expertQuote,
                            keyFactsJson: JSON.stringify(data.keyFacts || []), audioUrl: data.audioUrl
                        },
                        ...translations.map(t => ({
                            locale: t.locale, title: t.title, excerpt: t.excerpt, contentHtml: t.contentHtml,
                            metaTitle: t.title, metaDescription: t.excerpt, expertQuote: t.expertQuote,
                            keyFactsJson: t.keyFactsJson, audioUrl: t.audioUrl
                        }))
                    ]
                }
            }
        });
    }

    async postPublish(slug, images, articleData, selectedNews, translations) {
        const INGEST_SECRET = process.env.AI_INGESTION_SECRET;
        if (!INGEST_SECRET) return this.log('⚠️ Sync blocked: NO_SECRET');

        try {
            const formData = new FormData();
            const uploadData = {
                slug, category: articleData.category || selectedNews.category,
                authorName: 'SwissTech AI Editor', authorRole: 'Automated Insight Engine',
                sourcesJson: JSON.stringify([{ name: selectedNews.source, url: selectedNews.link }]),
                expertQuote: articleData.expertQuote, keyFactsJson: JSON.stringify(articleData.keyFacts || []),
                isVerified: true, title: articleData.title, excerpt: articleData.excerpt, contentHtml: articleData.contentHtml,
                translations: translations.map(t => ({
                    locale: t.locale, title: t.title, excerpt: t.excerpt, contentHtml: t.contentHtml,
                    expertQuote: t.expertQuote, keyFactsJson: t.keyFactsJson
                }))
            };

            formData.append('article', JSON.stringify(uploadData));

            const attachFile = (name, localPath, type) => {
                if (!localPath) return;
                const abs = path.join(__dirname, '..', '..', 'public', localPath.replace(/^\//, ''));
                if (fs.existsSync(abs)) {
                    formData.append(name, new Blob([fs.readFileSync(abs)], { type }), path.basename(abs));
                }
            };

            attachFile('image', images.hero, 'image/png');
            attachFile('image_detail', images.detail, 'image/png');
            attachFile('image_context', images.context, 'image/png');
            attachFile('video', articleData.videoUrl, 'video/mp4');
            attachFile('audio', articleData.audioUrl, 'audio/mpeg');
            translations.forEach(t => attachFile(`audio_${t.locale}`, t.audioUrl, 'audio/mpeg'));

            const res = await fetch('https://swisstechbriefing.ch/api/v1/ingest', {
                method: 'POST', headers: { 'x-ai-secret': INGEST_SECRET }, body: formData
            });

            if (res.ok) this.log('✅ PRODUCTION SYNC SUCCESS');
            else this.log('❌ SYNC FAILURE: ' + res.status);

        } catch (error) { this.log('❌ SYNC ERROR: ' + error.message); }

        await KnowledgeManager.learnFromArticle({ ...articleData, slug });
    }

    async reportToOpenClaw(event, data) {
        try { await openclawClient.sendEvent(event, data); } catch (e) { }
    }

    async cleanupOrphans() {
        this.log('Maintenance: Purging stale venv processes...');
        return new Promise((resolve) => {
            const cmd = `Get-Process | Where-Object { $_.Path -like "*\\.venv-flux\\*" } | Stop-Process -Force`;
            const proc = exec(`powershell -Command "${cmd}"`);
            const timer = setTimeout(() => resolve(), 5000);
            proc.on('exit', () => { clearTimeout(timer); resolve(); });
        });
    }
}

// BOOTSTRAP
if (require.main === module) {
    (async () => {
        const s = new Supervisor();
        await s.cleanupOrphans();
        await s.runMaintenance();
        await s.startHeartbeat();

        // Immediate first run
        setTimeout(() => s.runPipeline(), 10000);
        // Recurrent schedule
        setInterval(() => s.runPipeline(), 30 * 60 * 1000);
    })();
}

module.exports = Supervisor;
