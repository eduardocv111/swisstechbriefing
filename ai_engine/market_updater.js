const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance();
const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

// 1. Database Setup
const url = process.env.DATABASE_URL || "file:./data/stb.db";
const dbRelativePath = url.startsWith("file:") ? url.replace("file:", "") : url;
const dbPath = path.resolve(__dirname, '..', dbRelativePath);

async function updateMarketData() {
    console.log('[Market] 📈 Initializing real-time update...');

    try {
        const symbols = ['QQQ', 'SPY', 'USDCHF=X', 'EURCHF=X'];
        console.log(`[Market] 📡 Fetching: ${symbols.join(', ')}...`);

        const results = await Promise.all(symbols.map(async (s) => {
            try {
                const q = await yahooFinance.quote(s);
                return q;
            } catch (e) {
                console.error(`   ! Error fetching ${s}:`, e.message);
                return null;
            }
        }));

        const qqq = results.find(r => r && r.symbol === 'QQQ');
        const spy = results.find(r => r && r.symbol === 'SPY');
        const usdchf = results.find(r => r && r.symbol === 'USDCHF=X');
        const eurchf = results.find(r => r && r.symbol === 'EURCHF=X');

        if (!qqq || !spy || !usdchf || !eurchf) {
            throw new Error('Some market data failed to fetch.');
        }

        const snapshot = {
            fx: {
                usd_chf: usdchf.regularMarketPrice,
                eur_chf: eurchf.regularMarketPrice
            },
            markets: {
                qqq: {
                    price: qqq.regularMarketPrice,
                    change: qqq.regularMarketChange,
                    change_percent: (qqq.regularMarketChangePercent?.toFixed(2) || "0.00") + "%"
                },
                spy: {
                    price: spy.regularMarketPrice,
                    change: spy.regularMarketChange,
                    change_percent: (spy.regularMarketChangePercent?.toFixed(2) || "0.00") + "%"
                }
            }
        };

        const db = new Database(dbPath);
        const stmt = db.prepare("INSERT INTO market_snapshots (created_at, payload_json) VALUES (?, ?)");
        stmt.run(new Date().toISOString(), JSON.stringify(snapshot));
        db.close();

        console.log('✅ [Market] Local data synchronized.');

        // --- PRODUCTION SYNC ---
        console.log('[Market] 🌐 Synchronizing with Production (swisstechbriefing.ch)...');
        try {
            const syncResponse = await fetch('https://swisstechbriefing.ch/api/v1/ingest/market', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-ai-secret': 'SwissTech_AI_Secret_2026_!#'
                },
                body: JSON.stringify({ payload: snapshot })
            });

            const syncResult = await syncResponse.json();
            if (syncResult.success) {
                console.log('✨ [Market] SYNC SUCCESSFUL!');
            } else {
                console.error('❌ [Market] Sync Failed:', syncResult.error);
            }
        } catch (syncError) {
            console.error('❌ [Market] Network Error during Sync:', syncError.message);
        }

    } catch (error) {
        console.error('❌ [Market] Error during update:', error.message);
    }
}

if (require.main === module) {
    updateMarketData();
}

module.exports = { updateMarketData };
