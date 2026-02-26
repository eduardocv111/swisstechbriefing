const { spawn } = require("child_process");
const path = require("path");

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
     * Single image generation (kept for backwards compatibility).
     * Spawns a new Python process each time.
     */
    static generateImage(prompt, filename, loraPath = null) {
        return new Promise((resolve, reject) => {
            const pythonPath = path.join(__dirname, ".venv-flux", "Scripts", "python.exe");
            const scriptPath = path.join(__dirname, "generate_image.py");
            const outputPath = path.join(__dirname, "..", "public", "assets", "images", "news", filename);

            const cleanPrompt = AIBridge.sanitizePrompt(prompt);

            console.log(`[AI Bridge] Starting image generation: "${cleanPrompt}"`);
            if (loraPath) console.log(`[AI Bridge] Using specified LoRA: ${loraPath}`);

            const args = [scriptPath, cleanPrompt, outputPath];
            if (loraPath) args.push(loraPath);

            const pyProcess = spawn(pythonPath, args);

            pyProcess.stdout.on("data", (data) => {
                console.log(`[Python] ${data.toString().trim()}`);
            });

            pyProcess.stderr.on("data", (data) => {
                console.error(`[Python Error] ${data.toString().trim()}`);
            });

            pyProcess.on("close", (code) => {
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
     * Requires generate_image.py to support:
     *   python generate_image.py --batch <output_dir> [lora_path]
     * and read stdin JSON:
     *   { "jobs": [ { "filename": "...", "prompt": "..." }, ... ] }
     *
     * imagePrompts = { hero: "...", detail: "...", context: "..." }
     * returns: { hero: "/assets/images/news/..", detail: "...", context: "..." }
     */
    static generateImagesBatch(imagePrompts, slug, loraPath = null) {
        return new Promise((resolve, reject) => {
            const pythonPath = path.join(__dirname, ".venv-flux", "Scripts", "python.exe");
            const scriptPath = path.join(__dirname, "generate_image.py");
            const outputDir = path.join(__dirname, "..", "public", "assets", "images", "news");

            const jobs = [
                { key: "hero", filename: `stb_${slug}_hero.png`, prompt: AIBridge.sanitizePrompt(imagePrompts?.hero) },
                { key: "detail", filename: `stb_${slug}_detail.png`, prompt: AIBridge.sanitizePrompt(imagePrompts?.detail) },
                { key: "context", filename: `stb_${slug}_context.png`, prompt: AIBridge.sanitizePrompt(imagePrompts?.context) },
            ].filter((j) => j.prompt && j.prompt.length > 0);

            if (!jobs.length) return resolve({});

            console.log(`[AI Bridge] Starting BATCH image generation (${jobs.length} images) for slug=${slug}`);
            if (loraPath) console.log(`[AI Bridge] Using specified LoRA: ${loraPath}`);

            const args = [scriptPath, "--batch", outputDir];
            if (loraPath) args.push(loraPath);

            const pyProcess = spawn(pythonPath, args, { stdio: ["pipe", "pipe", "pipe"] });

            pyProcess.stdout.on("data", (data) => {
                console.log(`[Python] ${data.toString().trim()}`);
            });

            pyProcess.stderr.on("data", (data) => {
                console.error(`[Python Error] ${data.toString().trim()}`);
            });

            pyProcess.on("close", (code) => {
                if (code === 0) {
                    const out = {};
                    for (const j of jobs) out[j.key] = `/assets/images/news/${j.filename}`;
                    resolve(out);
                } else {
                    reject(new Error(`Python process exited with code ${code}`));
                }
            });

            // Send jobs to python via stdin
            pyProcess.stdin.write(JSON.stringify({ jobs }));
            pyProcess.stdin.end();
        });
    }

    static async generateArticle(topic, pastContext = "", facts = "No specific data available.") {
        try {
            const KnowledgeManager = require("./knowledge_manager");
            console.log(`[AI Bridge] 🏛️ Accessing Editorial Memory & Past Knowledge...`);

            // Consultar lo que ya sabemos sobre el tema
            const pastInsights = await KnowledgeManager.getPastInsights(topic);

            console.log(`[AI Bridge] 🎙️ Step 1: Expert Consultation (Simulated Specialist)...`);
            // AGENT 1: The Domain Expert
            const expertResponse = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                body: JSON.stringify({
                    model: "llama3.1:8b",
                    prompt: `You are a Senior Swiss Tech Analyst. 
                            Topic: ${topic}.
                            SOURCE DATA (Multiple Perspectives): ${facts}
                            PAST KNOWLEDGE (What we already published): ${pastInsights}
                            Task: Evaluate the information. Connect current events with our past knowledge if relevant.
                            Output: One authoritative, insightful quote in German.`,
                    stream: false,
                }),
            });
            const expertComment = (await expertResponse.json()).response;

            console.log(`[AI Bridge] ✍️ Step 2: Professional Drafting with Context...`);
            // AGENT 2: The Researcher/Writer
            const draftResponse = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                body: JSON.stringify({
                    model: "llama3.1:8b",
                    prompt: `You are a specialized Swiss technology journalist. Write a professional, long-form news article. 
                            Topic: ${topic}.
                            RESEARCH DATA (Multi-source): ${facts}
                            EXPERT INSIGHT: ${expertComment}
                            Language: German. 
                            Requirements: Synthesize information from all sources provided. Avoid repetition. 
                            Focus on authority, technical accuracy, and the Swiss context/impact.
                            Output: Full article body with professional headings.`,
                    stream: false,
                }),
            });
            const initialDraft = (await draftResponse.json()).response;

            console.log(`[AI Bridge] 🧐 Step 3: Critical Editorial Board Review...`);
            // AGENT 3: The Critical Editor
            const reviewResponse = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                body: JSON.stringify({
                    model: "llama3.1:8b",
                    prompt: `Review this draft for a premium Swiss outlet against the RAW RESEARCH. 
                            RESEARCH: ${facts}
                            DRAFT: ${initialDraft}
                            Task: Cross-reference facts from the various sources. Ensure all key numbers and entities are correct.
                            Identify clichés or factual gaps. Give direct feedback.`,
                    stream: false,
                }),
            });
            const feedback = (await reviewResponse.json()).response;

            console.log(`[AI Bridge] ✨ Step 4: Final Elite Polishing & Formatting...`);
            // AGENT 4: The Polisher
            const finalResponse = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                body: JSON.stringify({
                    model: "llama3.1:8b",
                    system: "You are a JSON generator for a premium news site. Return ONLY raw JSON. No markdown.",
                    prompt: `Refactor this technical news article into its final structured format. 
                            ARTICLE: ${initialDraft}
                            FEEDBACK: ${feedback}
                            ANALYST QUOTE: ${expertComment}
                            RAW SOURCES: ${facts}
                            
                            Required JSON format:
                            {
                                "title": "Elite Headline",
                                "excerpt": "Professional teaser summary",
                                "contentHtml": "Compelling long-form article with <h3> and <p> tags. IMPORTANT: Insert placeholders [IMAGE_2] and [IMAGE_3] strategically between paragraphs where a visual break adds value.",
                                "expertQuote": "Authority statement",
                                "keyFacts": "Bullet points synthesized from all sources",
                                "imagePrompts": {
                                    "hero": "Prompt for main cover (person or main event)",
                                    "detail": "Prompt for technical macro detail (chips, hardware, code) with same lighting/colors as hero",
                                    "context": "Prompt for Swiss-Tech atmosphere or symbolic metaphor with same lighting/colors as hero"
                                }
                            }`,
                    stream: false,
                    format: "json",
                }),
            });
            const finalData = await finalResponse.json();

            let cleanResponse = (finalData.response || "").trim();

            // 1. Remove Markdown code blocks
            if (cleanResponse.startsWith("```")) {
                cleanResponse = cleanResponse.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "");
            }

            try {
                return JSON.parse(cleanResponse);
            } catch (parseError) {
                console.warn("[AI Bridge] ⚠️ Standard parse failed. Attempting truncated JSON recovery...");

                // Truncated JSON recovery: If it ends abruptly, try to close the strings and object
                let repaired = cleanResponse;
                if (!repaired.endsWith("}")) {
                    // Count quotes to see if we need to close one
                    const quoteCount = (repaired.match(/"/g) || []).length;
                    if (quoteCount % 2 !== 0) repaired += '"';
                    repaired += "}";
                }

                try {
                    return JSON.parse(repaired);
                } catch (secondError) {
                    console.error("[AI Bridge] ❌ Failed to recover JSON. Raw output:", cleanResponse);
                    throw secondError;
                }
            }
        } catch (error) {
            console.error("[AI Bridge] Elite Workflow Error:", error);
            throw error;
        }
    }
}

module.exports = AIBridge;