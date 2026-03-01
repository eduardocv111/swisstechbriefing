const axios = require('axios');
const cheerio = require('cheerio');
const Parser = require('rss-parser');
const { resolveGoogleNewsToPublisher } = require('./urlResolver');
const { researchFromTitle } = require('./web_research');

const parser = new Parser();

/**
 * Professional Researcher Agent 3.0 (Agentic Search Edition)
 */
class Researcher {
    constructor() {
        this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    }

    async searchRelatedContext(topic) {
        try {
            const cleanTopic = (topic ?? "").toString().split(' - ')[0];
            const executeSearch = async (q) => {
                const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=de-CH&gl=CH&ceid=CH:de`;
                console.log(`[Researcher] 📡 Searching related: ${url}`);
                const feed = await parser.parseURL(url);
                return feed.items;
            };

            let items = await executeSearch(cleanTopic);

            // Fallback: If no results, try a broader search with just the first 5 words
            if (items.length === 0) {
                const broadTopic = cleanTopic.split(/\s+/).slice(0, 5).join(' ');
                console.log(`[Researcher] ⚠️ No results for full title. Broadening query to: "${broadTopic}"`);
                items = await executeSearch(broadTopic);
            }

            console.log(`[Researcher] ⚡ Found ${items.length} related links.`);
            return items.slice(0, 15).map(item => item.link);
        } catch (error) {
            console.error('[Researcher] ⚠️ Search failed:', error.message);
            return [];
        }
    }

    async scrapeUrl(url) {
        if (url.includes('google.com')) return null; // Nunca scrapear google directamente

        try {
            console.log(`[Researcher] 📥 Scrape attempt: ${url.substring(0, 70)}...`);
            const articleResponse = await axios.get(url, {
                headers: {
                    'User-Agent': this.userAgent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Referer': 'https://www.google.com/'
                },
                timeout: 10000
            });

            const contentType = articleResponse.headers['content-type'] || '';
            if (!contentType.includes('text/html')) {
                console.warn(`[Researcher] ⚠️ Skipping non-HTML content: ${contentType} from ${url}`);
                return null;
            }

            const $ = cheerio.load(articleResponse.data);
            $('script, style, nav, footer, ads, .ads, .sidebar, .comments, iframe, header, noscript, svg').remove();

            let contentParts = [];
            $('article p, main p, section p, .article-content p, .story p, .content p').each((i, el) => {
                const text = $(el).text().trim();
                if (text.length > 50) contentParts.push(text);
            });

            if (contentParts.length === 0) {
                $('p').each((i, el) => {
                    const text = $(el).text().trim();
                    if (text.length > 60) contentParts.push(text);
                });
            }

            const cleanText = contentParts.join('\n\n');
            console.log(`[Researcher] ✅ Scraped ${cleanText.length} chars from ${new URL(url).hostname}`);
            return cleanText;
        } catch (e) {
            console.error(`[Researcher] ❌ Scrape failed for ${url.substring(0, 50)}: ${e.message}`);
            return null;
        }
    }

    async deepResearch(mainUrl, topic = "") {
        console.log(`[Researcher] 🛡️ Starting Elite Multi-Source Investigation...`);
        const searchTopic = topic || "Swiss Tech News";

        // --- NEW: GOOGLE CSE ELITE TIER ---
        if (process.env.GOOGLE_CSE_API_KEY && process.env.GOOGLE_CSE_ID) {
            try {
                console.log(`[Researcher] 🚀 Pivoting to Elite Web Search (Google CSE)...`);
                const cseResult = await researchFromTitle(searchTopic);
                if (cseResult.ok && cseResult.bundleText.length > 1200) {
                    return {
                        rawText: cseResult.bundleText,
                        sourceUrl: cseResult.sources[0] || mainUrl,
                        success: true,
                        sourceCount: cseResult.stats.sourcesExtracted
                    };
                }
                console.warn(`[Researcher] ⚠️ Elite Search insufficient (${cseResult.reason}). Falling back to RSS/Scrape...`);
            } catch (e) {
                console.error(`[Researcher] ❌ Elite Search Error: ${e.message}`);
            }
        }

        const results = [];
        let finalMainUrl = mainUrl;

        // 1. Intentar resolver la fuente principal (Google News Link)
        try {
            const resolution = await resolveGoogleNewsToPublisher(mainUrl);
            if (resolution.ok) {
                finalMainUrl = resolution.url;
                console.log(`[Researcher] 💎 Main source resolved: ${finalMainUrl}`);
                const mainText = await this.scrapeUrl(finalMainUrl);
                if (mainText && mainText.length > 500) {
                    results.push(`SOURCE_MASTER (${new URL(finalMainUrl).hostname}):\n${mainText.substring(0, 6000)}`);
                }
            } else {
                console.warn(`[Researcher] ⚠️ Main resolution failed: ${resolution.reason}. Pivoting to full search mode...`);
            }
        } catch (e) {
            console.error(`[Researcher] ❌ Critical error resolving main source: ${e.message}`);
        }

        // 2. AGENTIC SEARCH: Si no hay suficiente contenido, buscar agresivamente en los resultados relacionados
        // (Similar a como ChatGPT busca en la web)
        console.log(`[Researcher] 🔍 Agentic Search: Investigating "${searchTopic}" across multiple portals...`);
        const extraLinks = await this.searchRelatedContext(searchTopic);

        if (extraLinks.length === 0) {
            console.warn(`[Researcher] ⚠️ No search results found for the topic.`);
        }

        for (const link of extraLinks) {
            // Buscamos tener al menos 6000 caracteres de contexto total
            const currentTotalLength = results.reduce((acc, curr) => acc + curr.length, 0);
            if (results.length >= 5 || currentTotalLength > 8000) break;

            try {
                const resExtra = await resolveGoogleNewsToPublisher(link);
                if (resExtra.ok) {
                    // Evitar scrapear dos veces la misma si ya la tenemos
                    const hostname = new URL(resExtra.url).hostname;
                    if (results.some(r => r.includes(hostname))) continue;

                    console.log(`[Researcher] 📖 Extracting from: ${hostname}...`);
                    const extraText = await this.scrapeUrl(resExtra.url);
                    if (extraText && extraText.length > 300) {
                        results.push(`SOURCE_ALTERNATE (${hostname}):\n${extraText.substring(0, 4000)}`);
                    }
                }
            } catch (e) {
                // Silently continue to next link
            }
        }

        // 3. Evaluación final de "Suficiencia"
        const finalCombinedText = results.join('\n\n' + '='.repeat(30) + '\n\n');

        if (results.length === 0 || finalCombinedText.length < 800) {
            console.error(`[Researcher] ❌ Investigation failed: found only ${finalCombinedText.length} chars from ${results.length} sources.`);
            return {
                success: false,
                error: 'insufficient_content',
                reason: results.length === 0 ? "No sources could be scraped" : "Content too thin for elite editorial"
            };
        }

        console.log(`[Researcher] ✅ Multi-Source Success: Compiled ${finalCombinedText.length} chars from ${results.length} different perspectives.`);

        return {
            rawText: finalCombinedText,
            sourceUrl: finalMainUrl,
            success: true,
            sourceCount: results.length
        };
    }
}

module.exports = new Researcher();
