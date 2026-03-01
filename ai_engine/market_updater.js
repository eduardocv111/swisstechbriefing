const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

// 1. Database Setup
const url = process.env.DATABASE_URL || "file:./data/stb.db";
const dbRelativePath = url.startsWith("file:") ? url.replace("file:", "") : url;
const dbPath = path.resolve(__dirname, '..', dbRelativePath);

/**
 * Recovers the last successful snapshot from the DB for "Last Known Good" fallback.
 */
function getLastKnownGood() {
    try {
        const db = new Database(dbPath);
        const row = db.prepare("SELECT payload_json FROM market_snapshots ORDER BY id DESC LIMIT 1").get();
        db.close();
        if (row && row.payload_json) {
            return JSON.parse(row.payload_json);
        }
    } catch (e) {
        console.warn('[Market] ⚠️ Could not fetch LKG from DB:', e.message);
    }
    return null;
}

async function updateMarketData() {
    console.log('[Market] 📈 Initializing real-time update...');

    const lkg = getLastKnownGood();

    try {
        const symbols = ['QQQ', 'SPY', 'USDCHF=X', 'EURCHF=X'];
        console.log(`[Market] 📡 Fetching: ${symbols.join(', ')}...`);

        const results = await Promise.all(symbols.map(async (s) => {
            try {
                const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms));
                const q = await Promise.race([
                    yahooFinance.quote(s),
                    timeout(10000)
                ]);
                return q;
            } catch (e) {
                console.warn(`   ! Warning: Fetching ${s} failed (${e.message}). Falling back to LKG.`);
                return null;
            }
        }));

        const qqq = results.find(r => r && r.symbol === 'QQQ');
        const spy = results.find(r => r && r.symbol === 'SPY');
        const usdchf = results.find(r => r && r.symbol === 'USDCHF=X');
        const eurchf = results.find(r => r && r.symbol === 'EURCHF=X');

        // Construct snapshot with Fallback to LKG
        const snapshot = {
            fx: {
                usd_chf: usdchf?.regularMarketPrice || lkg?.fx?.usd_chf || 0.88,
                eur_chf: eurchf?.regularMarketPrice || lkg?.fx?.eur_chf || 0.94
            },
            markets: {
                qqq: {
                    price: qqq?.regularMarketPrice || lkg?.markets?.qqq?.price || 0.0,
                    change: qqq?.regularMarketChange || lkg?.markets?.qqq?.change || 0.0,
                    change_percent: qqq ? (qqq.regularMarketChangePercent?.toFixed(2) + "%") : (lkg?.markets?.qqq?.change_percent || "0.00%")
                },
                spy: {
                    price: spy?.regularMarketPrice || lkg?.markets?.spy?.price || 0.0,
                    change: spy?.regularMarketChange || lkg?.markets?.spy?.change || 0.0,
                    change_percent: spy ? (spy.regularMarketChangePercent?.toFixed(2) + "%") : (lkg?.markets?.spy?.change_percent || "0.00%")
                }
            }
        };

        const db = new Database(dbPath);
        const stmt = db.prepare("INSERT INTO market_snapshots (created_at, payload_json) VALUES (?, ?)");
        stmt.run(new Date().toISOString(), JSON.stringify(snapshot));
        db.close();

        console.log('✅ [Market] Local data synchronized (Live or Fallback used).');

        console.log('✅ [Market] Local data synchronized (Live or Fallback used).');

        // --- PRODUCTION SYNC ---
        console.log('[Market] 🌐 Synchronizing with Production (swisstechbriefing.ch)...');
        try {
            const syncResponse = await fetch('https://swisstechbriefing.ch/api/v1/ingest/market', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-ai-secret': process.env.AI_INGESTION_SECRET
                },
                body: JSON.stringify({ payload: snapshot })
            });

            if (!syncResponse.ok) {
                const errorText = await syncResponse.text();
                throw new Error(`Server responded with ${syncResponse.status}: ${errorText.substring(0, 100)}...`);
            }

            const syncResult = await syncResponse.json();
            if (syncResult.success) {
                console.log('✨ [Market] SYNC SUCCESSFUL!');
            } else {
                console.error('❌ [Market] Sync Failed:', syncResult.error);
            }
        } catch (syncError) {
            console.error('❌ [Market] Sync Error (likely Server Down):', syncError.message);
        }

    } catch (error) {
        console.error('❌ [Market] Error during update:', error.message);
    }
}

if (require.main === module) {
    updateMarketData();
}

module.exports = { updateMarketData };
