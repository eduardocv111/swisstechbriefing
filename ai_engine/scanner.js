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
        query: 'Finma+Regulierung+Schweiz+Blockchain',
    },
    'Defense Tech': {
        label: 'Defense Tech',
        query: 'Defense+Tech+Switzerland+Cybersecurity+Ruag',
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
            // Google News RSS URL for Switzerland in German
            const url = `https://news.google.com/rss/search?q=${cat.query}+when:24h&hl=de-CH&gl=CH&ceid=CH:de`;

            console.log(`Scanning category: ${cat.label}...`);
            const feed = await parser.parseURL(url);

            // Limit to top 3 fresh news per category
            results[key] = feed.items.slice(0, 3).map(item => ({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                source: item.source,
                category: cat.label
            }));

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
