const { spawn } = require('child_process');
const path = require('path');

/**
 * AI Bridge: Connects the Node.js web server with the local Python AI Engine
 */
class AIBridge {
    static generateImage(prompt, filename) {
        return new Promise((resolve, reject) => {
            const pythonPath = path.join(__dirname, '.venv-flux', 'Scripts', 'python.exe');
            const scriptPath = path.join(__dirname, 'generate_image.py');
            const outputPath = path.join(__dirname, '..', 'public', 'assets', 'images', 'news', filename);

            console.log(`[AI Bridge] Starting image generation: "${prompt}"`);

            const pyProcess = spawn(pythonPath, [scriptPath, prompt, outputPath]);

            pyProcess.stdout.on('data', (data) => {
                console.log(`[Python] ${data.toString().trim()}`);
            });

            pyProcess.stderr.on('data', (data) => {
                console.error(`[Python Error] ${data.toString().trim()}`);
            });

            pyProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(`/assets/images/news/${filename}`);
                } else {
                    reject(new Error(`Python process exited with code ${code}`));
                }
            });
        });
    }

    /**
     * ELITE AGENT WORKFLOW: Research, Memory, Expert Interview, Drafting, Review, and Polish.
     */
    static async generateArticle(topic, pastContext = "") {
        try {
            console.log(`[AI Bridge] 🏛️ Accessing Editorial Memory...`);

            console.log(`[AI Bridge] 🎙️ Step 1: Expert Consultation (Simulated Specialist)...`);
            // AGENT 1: The Domain Expert
            const expertResponse = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                body: JSON.stringify({
                    model: 'llama3.1:8b',
                    prompt: `You are a Senior Swiss Tech Analyst with 25 years of experience. 
                            Provide a deep, insightful quote and one technical fact about: ${topic}.
                            Context of our previous news: ${pastContext}
                            Output: Just the insightful commentary in German.`,
                    stream: false
                }),
            });
            const expertComment = (await expertResponse.json()).response;

            console.log(`[AI Bridge] ✍️ Step 2: Professional Drafting with Context...`);
            // AGENT 2: The Researcher/Writer
            const draftResponse = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                body: JSON.stringify({
                    model: 'llama3.1:8b',
                    prompt: `You are a specialized Swiss technology journalist. Write a professional news article about: ${topic}. 
                            Language: German. 
                            EDITORIAL MEMORY (Reference this if relevant): ${pastContext}
                            INSIGHT FROM OUR EXPERT: ${expertComment}
                            Requirements: Authoritative, mention the expert's insight, link to Swiss industry.
                            Output: The full article content only.`,
                    stream: false
                }),
            });
            const initialDraft = (await draftResponse.json()).response;

            console.log(`[AI Bridge] 🧐 Step 3: Critical Editorial Board Review...`);
            // AGENT 3: The Critical Editor
            const reviewResponse = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                body: JSON.stringify({
                    model: 'llama3.1:8b',
                    prompt: `Review this draft for SwissTech Briefing. Ensure zero AI clichés. 
                            DRAFT: ${initialDraft}
                            Output: 3 specific critical improvements.`,
                    stream: false
                }),
            });
            const feedback = (await reviewResponse.json()).response;

            console.log(`[AI Bridge] ✨ Step 4: Final Elite Polishing & Formatting...`);
            // AGENT 4: The Polisher
            const finalResponse = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                body: JSON.stringify({
                    model: 'llama3.1:8b',
                    system: "You are a JSON generator for a news site. Return ONLY raw JSON. No markdown. No intro. No outro. Strictly valid JSON.",
                    prompt: `Refactor the technical news article. 
                            ARTICLE: ${initialDraft}
                            FEEDBACK: ${feedback}
                            
                            Required JSON format:
                            {
                                "title": "Headline",
                                "excerpt": "Short summary",
                                "contentHtml": "Full article with <h3> and <p> tags"
                            }`,
                    stream: false,
                    format: 'json'
                }),
            });
            const finalData = await finalResponse.json();

            let cleanResponse = finalData.response.trim();

            // 1. Remove Markdown code blocks
            if (cleanResponse.startsWith('```')) {
                cleanResponse = cleanResponse.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '');
            }

            try {
                return JSON.parse(cleanResponse);
            } catch (parseError) {
                console.warn('[AI Bridge] ⚠️ Standard parse failed. Attempting truncated JSON recovery...');

                // Truncated JSON recovery: If it ends abruptly, try to close the strings and object
                let repaired = cleanResponse;
                if (!repaired.endsWith('}')) {
                    // Count quotes to see if we need to close one
                    const quoteCount = (repaired.match(/"/g) || []).length;
                    if (quoteCount % 2 !== 0) repaired += '"';
                    repaired += '}';
                }

                try {
                    return JSON.parse(repaired);
                } catch (secondError) {
                    console.error('[AI Bridge] ❌ Failed to recover JSON. Raw output:', cleanResponse);
                    throw secondError;
                }
            }

        } catch (error) {
            console.error('[AI Bridge] Elite Workflow Error:', error);
            throw error;
        }
    }
}

module.exports = AIBridge;
