const { searchGoogleCSE } = require('./search');
const { fetchAndExtract } = require('./extractor');

/**
 * Main Orchestrator for Web Research Tier
 */
async function researchFromTitle(title) {
    const startTime = Date.now();
    const stats = { totalMs: 0, resultsFound: 0, urlsFetched: 0, sourcesExtracted: 0, bundleChars: 0 };
    const researchBundle = [];
    const sources = [];

    try {
        console.log(`[Elite-Research] 🕵️ Starting Elite Tier Research for: "${title}"`);

        // 1. Search Google CSE
        const initialResults = await searchGoogleCSE(title);
        stats.resultsFound = initialResults.length;

        if (initialResults.length === 0) {
            return { ok: false, reason: "No search results returned by Google CSE.", stats };
        }

        // 2. Ranking / Deduplication / Filtering (Simple Hostname Filtering)
        const hostnamesSeen = new Set();
        const topCandidates = [];
        for (const item of initialResults) {
            const urlObj = new URL(item.link);
            const hostname = urlObj.hostname;
            if (hostnamesSeen.has(hostname)) continue; // One per source
            if (hostname.includes('facebook') || hostname.includes('twitter') || hostname.includes('linkedin')) continue;

            hostnamesSeen.add(hostname);
            topCandidates.push(item);
            if (topCandidates.length >= 5) break; // Limit to top 5
        }

        // 3. Dual Concurrency Fetch & Extract
        const fetchTasks = topCandidates.map(c => () => fetchAndExtract(c.link));
        const results = [];

        // Processing in batches of 2 (Concurrency Control)
        for (let i = 0; i < fetchTasks.length; i += 2) {
            const batch = fetchTasks.slice(i, i + 2).map(task => task());
            const batchResults = await Promise.all(batch);
            results.push(...batchResults);
        }

        stats.urlsFetched = results.length;

        // 4. Bundle Results
        for (let i = 0; i < results.length; i++) {
            const extract = results[i];
            const candidateInfo = topCandidates[i];

            if (extract.ok && extract.text.length > 300) {
                const sourceBlock = `--- SOURCE: ${candidateInfo.title} (${candidateInfo.link}) ---
CONTENT_EXTRACT:
${extract.text.substring(0, 5000)}
--- END_SOURCE ---`;

                researchBundle.push(sourceBlock);
                sources.push(candidateInfo.link);
                stats.sourcesExtracted++;
            } else {
                console.warn(`[Elite-Research] ⚠️ Source Rejected: ${candidateInfo.displayLink} | Reason: ${extract.debug.reason}`);
            }
        }

        const bundleText = researchBundle.join('\n\n' + '='.repeat(10) + '\n\n');
        stats.bundleChars = bundleText.length;
        stats.totalMs = Date.now() - startTime;

        // Structured Result Logging
        console.log(`[Elite-Research] ✨ Phase Complete:`, stats);

        if (stats.sourcesExtracted < 1 || stats.bundleChars < 800) {
            return { ok: false, reason: "insufficient_content_extracted", stats };
        }

        return { ok: true, sources, bundleText, stats };

    } catch (error) {
        return { ok: false, reason: error.message, stats };
    }
}

module.exports = { researchFromTitle };
