const Parser = require('rss-parser');
const parser = new Parser();

/**
 * Categories based on SwissTech Briefing editorial focus
 */
const CATEGORIES = {
    KI: {
        label: 'KI',
        query: 'Künstliche+Intelligenz+Schweiz',
    },
    Startups: {
        label: 'Startups',
        query: 'Startups+Schweiz+Venture+Capital',
    },
    Regulierung: {
        label: 'Regulierung',
        query: 'Schweiz+Regulierung+Finma+Gesetz+Finanzplatz+Datenschutz',
    },
    'Defense Tech': {
        label: 'Defense Tech',
        query: 'Cybersecurity+Switzerland+Defense+Tech+Digital+Sovereignty+NATO+Swiss',
    },
    'Space Tech': {
        label: 'Space Tech',
        query: 'Aerospace+Switzerland+ETH+Innovation+Satellite+Communication',
    },
    'Discovery': {
        label: 'Space & Discovery',
        query: 'Quantum+Computing+Switzerland+ETH+EPFL+Scientific+Discovery+Innovation',
    }
};

/**
 * Trend Scanner: Fetches the latest news from Google News RSS for each category
 */
async function scanTrends() {
    console.log('--- Starting SwissTech Trend Scanner ---');
    const results = {};

    for (const [key, cat] of Object.entries(CATEGORIES)) {
        try {
            // 🛡️ Pass 1: 24-hour window (Freshness)
            let url = `https://news.google.com/rss/search?q=${cat.query}+when:24h&hl=de-CH&gl=CH&ceid=CH:de`;
            console.log(`Scanning category: ${cat.label}... (24h)`);
            let feed = await parser.parseURL(url);

            // 🛡️ Pass 2: Fallback to 7-day window if nothing found
            if (!feed.items || feed.items.length === 0) {
                console.log(`⚠️ Nothing fresh for ${cat.label}. Broadening to 7 days...`);
                url = `https://news.google.com/rss/search?q=${cat.query}+when:7d&hl=de-CH&gl=CH&ceid=CH:de`;
                feed = await parser.parseURL(url);
            }

            // 🛡️ Pass 3: Ultimate Fallback to 30 days for niche categories
            if (!feed.items || feed.items.length === 0) {
                console.log(`⚠️ Still nothing for ${cat.label}. Extreme broadening to 30 days...`);
                url = `https://news.google.com/rss/search?q=${cat.query}+when:30d&hl=de-CH&gl=CH&ceid=CH:de`;
                feed = await parser.parseURL(url);
            }

            // Results Mapping
            results[key] = feed.items.slice(0, 10).map(item => {
                const title = (item.title || item.headline || "").toString().trim();
                const link = (item.link || item.url || "").toString().trim();
                const source = typeof item.source === 'object' ? (item.source.name || "") : (item.source || "");

                return {
                    title: title,
                    link: link,
                    pubDate: (item.pubDate ?? "").toString(),
                    source: source.toString().trim(),
                    category: cat.label
                };
            }).filter(news => news.title && news.link);

            console.log(`Found ${results[key].length} new headlines for ${cat.label}.`);
        } catch (error) {
            console.error(`Error scanning ${cat.label}:`, error.message);
            results[key] = [];
        }
    }

    return results;
}

// If run directly
if (require.main === module) {
    scanTrends().then(data => {
        console.log('\n--- DAILY TREND REPORT ---');
        Object.entries(data).forEach(([cat, news]) => {
            console.log(`\n[${cat.toUpperCase()}]`);
            news.forEach((n, i) => {
                console.log(`${i + 1}. ${n.title}`);
                console.log(`   Source: ${n.source}`);
            });
        });
    });
}

module.exports = { scanTrends };
