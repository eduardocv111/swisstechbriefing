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
  CREATE TABLE IF NOT EXISTS swiss_open_data_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    payload_json TEXT NOT NULL
  )
`).run();

// 3. opendata.swiss (CKAN) configuration
const SEARCH_QUERY = "inflation CPI energy price energy BFS";
const API_ENDPOINT = "https://opendata.swiss/api/3/action/package_search";

async function run() {
    console.log("--- Swiss Open Data (CKAN) Update ---");

    const snapshot = {
        created_at: new Date().toISOString(),
        results: [],
        source: "opendata.swiss"
    };

    try {
        const url = `${API_ENDPOINT}?q=${encodeURIComponent(SEARCH_QUERY)}&rows=5&sort=metadata_modified+desc`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (data.success && data.result.results) {
            snapshot.results = data.result.results.map(pkg => ({
                id: pkg.id,
                title: pkg.title?.de || pkg.title?.en || pkg.title?.fr || "Untitled Dataset",
                organization: pkg.organization?.title?.de || pkg.organization?.name || "Unknown",
                modified: pkg.metadata_modified,
                url: `https://opendata.swiss/dataset/${pkg.name}`,
                maintainer: pkg.maintainer || "BFS / FSO"
            }));
        }

        console.log(`Collected ${snapshot.results.length} datasets.`);

    } catch (err) {
        console.error("CKAN API error:", err.message);
    }

    // 4. Persistence
    try {
        const stmt = db.prepare("INSERT INTO swiss_open_data_snapshots (created_at, payload_json) VALUES (?, ?)");
        stmt.run(snapshot.created_at, JSON.stringify(snapshot));
        console.log("Swiss Open Data snapshot saved successfully.");
    } catch (err) {
        console.error("Database error:", err);
    } finally {
        db.close();
    }
}

run();
