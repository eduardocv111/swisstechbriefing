import "dotenv/config";
import Database from "better-sqlite3";
import path from "path";

// 1. Database Setup
const url = process.env.DATABASE_URL || "file:./data/stb.db";
const dbPath = url.startsWith("file:") ? url.replace("file:", "") : url;
const resolvedPath = path.isAbsolute(dbPath) ? dbPath : path.resolve(process.cwd(), dbPath);

const db = new Database(resolvedPath);

// 2. Clear/Create Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS macro_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    payload_json TEXT NOT NULL
  )
`).run();

// 3. FRED Configuration
const FRED_API_KEY = process.env.FRED_API_KEY;
const SERIES_TO_FETCH = [
    { id: "FEDFUNDS", label: "Fed Funds Rate", unit: "%" },
    { id: "CPIAUCSL", label: "CPI (Consumer Price Index)", unit: "Index" },
    { id: "DGS10", label: "US 10Y Treasury Yield", unit: "%" }
];

async function fetchFredSeries(seriesId) {
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Find first valid numeric value
        const observation = data.observations?.find(obs => obs.value !== ".");
        if (!observation) throw new Error("No valid observation found");

        return {
            value: parseFloat(observation.value),
            date: observation.date,
            error: null
        };
    } catch (err) {
        return {
            value: null,
            date: null,
            error: err.message
        };
    }
}

async function run() {
    console.log("--- FRED Macro Update ---");

    if (!FRED_API_KEY) {
        console.error("Error: FRED_API_KEY not found in .env");
        process.exit(1);
    }

    const snapshot = {
        created_at: new Date().toISOString(),
        series: {}
    };

    for (const series of SERIES_TO_FETCH) {
        console.log(`Fetching ${series.id}...`);
        const data = await fetchFredSeries(series.id);

        snapshot.series[series.id] = {
            label: series.label,
            unit: series.unit,
            value: data.value,
            date: data.date,
            error: data.error,
            source: "FRED"
        };
    }

    // 4. Persistence
    try {
        const stmt = db.prepare("INSERT INTO macro_snapshots (created_at, payload_json) VALUES (?, ?)");
        stmt.run(snapshot.created_at, JSON.stringify(snapshot));
        console.log("Macro snapshot saved successfully.");
    } catch (err) {
        console.error("Database error:", err);
    } finally {
        db.close();
    }
}

run();
