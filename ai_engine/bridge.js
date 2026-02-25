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

    static async generateArticle(topic) {
        // This will connect to Ollama via local API
        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                body: JSON.stringify({
                    model: 'llama3.1:8b',
                    prompt: `Write a professional Swiss tech news article about: ${topic}. 
                            Language: German. 
                            Format: JSON with title, excerpt, and contentHtml fields. 
                            Style: Premium, editorial, authoritative.`,
                    stream: false,
                    format: 'json'
                }),
            });
            const data = await response.json();
            return JSON.parse(data.response);
        } catch (error) {
            console.error('[AI Bridge] Ollama Error:', error);
            throw error;
        }
    }
}

module.exports = AIBridge;
