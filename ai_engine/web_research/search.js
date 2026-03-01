const axios = require('axios');
const cache = require('./cache');

/**
 * Google Custom Search Engine Client
 * Handles news title to search results mapping
 */
async function searchGoogleCSE(query) {
    const apiKey = process.env.GOOGLE_CSE_API_KEY;
    const cseId = process.env.GOOGLE_CSE_ID;

    if (!apiKey || !cseId) {
        throw new Error("GOOGLE_CSE_API_KEY or GOOGLE_CSE_ID not set in env.");
    }

    const cacheKey = `search:${query.toLowerCase().trim()}`;
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log(`[Research-Search] 🔋 Cache HIT: ${query}`);
        return cached;
    }

    try {
        const url = 'https://www.googleapis.com/customsearch/v1';
        const response = await axios.get(url, {
            params: {
                key: apiKey,
                cx: cseId,
                q: query,
                num: 8,
                hl: 'de',
                gl: 'ch'
            },
            timeout: 5000
        });

        const items = response.data.items || [];
        const results = items.map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet,
            displayLink: item.displayLink
        }));

        // Cache for 6 hours
        cache.set(cacheKey, results, 6 * 3600);
        return results;

    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error(`[Research-Search] 🛑 Quota exceeded for Google CSE.`);
            throw new Error("rate_limited");
        }
        console.error(`[Research-Search] ❌ Error in CSE Search for "${query}": ${error.message}`);
        return [];
    }
}

module.exports = { searchGoogleCSE };
