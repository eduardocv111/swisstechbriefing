import Database from "better-sqlite3";

const url = process.env.DATABASE_URL || "file:./data/stb.db";
const DB_PATH = url.startsWith("file:") ? url.replace("file:", "") : url;

export interface MarketSnapshot {
    created_at: string;
    payload: {
        fx: {
            usd_chf: number;
            eur_chf: number;
        };
        markets: {
            qqq: {
                price: number;
                change: number;
                change_percent: string;
            };
            spy: {
                price: number;
                change: number;
                change_percent: string;
            };
        };
    };
}

export function getLatestMarketSnapshot() {
    try {
        const db = new Database(DB_PATH);
        const row = db
            .prepare("SELECT created_at, payload_json FROM market_snapshots ORDER BY id DESC LIMIT 1")
            .get() as { created_at: string; payload_json: string } | undefined;
        db.close();

        if (!row) return null;

        return {
            created_at: row.created_at,
            payload: JSON.parse(row.payload_json),
        };
    } catch (error) {
        console.error("Error fetching market snapshot:", error);
        return null;
    }
}
