import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { locales } from "@/i18n/config";

/**
 * API Route for On-Demand Revalidation
 * Usage: POST /api/admin/revalidate with Bearer Token
 * Body: { "path": "/", "type": "layout" } or { "slug": "my-article-slug" }
 */
export async function POST(req: NextRequest) {
    const auth = req.headers.get("authorization") || "";
    const token = process.env.STB_API_KEY;

    if (!token || auth !== `Bearer ${token}`) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { path, slug, category } = body;

        // 1. Revalidate Home for all locales (Default behavior)
        if (!path && !slug && !category) {
            revalidatePath("/", "layout"); // Reset EVERYTHING
            locales.forEach(loc => {
                revalidatePath(`/${loc}`);
                revalidatePath(`/${loc}/sitemap.xml`);
            });
            revalidatePath("/sitemap.xml");
            return NextResponse.json({ ok: true, message: "Full site revalidation triggered" });
        }

        // 2. Revalidate specific article
        if (slug) {
            revalidatePath("/", "layout"); // Forced global flush for safety
            locales.forEach(loc => {
                revalidatePath(`/${loc}/artikel/${slug}`);
                revalidatePath(`/${loc}`); // Update lists too
                if (category) {
                    revalidatePath(`/${loc}/kategorie/${category}`);
                }
            });
        }

        // 3. Revalidate specific path
        if (path) {
            revalidatePath(path);
        }

        return NextResponse.json({ ok: true, revalidated: true, now: new Date().toISOString() });
    } catch (err) {
        return NextResponse.json({ ok: false, error: "Revalidation failed" }, { status: 500 });
    }
}
