import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import path from "path";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  // Use absolute path for reliability in production
  const dbUrl = process.env.DATABASE_URL ?? "file:./data/stb.db";

  // Strategy: Open DB with native driver once to set Pragmas (WAL + Timeout)
  try {
    const rawPath = dbUrl.startsWith('file:') ? dbUrl.replace('file:', '') : dbUrl;
    const absPath = path.isAbsolute(rawPath) ? rawPath : path.join(process.cwd(), rawPath);

    console.log(`[Database] ⚙️ Applying Production Pragmas to: ${absPath}`);
    const nativeDb = new Database(absPath);
    nativeDb.pragma('journal_mode = WAL');
    nativeDb.pragma('busy_timeout = 10000');
    nativeDb.pragma('synchronous = NORMAL');
    nativeDb.close();
  } catch (e) {
    console.error("[Database] ⚠️ Pragma application failed (safe to continue):", e);
  }

  const adapter = new PrismaBetterSqlite3({ url: dbUrl });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}