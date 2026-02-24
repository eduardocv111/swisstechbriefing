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

// 3. SNB API Configuration
// Policy rate cube: snbzp, series: B5
// FX rates cube: devkum, series: D0 (USD), D1 (EUR) vs CHF
const SNB_CUBES = [
    {
        id: "snbzp",
        label: "SNB Policy Rate",
        url: "https://data.snb.ch/api/cube/snbzp/data/json/en",
        series: "B5"
    },
    {
        id: "devkum",
        label: "Exchange Rates",
        url: "https://data.snb.ch/api/cube/devkum/data/json/en",
        series: ["D0", "D1"] // D0=USD, D1=EUR
    }
];

async function fetchSNBCube(cube) {
    try {
        const response = await fetch(cube.url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // SNB JSON structure is complex. We need the latest observations.
        // data.observations contains values. 
        // This is a simplified extraction logic for the SNB API structure.
        const results = {};

        if (Array.isArray(cube.series)) {
            cube.series.forEach(sId => {
                const obs = data.observations
                    .filter(o => o.dimensions.some(d => d === sId))
                    .sort((a, b) => b.date.localeCompare(a.date))[0];

                if (obs) {
                    results[sId] = { value: parseFloat(obs.value), date: obs.date };
                }
            });
        } else {
            const obs = data.observations
                .filter(o => o.dimensions.some(d => d === cube.series))
                .sort((a, b) => b.date.localeCompare(a.date))[0];

            if (obs) {
                results[cube.series] = { value: parseFloat(obs.value), date: obs.date };
            }
        }

        return results;
    } catch (err) {
        console.error(`Error fetching SNB ${cube.id}:`, err.message);
        return null;
    }
}

async function run() {
    console.log("--- SNB Snapshot Update ---");

    const snapshot = {
        created_at: new Date().toISOString(),
        series: {},
        source: "SNB"
    };

    // Fetch Policy Rate
    const policyData = await fetchSNBCube(SNB_CUBES[0]);
    if (policyData && policyData["B5"]) {
        snapshot.series["SNB_POLICY_RATE"] = {
            label: "SNB Policy Rate",
            value: policyData["B5"].value,
            date: policyData["B5"].date,
            unit: "%"
        };
    }

    // Fetch FX Rates (USD/CHF, EUR/CHF)
    const fxData = await fetchSNBCube(SNB_CUBES[1]);
    if (fxData) {
        if (fxData["D0"]) {
            snapshot.series["USD_CHF"] = { label: "USD/CHF", value: fxData["D0"].value, date: fxData["D0"].date, unit: "CHF" };
        }
        if (fxData["D1"]) {
            snapshot.series["EUR_CHF"] = { label: "EUR/CHF", value: fxData["D1"].value, date: fxData["D1"].date, unit: "CHF" };
        }
    }

    // Fallback check
    if (Object.keys(snapshot.series).length === 0) {
        console.warn("No data points collected from SNB.");
    }

    // 4. Persistence
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
