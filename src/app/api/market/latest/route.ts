import Database from "better-sqlite3";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const url = process.env.DATABASE_URL || "file:./data/stb.db";
const DB_PATH = url.startsWith("file:") ? url.replace("file:", "") : url;

export async function GET() {
  const db = new Database(DB_PATH);
  const row = db
    .prepare("SELECT created_at, payload_json FROM market_snapshots ORDER BY id DESC LIMIT 1")
    .get();
  db.close();

  if (!row) {
    return Response.json({ ok: false, error: "no_snapshot" }, { status: 404 });
  }

  return Response.json({
    ok: true,
    created_at: row.created_at,
    payload: JSON.parse(row.payload_json),
  });
}