import Database from "better-sqlite3";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const url = process.env.DATABASE_URL || "file:./data/stb.db";
const DB_PATH = url.startsWith("file:") ? url.replace("file:", "") : url;

export async function GET() {
    try {
        const db = new Database(DB_PATH);
        const row = db
            .prepare("SELECT created_at, payload_json FROM swiss_open_data_snapshots ORDER BY id DESC LIMIT 1")
            .get() as { created_at: string; payload_json: string } | undefined;
        db.close();

        if (!row) {
            return Response.json({ ok: false, error: "no_snapshot" }, { status: 404 });
        }

        return Response.json({
            ok: true,
            created_at: row.created_at,
            payload: JSON.parse(row.payload_json),
        });
    } catch (err) {
        return Response.json({ ok: false, error: "db_error" }, { status: 500 });
    }
}
