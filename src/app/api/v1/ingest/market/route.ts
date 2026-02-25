import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

// DB Setup
const rawUrl = process.env.DATABASE_URL ?? "file:./data/stb.db";
const extractedPath = rawUrl.startsWith("file:") ? rawUrl.replace("file:", "") : rawUrl;
const dbParamPath = path.isAbsolute(extractedPath) ? extractedPath : path.resolve(process.cwd(), extractedPath);

const adapter = new PrismaBetterSqlite3({ url: `file:${dbParamPath}` });
const prisma = new PrismaClient({ adapter });

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("x-ai-secret");
    const AI_SECRET = process.env.AI_INGESTION_SECRET || "SwissTech_AI_Secret_2026_!#";

    if (authHeader !== AI_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { payload } = body;

        // Use raw query for market_snapshots as it might not be in Prisma schema yet or to avoid re-generating prisma
        // Based on previous files, market_snapshots exists in the DB.

        const createdAt = new Date().toISOString();
        const payloadJson = JSON.stringify(payload);

        await prisma.$executeRawUnsafe(
            "INSERT INTO market_snapshots (created_at, payload_json) VALUES (?, ?)",
            createdAt,
            payloadJson
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Market Ingest Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
