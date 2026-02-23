import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const count = await prisma.article.count();
  return NextResponse.json({ articles: count });
}