import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { articleSchema } from "@/lib/validations/article.schema";
import { getSlugFromCategory } from "@/lib/categories";
import { locales } from "@/i18n/config";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const token = process.env.ADMIN_PUBLISH_TOKEN;

  if (!token || auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 300 * 1024) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  try {
    const rawBody = await req.json();

    const resultSchema = articleSchema.safeParse(rawBody);
    if (!resultSchema.success) {
      return NextResponse.json({
        ok: false,
        error: "Validation failed",
        details: resultSchema.error.format()
      }, { status: 400 });
    }

    const data = resultSchema.data;

    // 1. Upsert base Article
    const article = await prisma.article.upsert({
      where: { slug: data.slug },
      update: {
        category: data.category,
        date: data.date,
        authorName: data.author.name,
        authorRole: data.author.role,
        sourcesJson: JSON.stringify(data.sources),
        imageUrl: data.imageUrl && data.imageUrl.length > 0 ? data.imageUrl : null,
      },
      create: {
        slug: data.slug,
        category: data.category,
        date: data.date,
        authorName: data.author.name,
        authorRole: data.author.role,
        sourcesJson: JSON.stringify(data.sources),
        imageUrl: data.imageUrl && data.imageUrl.length > 0 ? data.imageUrl : null,
      },
    });

    // 2. Upsert Translation
    await prisma.articleTranslation.upsert({
      where: {
        articleId_locale: {
          articleId: article.id,
          locale: data.locale,
        }
      },
      update: {
        title: data.title,
        excerpt: data.excerpt,
        contentHtml: data.contentHtml,
      },
      create: {
        articleId: article.id,
        locale: data.locale,
        title: data.title,
        excerpt: data.excerpt,
        contentHtml: data.contentHtml,
      },
    });

    // 3. Revalidate paths for ALL locales (since home/search lists are all affected)
    locales.forEach(loc => {
      revalidatePath(`/${loc}`);
      revalidatePath(`/${loc}/artikel/${article.slug}`);
      const categorySlug = getSlugFromCategory(data.category);
      if (categorySlug) {
        revalidatePath(`/${loc}/kategorie/${categorySlug}`);
      }
      revalidatePath(`/${loc}/sitemap.xml`);
      revalidatePath(`/${loc}/feed.xml`);
    });

    revalidatePath("/sitemap.xml");

    return NextResponse.json({ ok: true, id: article.id, slug: article.slug, locale: data.locale });
  } catch (err) {
    console.error("Publish error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const token = process.env.ADMIN_PUBLISH_TOKEN;

  if (!token || auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Slug required" }, { status: 400 });
    }

    const article = await prisma.article.findUnique({
      where: { slug }
    });

    if (!article) {
      return NextResponse.json({ ok: false, error: "Article not found" }, { status: 404 });
    }

    // Delete translations first
    await prisma.articleTranslation.deleteMany({
      where: { articleId: article.id }
    });

    // Delete article
    await prisma.article.delete({
      where: { id: article.id }
    });

    // Revalidate affected paths
    locales.forEach(loc => {
      revalidatePath(`/${loc}`);
      revalidatePath(`/${loc}/artikel/${slug}`);
      const categorySlug = getSlugFromCategory(article.category);
      if (categorySlug) {
        revalidatePath(`/${loc}/kategorie/${categorySlug}`);
      }
    });
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ ok: true, message: `Deleted ${slug}` });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}