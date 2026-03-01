const axios = require('axios');
const cheerio = require('cheerio');
const cache = require('./cache');

/**
 * Extraction Engine for News Articles
 * Handles HTML fetching, redirection following, and semantic extraction.
 */
async function fetchAndExtract(url) {
    const cacheKey = `extract:${url}`;
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log(`[Research-Extractor] 🔋 Cache HIT for source: ${new URL(url).hostname}`);
        return cached;
    }

    const startTime = Date.now();
    const result = { ok: false, text: "", meta: {}, debug: { url, finalUrl: url, status: 0, contentType: "", ms: 0, reason: "", extractionMethod: "none" } };

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            timeout: 10000,
            maxRedirects: 5,
            validateStatus: (status) => status < 500
        });

        result.debug.status = response.status;
        result.debug.contentType = response.headers['content-type'] || "";
        result.debug.finalUrl = response.config.url || url;

        if (response.status !== 200) {
            result.debug.reason = `HTTP Status: ${response.status}`;
            return result;
        }

        if (!result.debug.contentType.includes('text/html')) {
            result.debug.reason = `Non-HTML Content: ${result.debug.contentType}`;
            return result;
        }

        const $ = cheerio.load(response.data);
        const metaDesc = $('meta[name="description"]').attr('content') || "";
        result.meta.description = metaDesc;

        // Cleanup
        $('script, style, nav, footer, ads, .ads, .sidebar, .comments, iframe, header, noscript, svg').remove();

        let extractedText = "";

        // 1. Try JSON-LD NewsArticle (Semantic Extraction)
        let jsonLdContent = "";
        $('script[type="application/ld+json"]').each((i, el) => {
            try {
                const json = JSON.parse($(el).html());
                if (json['@type'] === 'NewsArticle' || json['@type'] === 'Article') {
                    jsonLdContent = json.articleBody || json.description || "";
                }
            } catch (e) { }
        });

        if (jsonLdContent && jsonLdContent.length > 500) {
            extractedText = jsonLdContent;
            result.debug.extractionMethod = "json-ld";
        } else {
            // 2. Try Semantic Tags
            let contentParts = [];
            $('article p, main p, section p, .article-content p, .story p, .content p').each((i, el) => {
                const text = $(el).text().trim();
                if (text.length > 50) contentParts.push(text);
            });

            if (contentParts.length === 0) {
                // 3. Fallback to all long paragraphs
                $('p').each((i, el) => {
                    const text = $(el).text().trim();
                    if (text.length > 80) contentParts.push(text);
                });
                result.debug.extractionMethod = "p-general";
            } else {
                result.debug.extractionMethod = "p-semantic";
            }
            extractedText = contentParts.join('\n\n');
        }

        // 4. Paywall detection (Simplified)
        const paywallKeywords = ['premium', 'paywall', 'abo+', 'registrieren', 'subscribe', 'anmelden'];
        const textLower = extractedText.toLowerCase();
        const hasPaywallHints = paywallKeywords.some(kw => textLower.includes(kw));

        // Low text-to-code indicator or paywall hint
        if (extractedText.length < 500 && hasPaywallHints) {
            result.debug.reason = "paywall_detected";
            extractedText = metaDesc; // Fallback to meta if paywalled
        }

        if (extractedText.length > 200) {
            result.ok = true;
            result.text = extractedText.substring(0, 8000); // Guard total length
        } else {
            result.debug.reason = "insufficient_text";
        }

    } catch (error) {
        result.debug.reason = `Connection Error: ${error.message}`;
    } finally {
        result.debug.ms = Date.now() - startTime;
        if (result.ok) {
            cache.set(cacheKey, result, 24 * 3600); // Core content cache: 24h
        }
    }

    return result;
}

module.exports = { fetchAndExtract };
