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

            // Current schema check
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

            // Stored LKG check
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
 * Fetch SNB Policy Rate from Official SNB Data Portal API (Cube snboffzisa)
 */
async function fetchPolicyRate() {
    const url = "https://data.snb.ch/api/cube/snboffzisa/data/json/de";
    try {
        const r = await fetch(url);
        if (!r.ok) return { error: `HTTP ${r.status}` };

        const data = await r.json();
        const ts = data.timeseries?.[0];

        if (!ts || !ts.values || ts.values.length === 0) {
            return { error: "No timeseries values found in API response" };
        }

        const last = ts.values.at(-1);
        return {
            value: last.value,
            asof: last.date,
            source: "SNB Data Portal (cube snboffzisa)",
            status: "ok"
        };
    } catch (e) {
        return { error: e.message };
    }
}

/**
 * Fetch FX Rates from Frankfurter API (USD/CHF, EUR/CHF)
 */
async function fetchFxRates() {
    try {
        const r = await fetch("https://api.frankfurter.app/latest?from=CHF&to=USD,EUR");
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
    console.log("--- SNB Official Data Portal Update ---");

    // Get LKG for fallback
    const lkg = getLastKnownGood();

    // 1. Policy Rate Update
    const policyResult = await fetchPolicyRate();

    const snapshot = {
        created_at: new Date().toISOString(),
        policy_rate: {
            label: "SNB-Leitzins",
            value: null,
            asof: null,
            source: "SNB Data Portal (cube snboffzisa)",
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

    if (policyResult.status === "ok") {
        snapshot.policy_rate.value = policyResult.value;
        snapshot.policy_rate.asof = policyResult.asof;
        snapshot.policy_rate.status = "ok";
        snapshot.policy_rate.last_good_value = policyResult.value;
        snapshot.policy_rate.last_good_asof = policyResult.asof;
        console.log(`SNB policy rate: OK (${policyResult.value}%)`);
    } else {
        snapshot.policy_rate.reason = policyResult.error;
        const lkgDisplay = lkg.value !== null ? `${lkg.value}%` : "NONE";
        console.log(`SNB policy rate: UNAVAILABLE (${policyResult.error}) - using LKG: ${lkgDisplay}`);
    }

    // 2. FX Update
    const fx = await fetchFxRates();
    if (fx) {
        snapshot.fx.usd_chf = fx.usd_chf;
        snapshot.fx.eur_chf = fx.eur_chf;
        snapshot.fx.asof = fx.asof;
        console.log(`FX: USD/CHF ${fx.usd_chf}, EUR/CHF ${fx.eur_chf}`);
    } else {
        console.log("FX: Data collection failed.");
    }

    // 3. Persistence
    try {
        const stmt = db.prepare("INSERT INTO snb_snapshots (created_at, payload_json) VALUES (?, ?)");
        stmt.run(snapshot.created_at, JSON.stringify(snapshot));
        console.log("SNB snapshot saved successfully.");
    } catch (err) {
        console.error("Database error:", err);
    } finally {
        db.close();
    }
}

run();
