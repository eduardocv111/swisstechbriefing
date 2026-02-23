import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { articleSchema } from "@/lib/validations/article.schema";
import { getSlugFromCategory } from "@/lib/categories";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 1. Auth por token
  const auth = req.headers.get("authorization") || "";
  const token = process.env.ADMIN_PUBLISH_TOKEN;

  if (!token || auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // 2. Control de tamaño (Límite 200KB)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 200 * 1024) {
    return NextResponse.json({ ok: false, error: "Payload too large (max 200KB)" }, { status: 413 });
  }

  try {
    const rawBody = await req.json();

    // Verificación secundaria por si no hay content-length o es engañoso
    if (JSON.stringify(rawBody).length > 300 * 1024) {
      return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
    }

    // 3. Validación robusta con Zod
    const resultSchema = articleSchema.safeParse(rawBody);
    if (!resultSchema.success) {
      return NextResponse.json({
        ok: false,
        error: "Validation failed",
        details: resultSchema.error.format()
      }, { status: 400 });
    }

    const data = resultSchema.data;

    const result = await prisma.article.upsert({
      where: { slug: data.slug },
      update: {
        title: data.title,
        excerpt: data.excerpt,
        contentHtml: data.contentHtml,
        category: data.category,
        date: data.date,
        authorName: data.author.name,
        authorRole: data.author.role,
        sourcesJson: JSON.stringify(data.sources),
        imageUrl: data.imageUrl && data.imageUrl.length > 0 ? data.imageUrl : null,
      },
      create: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        contentHtml: data.contentHtml,
        category: data.category,
        date: data.date,
        authorName: data.author.name,
        authorRole: data.author.role,
        sourcesJson: JSON.stringify(data.sources),
        imageUrl: data.imageUrl && data.imageUrl.length > 0 ? data.imageUrl : null,
      },
    });

    // 4. ISR Revalidation Completa
    revalidatePath("/");
    revalidatePath(`/artikel/${result.slug}`);
    revalidatePath("/rss.xml");
    revalidatePath("/sitemap.xml");

    const categorySlug = getSlugFromCategory(data.category);
    if (categorySlug) {
      revalidatePath(`/kategorie/${categorySlug}`);
    }

    return NextResponse.json({ ok: true, id: result.id, slug: result.slug });
  } catch (err) {
    console.error("Publish error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}