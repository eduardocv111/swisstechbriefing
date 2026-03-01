const axios = require('axios');
const cheerio = require('cheerio');
const Parser = require('rss-parser');
const { resolveGoogleNewsToPublisher } = require('./urlResolver');

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
            const query = encodeURIComponent((topic ?? "").toString().split(' - ')[0]);
            const url = `https://news.google.com/rss/search?q=${query}&hl=de-CH&gl=CH&ceid=CH:de`;
            console.log(`[Researcher] 📡 Searching related: ${url}`);

            const feed = await parser.parseURL(url);
            console.log(`[Researcher] ⚡ Found ${feed.items.length} related links.`);
            return feed.items.slice(0, 8).map(item => item.link);
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

        const results = [];
        let finalMainUrl = mainUrl;

        // 1. Resolver fuente principal
        const resolution = await resolveGoogleNewsToPublisher(mainUrl);
        if (resolution.ok) {
            finalMainUrl = resolution.url;
            console.log(`[Researcher] 💎 Main source resolved: ${finalMainUrl}`);
            const mainText = await this.scrapeUrl(finalMainUrl);
            if (mainText && mainText.length > 200) {
                results.push(`SOURCE_MASTER: ${finalMainUrl}\nCONTENT:\n${mainText.substring(0, 6000)}`);
            }
        } else {
            console.warn(`[Researcher] ⚠️ Main resolution failed: ${resolution.reason}`);
        }

        // 2. BÚSQUEDA DE CONTEXTO
        const searchTopic = topic || "Swiss Tech News";
        const extraLinks = await this.searchRelatedContext(searchTopic);

        for (const link of extraLinks) {
            if (results.length >= 3) break;

            const resExtra = await resolveGoogleNewsToPublisher(link);
            if (resExtra.ok && resExtra.url !== finalMainUrl) {
                console.log(`[Researcher] 📖 Resolved extra: ${resExtra.url}`);
                const extraText = await this.scrapeUrl(resExtra.url);
                if (extraText && extraText.length > 300) {
                    results.push(`SOURCE_CONTEXT: ${resExtra.url}\nCONTENT:\n${extraText.substring(0, 3500)}`);
                }
            }
        }

        if (results.length === 0) {
            return { success: false, error: 'insufficient_content', reason: "No content from any source" };
        }

        const combinedText = results.join('\n\n' + '='.repeat(30) + '\n\n');
        return {
            rawText: combinedText,
            sourceUrl: finalMainUrl,
            success: true,
            sourceCount: results.length
        };
    }
}

module.exports = new Researcher();
