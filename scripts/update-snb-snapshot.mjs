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
 * Get the most recent valid snapshot from the database for "Last Known Good" fallback.
 * Scans backwards to find the last known real value.
 */
function getLastKnownGood() {
    try {
        const rows = db.prepare("SELECT payload_json FROM snb_snapshots ORDER BY id DESC LIMIT 10").all();

        for (const row of rows) {
            const payload = JSON.parse(row.payload_json);

            // New schema check
            if (payload.policy_rate?.value !== undefined && payload.policy_rate?.value !== null) {
                return {
                    value: payload.policy_rate.value,
                    asof: payload.policy_rate.asof
                };
            }

            // Legacy schema check
            if (payload.series?.SNB_POLICY_RATE?.value !== undefined && payload.series?.SNB_POLICY_RATE?.value !== null) {
                return {
                    value: payload.series.SNB_POLICY_RATE.value,
                    asof: payload.series.SNB_POLICY_RATE.date || payload.series.SNB_POLICY_RATE.asof
                };
            }

            // If new schema but value is null, check its stored last_good_value
            if (payload.policy_rate?.last_good_value !== undefined && payload.policy_rate?.last_good_value !== null) {
                return {
                    value: payload.policy_rate.last_good_value,
                    asof: payload.policy_rate.last_good_asof
                };
            }
        }
        return { value: null, asof: null };
    } catch (e) {
        return { value: null, asof: null };
    }
}

/**
 * Layer 1: SNB Data Portal API
 */
async function getPolicyRateFromAPI() {
    try {
        const r = await fetch("https://data.snb.ch/api/cube/snbzp/data/json/en?selection=B5", { signal: AbortSignal.timeout(5000) });
        if (r.ok) {
            const d = await r.json();
            if (d.timeseries && d.timeseries[0]?.observations) {
                const latest = d.timeseries[0].observations.sort((a, b) => b.date.localeCompare(a.date))[0];
                if (latest.value && latest.value !== ".") {
                    return { value: parseFloat(latest.value), asof: latest.date, source: "SNB API" };
                }
            }
        }
    } catch (e) { /* silent */ }
    return null;
}

/**
 * Layer 2: Scrape SNB Website Home Page
 */
async function getPolicyRateFromScrape() {
    try {
        const r = await fetch("https://www.snb.ch/en", { signal: AbortSignal.timeout(5000) });
        if (!r.ok) return null;
        const text = await r.text();
        const patterns = [
            /SNB policy rate.*?h-typo-t3">([\d\.]+)%/s,
            /SNB policy rate.*?<span>([\d\.]+)%/s,
            /Policy rate.*?([\d\.]+)%/s
        ];
        for (const p of patterns) {
            const match = text.match(p);
            // We ignore "0.00" only if we suspect it's a placeholder, 
            // but SNB rate hasn't been 0.00 for a while.
            if (match && match[1] && match[1] !== "0.00") {
                return {
                    value: parseFloat(match[1]),
                    asof: new Date().toISOString().split('T')[0],
                    source: "SNB Web"
                };
            }
        }
    } catch (e) { /* silent */ }
    return null;
}

/**
 * Layer 3: FRED API Fallback
 */
async function getPolicyRateFromFred() {
    const FRED_API_KEY = process.env.FRED_API_KEY;
    if (!FRED_API_KEY) return null;

    // We try two common series IDs for Swiss policy/interest rates
    const seriesIds = ["INTDSRCHM193N", "IRSTCB01CHM156N"];

    for (const sid of seriesIds) {
        try {
            const r = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${sid}&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`, { signal: AbortSignal.timeout(5000) });
            if (r.ok) {
                const d = await r.json();
                const obs = d.observations?.[0];
                if (obs && obs.value !== "." && obs.value !== "") {
                    return { value: parseFloat(obs.value), asof: obs.date, source: "FRED" };
                }
            }
        } catch (e) { /* next */ }
    }
    return null;
}

/**
 * Fetch FX from Frankfurter (USD/CHF, EUR/CHF)
 */
async function getFxRates() {
    try {
        const r = await fetch("https://api.frankfurter.app/latest?from=CHF&to=USD,EUR", { signal: AbortSignal.timeout(5000) });
        if (r.ok) {
            const d = await r.json();
            return {
                usd_chf: d.rates.USD ? parseFloat((1 / d.rates.USD).toFixed(4)) : null,
                eur_chf: d.rates.EUR ? parseFloat((1 / d.rates.EUR).toFixed(4)) : null,
                asof: d.date,
                source: "frankfurter.app"
            };
        }
    } catch (e) { /* silent */ }
    return null;
}

async function run() {
    console.log("--- SNB Macro Intelligence Layer ---");

    const lkg = getLastKnownGood();

    // Attempt to get current policy rate
    let policy = await getPolicyRateFromAPI();
    if (!policy) policy = await getPolicyRateFromScrape();
    if (!policy) policy = await getPolicyRateFromFred();

    const result = {
        created_at: new Date().toISOString(),
        policy_rate: {
            value: null,
            asof: null,
            source: null,
            status: "unavailable",
            reason: null,
            last_good_value: lkg.value,
            last_good_asof: lkg.asof
        },
        fx: {
            usd_chf: null,
            eur_chf: null,
            asof: null,
            source: "frankfurter.app"
        }
    };

    // Populate Policy Rate
    if (policy) {
        result.policy_rate.value = policy.value;
        result.policy_rate.asof = policy.asof;
        result.policy_rate.source = policy.source;
        result.policy_rate.status = "ok";
        result.policy_rate.last_good_value = policy.value;
        result.policy_rate.last_good_asof = policy.asof;
        console.log(`SNB policy rate: OK via ${policy.source} (${policy.value}%)`);
    } else {
        result.policy_rate.reason = "All live data sources failed. SNB Portal, Website Scrape, and FRED did not return valid results.";
        const displayLkg = result.policy_rate.last_good_value !== null ? `${result.policy_rate.last_good_value}%` : "NONE";
        console.log(`SNB policy rate: UNAVAILABLE (using last known good ${displayLkg})`);
    }

    // Populate FX
    const fx = await getFxRates();
    if (fx) {
        result.fx.usd_chf = fx.usd_chf;
        result.fx.eur_chf = fx.eur_chf;
        result.fx.asof = fx.asof;
        console.log(`FX Rates: Updated via ${fx.source} (USD/CHF: ${fx.usd_chf})`);
    } else {
        console.log("FX Rates: Connection failed.");
    }

    // Save to Database
    try {
        const stmt = db.prepare("INSERT INTO snb_snapshots (created_at, payload_json) VALUES (?, ?)");
        stmt.run(result.created_at, JSON.stringify(result));
        console.log("SNB snapshot saved successfully.");
    } catch (err) {
        console.error("Database error:", err);
    } finally {
        db.close();
    }
}

run();
