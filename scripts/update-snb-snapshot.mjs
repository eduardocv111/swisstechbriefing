import "dotenv/config";
import Database from "better-sqlite3";
import path from "path";

// 1. Database Setup
const url = process.env.DATABASE_URL || "file:./data/stb.db";
const dbPath = url.startsWith("file:") ? url.replace("file:", "") : url;
const resolvedPath = path.isAbsolute(dbPath) ? dbPath : path.resolve(process.cwd(), dbPath);

const db = new Database(resolvedPath);

// 2. Create Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS snb_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    payload_json TEXT NOT NULL
  )
`).run();

/**
 * Robust fetch for SNB Policy Rate from different potential sources
 */
async function getPolicyRate() {
    // Source A: SNB Data Portal API
    try {
        const r = await fetch("https://data.snb.ch/api/cube/snbzp/data/json/en?selection=B5");
        if (r.ok) {
            const d = await r.json();
            if (d.timeseries && d.timeseries[0]?.observations) {
                const latest = d.timeseries[0].observations.sort((a, b) => b.date.localeCompare(a.date))[0];
                return { value: parseFloat(latest.value), date: latest.date, source: "SNB API" };
            }
        }
    } catch (e) { /* silent */ }

    // Source B: Scraping SNB Home Page (Fallback)
    try {
        const r = await fetch("https://www.snb.ch/en");
        if (r.ok) {
            const text = await r.text();
            // Look for the rate near various labels
            const patterns = [
                /SNB policy rate.*?h-typo-t3">([\d\.]+)%/s,
                /SNB policy rate.*?<span>([\d\.]+)%/s,
                /Policy rate.*?([\d\.]+)%/s
            ];

            for (const p of patterns) {
                const match = text.match(p);
                if (match && match[1] && match[1] !== "0.00") {
                    return { value: parseFloat(match[1]), date: new Date().toISOString().split('T')[0], source: "SNB Website Scrape" };
                }
            }
        }
    } catch (e) { /* silent */ }

    // Source C: FRED API (Last resort for real-ish data)
    const FRED_API_KEY = process.env.FRED_API_KEY;
    if (FRED_API_KEY) {
        try {
            // Trying common Swiss interest rate series (INTDSRCHM193N or IRSTCB01CHM156N)
            const r = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=INTDSRCHM193N&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`);
            if (r.ok) {
                const d = await r.json();
                const obs = d.observations?.[0];
                if (obs && obs.value !== ".") {
                    return { value: parseFloat(obs.value), date: obs.date, source: "FRED API" };
                }
            }
        } catch (e) { /* silent */ }
    }

    // Final Placeholder if all failed (to avoid empty DB)
    return { value: 1.00, date: new Date().toISOString().split('T')[0], source: "Fallback Default (Check Manually)" };
}

/**
 * Fetch FX from Frankfurter (USD/CHF, EUR/CHF)
 */
async function getFxRates() {
    try {
        const r = await fetch("https://api.frankfurter.app/latest?from=CHF&to=USD,EUR");
        if (r.ok) {
            const d = await r.json();
            return {
                // Convert CHF-base to Target-base
                usd_chf: d.rates.USD ? (1 / d.rates.USD) : null,
                eur_chf: d.rates.EUR ? (1 / d.rates.EUR) : null,
                date: d.date,
                source: "Frankfurter API"
            };
        }
    } catch (e) { /* silent */ }
    return null;
}

async function run() {
    console.log("--- SNB & Swiss Macro Robust Update ---");

    const snapshot = {
        created_at: new Date().toISOString(),
        series: {},
        source: "Multi-Source Robust"
    };

    // 1. Policy Rate
    console.log("Fetching Policy Rate...");
    const policy = await getPolicyRate();
    snapshot.series["SNB_POLICY_RATE"] = {
        label: "SNB Policy Rate",
        value: policy.value,
        date: policy.date,
        unit: "%",
        source: policy.source
    };

    // 2. FX Rates
    console.log("Fetching FX Rates (Frankfurter)...");
    const fx = await getFxRates();
    if (fx) {
        if (fx.usd_chf) snapshot.series["USD_CHF"] = { label: "USD/CHF", value: parseFloat(fx.usd_chf.toFixed(4)), date: fx.date, unit: "CHF", source: fx.source };
        if (fx.eur_chf) snapshot.series["EUR_CHF"] = { label: "EUR/CHF", value: parseFloat(fx.eur_chf.toFixed(4)), date: fx.date, unit: "CHF", source: fx.source };
    }

    // 3. Persistence
    try {
        const stmt = db.prepare("INSERT INTO snb_snapshots (created_at, payload_json) VALUES (?, ?)");
        stmt.run(snapshot.created_at, JSON.stringify(snapshot));
        console.log("SNB snapshot saved successfully.");
        console.log("Payload Sample:", JSON.stringify(snapshot.series, null, 2));
    } catch (err) {
        console.error("Database error:", err);
    } finally {
        db.close();
    }
}

run();
