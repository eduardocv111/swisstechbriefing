const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const LOCK_FILE = path.join(__dirname, "gpu.lock");

/**
 * AI Bridge: Connects the Node.js web server with the local Python AI Engine
 */
class AIBridge {
    /**
     * Cleans prompts that come wrapped by agent text like:
     * "Here is the refined image prompt: ... "
     * Also strips outer quotes.
     */
    static sanitizePrompt(p) {
        if (!p) return "";
        return String(p)
            .replace(/^Here is the refined image prompt:\s*/i, "")
            .replace(/^"+|"+$/g, "")
            .trim();
    }

    /**
     * GPU Hardware Mutex (Improved with PID check)
     */
    static async acquireGPULock(task) {
        const timeout = 10 * 60 * 1000; // 10 min wait max
        const start = Date.now();

        while (fs.existsSync(LOCK_FILE)) {
            let lockData = null;
            try {
                lockData = JSON.parse(fs.readFileSync(LOCK_FILE, 'utf8'));
            } catch (e) {
                // If file is corrupt or empty, just break and take it
                break;
            }

            // check if the process is still alive
            try {
                process.kill(lockData.pid, 0);
                // If it doesn't throw, the process is alive
            } catch (e) {
                // Process is dead! Cleanup lock and proceed
                console.log(`[GPU Lock] 🛡️ Detected dead lock from task: ${lockData.task} (PID ${lockData.pid}). Cleaning up...`);
                if (fs.existsSync(LOCK_FILE)) fs.unlinkSync(LOCK_FILE);
                break;
            }

            const elapsed = Math.floor((Date.now() - start) / 1000);
            if (Date.now() - start > timeout) {
                console.warn(`[GPU Lock] ⏳ Timeout (10 min) for ${task}. Force clearing lock from: ${lockData.task}...`);
                if (fs.existsSync(LOCK_FILE)) fs.unlinkSync(LOCK_FILE);
                break;
            }
            console.log(`[GPU Lock] ⏳ Waiting... (${elapsed}s) for GPU to be free. Current user: ${lockData.task}`);
            await new Promise(r => setTimeout(r, 5000));
        }

        fs.writeFileSync(LOCK_FILE, JSON.stringify({ pid: process.pid, task, time: new Date().toISOString() }));
    }

    static releaseGPULock() {
        if (fs.existsSync(LOCK_FILE)) fs.unlinkSync(LOCK_FILE);
    }

    /**
     * Single image generation (kept for backwards compatibility).
     * Spawns a new Python process each time.
     */
    static async generateImage(prompt, filename, loraPath = null) {
        await AIBridge.acquireGPULock(`single_img_${filename}`);
        return new Promise((resolve, reject) => {
            const pythonPath = path.join(__dirname, ".venv-flux", "Scripts", "python.exe");
            const scriptPath = path.join(__dirname, "generate_image.py");
            const outputPath = path.join(__dirname, "..", "public", "assets", "images", "news", filename);

            const cleanPrompt = AIBridge.sanitizePrompt(prompt);

            console.log(`[AI Bridge] Starting image generation: "${cleanPrompt}"`);

            const pyProcess = spawn(pythonPath, [scriptPath, cleanPrompt, outputPath, loraPath].filter(Boolean));

            const killTimer = setTimeout(() => {
                console.error(`[AI Bridge] 🛑 TIMEOUT killing process: ${filename}`);
                pyProcess.kill('SIGKILL');
            }, 1200000); // 20 min for single image

            pyProcess.stdout.on("data", (data) => {
                console.log(`[Python] ${data.toString().trim()}`);
            });

            pyProcess.stderr.on("data", (data) => {
                console.error(`[Python Error] ${data.toString().trim()}`);
            });

            pyProcess.on("close", (code) => {
                clearTimeout(killTimer);
                AIBridge.releaseGPULock();
                if (code === 0) {
                    resolve(`/assets/images/news/${filename}`);
                } else {
                    reject(new Error(`Python process exited with code ${code}`));
                }
            });
        });
    }

    /**
     * Batch image generation: hero/detail/context in ONE Python run.
     * imagePrompts = { hero: "...", detail: "...", context: "..." }
     */
    static async generateImagesBatch(imagePrompts, slug, loraPath = null) {
        await AIBridge.acquireGPULock(`batch_imgs_${slug}`);
        return new Promise((resolve, reject) => {
            const pythonPath = path.join(__dirname, ".venv-flux", "Scripts", "python.exe");
            const scriptPath = path.join(__dirname, "generate_image.py");
            const outputDir = path.join(__dirname, "..", "public", "assets", "images", "news");

            const jobs = [
                { key: "hero", filename: `stb_${slug}_hero.png`, prompt: AIBridge.sanitizePrompt(imagePrompts?.hero), width: 1024, height: 576 },
                { key: "detail", filename: `stb_${slug}_detail.png`, prompt: AIBridge.sanitizePrompt(imagePrompts?.detail), width: 1024, height: 576 },
                { key: "context", filename: `stb_${slug}_context.png`, prompt: AIBridge.sanitizePrompt(imagePrompts?.context), width: 1024, height: 576 },
            ].filter((j) => j.prompt && j.prompt.length > 0);

            if (!jobs.length) {
                AIBridge.releaseGPULock();
                return resolve({});
            }

            console.log(`[AI Bridge] Starting BATCH image generation for slug=${slug}`);

            const args = [scriptPath, "--batch", outputDir];
            if (loraPath) args.push(loraPath);

            const pyProcess = spawn(pythonPath, args, { stdio: ["pipe", "pipe", "pipe"] });

            const killTimer = setTimeout(() => {
                console.error(`[AI Bridge] 🛑 BATCH TIMEOUT killing: ${slug}`);
                pyProcess.kill('SIGKILL');
            }, 2700000); // 45 min for batch (3 images)

            pyProcess.stdout.on("data", (data) => console.log(`[Python] ${data.toString().trim()}`));
            pyProcess.stderr.on("data", (data) => console.error(`[Python Error] ${data.toString().trim()}`));

            pyProcess.on("close", (code) => {
                clearTimeout(killTimer);
                AIBridge.releaseGPULock();
                if (code === 0) {
                    const out = {};
                    for (const j of jobs) out[j.key] = `/assets/images/news/${j.filename}`;
                    resolve(out);
                } else {
                    reject(new Error(`Python process exited with code ${code}`));
                }
            });

            pyProcess.stdin.write(JSON.stringify({ jobs }));
            pyProcess.stdin.end();
        });
    }

    /**
     * CENTRAL LLM ROUTER
     */
    static async callLLM({ model, system, prompt, format = null, temperature = 0.7 }) {
        const openclawClient = require('./supervisor/openclawClient');
        const fullMessage = system ? `[SYSTEM: ${system}]\n\n${prompt}` : prompt;

        try {
            const result = await openclawClient.request('chat.send', {
                sessionKey: process.env.OPENCLAW_SESSION_KEY || 'agent:main:main',
                message: fullMessage,
                idempotencyKey: crypto.randomUUID(),
                deliver: false
            });

            const content = result?.message?.content || result?.content || (typeof result === 'string' ? result : "");
            if (content && content.trim().length > 0) {
                if (format === "json") {
                    const trimmed = content.trim();
                    if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
                        throw new Error("OpenClaw returned non-JSON content for a JSON request");
                    }
                }
                return content;
            }
            throw new Error("Empty response from OpenClaw Gateway");
        } catch (error) {
            console.warn(`[AI Bridge] ⚠️ OpenClaw failed (${error.message}). Falling back to local Ollama...`);
            try {
                const messages = [];
                if (system) messages.push({ role: "system", content: system });
                messages.push({ role: "user", content: prompt });
                const body = { model, messages, temperature, stream: false };
                if (format === "json") body.response_format = { type: "json_object" };
                const resp = await fetch(`http://127.0.0.1:11434/v1/chat/completions`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (resp.ok) {
                    const data = await resp.json();
                    return data.choices?.[0]?.message?.content || "";
                }
                throw new Error(`Ollama fallback returned HTTP ${resp.status}`);
            } catch (fallbackError) {
                console.error(`[AI Bridge] ❌ Critical: All LLM routes failed. ${fallbackError.message}`);
                return "";
            }
        }
    }

    static async generateArticle(topic, pastContext = "", facts = "No specific data available.", mode = "NEWS") {
        try {
            const isTechnical = mode === "TECHNICAL_EDITORIAL";
            const KnowledgeManager = require("./knowledge_manager");
            console.log(`[AI Bridge] 🏛️ Accessing Editorial Memory (${mode} Mode)...`);
            const pastInsights = await KnowledgeManager.getPastInsights(topic);

            console.log(`[AI Bridge] 🎙️ Step 1: Expert Strategic Briefing...`);
            const expertRole = isTechnical
                ? "You are a Chief AI Scientist & CTO in Switzerland. Output ONLY 3 concise bullet points in German: 1. A deep technical prediction, 2. A non-obvious risk, 3. A strategic opportunity for Swiss SMEs. NO markdown headers."
                : "You are a Senior Swiss Economic & Tech Analyst. Output ONLY 3 concise bullet points in German: 1. Main trend analysis, 2. Market impact prediction, 3. Why it specifically matters for Switzerland's digital sovereignty. NO markdown headers.";

            const expertComment = await AIBridge.callLLM({
                model: "llama3.1:8b", system: expertRole,
                prompt: `Topic: ${topic}.\nSOURCE DATA: ${facts}\nPAST KNOWLEDGE: ${pastInsights}`
            });

            console.log(`[AI Bridge] ✍️ Step 2: Professional Elite Drafting (${mode} Mode)...`);
            const writerSystem = isTechnical
                ? "You are the Lead Technical Architect for SwissTech Briefing. Write an authoritative, extremely technical, and deeply analytical deep-dive editorial in German. Target audience: CTOs and Engineers."
                : "You are the Editor-in-Chief of SwissTech Briefing. Write a professional, high-impact long-form article in German. Balance breaking news with deep strategic analysis and economic context.";

            const techReq = `STRICT EDITORIAL ARCHITECTURE (TECH DEEP-DIVE):
1. TITEL: Provocative & Technical.
2. LEAD: 2 intense sentences in BOLD explaining the paradigm shift.
3. ANALYSIS: Deep dive into the "How it works". Include a conceptual pseudocode block or architectural logic.
4. SWISS IMPACT: Specific technical implications for the Swiss ecosystem (ETH, EPFL, or local startups).
5. STRATEGIC OUTLOOK: Future roadmap based on technical constraints.
6. MARKERS: Inject [IMAGE_2] and [IMAGE_3] organically.`;

            const newsReq = `STRICT EDITORIAL ARCHITECTURE (ELITE NEWS):
1. TITEL: Professional & Direct.
2. LEAD: 2 punchy sentences in BOLD summarizing the "Why it matters".
3. PROBLEM/CONTEXT: The global or local gap being addressed.
4. THE CORE: Analysis of the innovation/event with specific data points.
5. SWISS ANGLE: In-depth section on how this affects Switzerland's position as a tech hub.
6. VERDICT: A final analytical conclusion on long-term viability.
7. MARKERS: Inject [IMAGE_2] and [IMAGE_3] organically.`;

            const podcastReq = `STRICT EDITORIAL ARCHITECTURE (PODCAST SPECIAL):
1. TITEL: Engaging & Narrative (e.g., "Inside the...").
2. LEAD: 2 conversational sentences setting the stage for a deep interview-style summary.
3. THE STORY: Focus on the narrative behind the news. Use vivid, descriptive language.
4. DEEP TECH: A section explaining one complex concept in simple terms.
5. SWISS IMPACT: Why this story specifically matters for the Swiss citizen or business owner.
6. THE FUTURE: A speculative but grounded outlook.
7. MARKERS: Inject [IMAGE_2] and [IMAGE_3] organically.`;

            // ✅ FIX: use `mode` (the actual parameter), not `cycleMode` (undefined)
            let requirements = newsReq;
            if (mode === "TECHNICAL_EDITORIAL") requirements = techReq;
            else if (mode === "PODCAST_SPECIAL") requirements = podcastReq;

            const initialDraft = await AIBridge.callLLM({
                model: "llama3.1:8b", system: writerSystem,
                prompt: `TOPIC: ${topic}.\nCONTENT DATA: ${facts}\nEXPERT PERSPECTIVE:\n${expertComment}\n\n${requirements}\n\nSTYLE: Elite journalism, passive voice where appropriate for formality, sophisticated vocabulary, bold key terms.`
            });

            console.log(`[AI Bridge] 🧐 Step 3: Swiss Editorial Quality Review...`);
            const feedback = await AIBridge.callLLM({
                model: "llama3.1:8b", system: "Senior Swiss Editor. Review for: Professionalism, Logical Flow, and Analytical Depth. Ensure it doesn't sound like generic AI.",
                prompt: `RESEARCH: ${facts}\nDRAFT: ${initialDraft}`
            });

            console.log(`[AI Bridge] 📊 Step 3.5: Fact Extraction...`);
            const extractedFacts = await AIBridge.callLLM({
                model: "llama3.2:3b", system: "Extract exactly 5 numerical data points.",
                prompt: `ARTICLE: ${initialDraft}\nSOURCES: ${facts}`
            });

            console.log(`[AI Bridge] ✨ Step 4: Final JSON Polishing...`);
            let cleanResponse = await AIBridge.callLLM({
                model: "llama3.1:8b",
                format: "json",
                system: "You are a professional JSON Schema Architect. Your task is to refactor the provided article draft into a valid JSON object without losing ANY of the technical depth, original styling (bolding, etc.), or content length. DO NOT summarize or truncate.",
                prompt: `Convert the following article components into a STRICT JSON object. 
RETAIN ALL TEXT VOLUME in 'contentHtml'. 
DRAFT CONTENT: ${initialDraft}
EXTRACTED FACTS: ${extractedFacts}
EXPERT INSIGHT: ${expertComment}

SCHEMA: { 
  "title": "...", 
  "excerpt": "...", 
  "contentHtml": "...", 
  "expertQuote": "...", 
  "keyFacts": [], 
  "imagePrompts": { "hero": "...", "detail": "...", "context": "..." } 
}`
            });

            if (cleanResponse.includes("```")) cleanResponse = cleanResponse.replace(/```[a-z]*\n?/, "").replace(/\n?```/g, "");
            return JSON.parse(cleanResponse.trim());
        } catch (error) {
            console.error("[AI Bridge] Elite Workflow Error:", error);
            throw error;
        }
    }

    static async generateVideoAnimation(task, prompt, outputFilename, inputImage = null) {
        await AIBridge.acquireGPULock(`video_${task}_${outputFilename}`);
        return new Promise((resolve, reject) => {
            const pythonPath = path.join(__dirname, ".venv-flux", "Scripts", "python.exe");
            const scriptPath = path.join(__dirname, "generate_video.py");
            const outputPath = path.join(__dirname, "..", "public", "assets", "images", "news", outputFilename);

            const inputArgs = {
                task: task,
                prompt: AIBridge.sanitizePrompt(prompt),
                output_path: outputPath,
                input_image: inputImage ? (inputImage.startsWith('/assets') ? path.resolve(__dirname, '..', 'public', inputImage.slice(1)) : (path.isAbsolute(inputImage) ? inputImage : path.resolve(__dirname, '..', 'public', inputImage.startsWith('/') ? inputImage.slice(1) : inputImage))) : null
            };

            console.log(`[AI Bridge] 🚀 Starting Video Generation: ${task} for ${outputFilename}`);

            const pyProcess = spawn(pythonPath, [scriptPath]);

            // Hard timeout of 30 mins
            const killTimer = setTimeout(() => {
                console.error(`[AI Bridge] 🛑 Video Generation TIMEOUT: ${outputFilename}. Killing process.`);
                pyProcess.kill('SIGKILL');
            }, 1800000);

            let outputBuffer = "";
            let errorBuffer = "";

            pyProcess.stdout.on("data", (data) => {
                const msg = data.toString();
                outputBuffer += msg;
                if (msg.includes("[Python-Video]")) console.log(msg.trim());
            });

            pyProcess.stderr.on("data", (data) => {
                errorBuffer += data.toString();
            });

            pyProcess.on("close", (code) => {
                clearTimeout(killTimer);
                AIBridge.releaseGPULock();

                if (code === 0 && outputBuffer.includes("SUCCESS|")) {
                    console.log(`[AI Bridge] ✅ Video Success: ${outputFilename}`);
                    resolve(`/assets/images/news/${outputFilename}`);
                } else {
                    console.error(`[AI Bridge] ❌ Video Failed (Code ${code})`);
                    if (errorBuffer) console.error(`   Error details: ${errorBuffer.trim().split('\n').pop()}`);

                    // Specific Windows Cleanup for hanging Torch/CUDA
                    const { exec } = require('child_process');
                    exec(`powershell -Command "Get-Process | Where-Object { $_.Path -like '*\\.venv-flux\\*' } | Stop-Process -Force"`, (err) => {
                        if (!err) console.log(`[AI Bridge] 🛡️ Emergency process cleanup performed.`);
                    });

                    reject(new Error(`Video generation process failed with code ${code}`));
                }
            });

            pyProcess.stdin.write(JSON.stringify(inputArgs));
            pyProcess.stdin.end();
        });
    }

    static async generatePodcastBatch(articleData, slug) {
        await AIBridge.acquireGPULock(`podcast_batch_${slug}`);
        return new Promise((resolve) => {
            const pythonPath = path.join(__dirname, ".venv-flux", "Scripts", "python.exe");
            const scriptPath = path.join(__dirname, "models", "podcast_engine", "audio_engine.py");
            const audioDir = path.join(__dirname, "..", "public", "assets", "audio", "podcasts");

            if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

            const results = {};
            const locales = ["de-CH", ...(articleData.translations || []).map(t => t.locale)];

            console.log(`[AI Bridge] 🎙️ Starting XTTS Batch for: ${locales.join(", ")}`);

            const runLocale = async (loc) => {
                const textData = loc === "de-CH"
                    ? { title: articleData.title, excerpt: articleData.excerpt, contentHtml: articleData.contentHtml }
                    : articleData.translations.find(t => t.locale === loc);

                if (!textData) return;

                return new Promise((res) => {
                    const filename = `stb_${slug}_${loc}.mp3`;
                    const outputPath = path.join(audioDir, filename);
                    const voiceRef = path.join(__dirname, "supervisor", "audioesposa.m4a");

                    console.log(`   [Audio] Generating ${loc}...`);

                    const args = [
                        scriptPath,
                        "--article", JSON.stringify({
                            title: textData.title,
                            excerpt: textData.excerpt,
                            contentHtml: textData.contentHtml
                        }),
                        "--locale", loc,
                        "--output", outputPath
                    ];

                    if (fs.existsSync(voiceRef)) {
                        args.push("--voice_ref", voiceRef);
                    }

                    const pyProcess = spawn(pythonPath, args);

                    let stdout = "";
                    let stderr = "";

                    pyProcess.stdout.on("data", (d) => stdout += d.toString());
                    pyProcess.stderr.on("data", (d) => stderr += d.toString());

                    const audioTimeout = setTimeout(() => {
                        console.error(`   [Audio] 🛑 Timeout for ${loc}`);
                        pyProcess.kill('SIGKILL');
                    }, 1200000); // 20 min per locale

                    pyProcess.on("close", (code) => {
                        clearTimeout(audioTimeout);
                        if (code === 0 && stdout.includes("SUCCESS|")) {
                            results[loc] = `/assets/audio/podcasts/${filename}`;
                            console.log(`   [Audio] ✅ Done: ${loc}`);
                        } else {
                            console.error(`   [Audio] ❌ Failed: ${loc} (Code ${code})`);
                            if (stderr) console.error(`      Error: ${stderr.trim().split('\n').pop()}`);
                        }
                        res();
                    });
                });
            };

            // Run sequentially to avoid GPU OOM
            (async () => {
                for (const loc of locales) {
                    await runLocale(loc);
                }
                AIBridge.releaseGPULock();
                resolve(results);
            })();
        });
    }
}

module.exports = AIBridge;