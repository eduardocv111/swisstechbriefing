import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

/**
 * SECURE INGESTION API
 * Allows the local AI Engine to push new articles and images to the production server.
 */
export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("x-ai-secret")?.trim();
        const AI_SECRET = (process.env.AI_INGESTION_SECRET)?.trim();

        if (!AI_SECRET || authHeader !== AI_SECRET) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const formData = await req.formData();
        const articleJson = formData.get("article") as string;

        if (!articleJson) {
            return NextResponse.json({ error: "Missing article data" }, { status: 400 });
        }

        const articleData = JSON.parse(articleJson);

        // --- PRE-PROCESS DATA ---
        const imageFile = formData.get("image") as File;
        const videoFile = formData.get("video") as File;

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), "public", "assets", "images", "news");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) { }

        // 1. Process Main Image (Hero)
        let publicImageUrl = articleData.imageUrl;
        if (imageFile) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const mainFilename = `stb_${articleData.slug}_hero.png`;
            await writeFile(path.join(uploadDir, mainFilename), buffer);
            publicImageUrl = `/assets/images/news/${mainFilename}`;
        }

        // 1.1 Process Video (if exists)
        let publicVideoUrl = articleData.videoUrl;
        if (videoFile) {
            const vBytes = await videoFile.arrayBuffer();
            const vBuffer = Buffer.from(vBytes);
            const videoFilename = `stb_${articleData.slug}_hero.mp4`;
            await writeFile(path.join(uploadDir, videoFilename), vBuffer);
            publicVideoUrl = `/assets/images/news/${videoFilename}`;
        }

        // 2. Process Support Images (Detail & Context)
        const supportTypes = ['detail', 'context'];
        for (const type of supportTypes) {
            const supportFile = formData.get(`image_${type}`) as File;
            if (supportFile) {
                const sBytes = await supportFile.arrayBuffer();
                const sBuffer = Buffer.from(sBytes);
                await writeFile(path.join(uploadDir, `stb_${articleData.slug}_${type}.png`), sBuffer);
            }
        }

        // Helper to normalize facts
        const normalizeFacts = (facts: any): string => {
            if (!facts) return JSON.stringify([]);
            try {
                let items: any[] = [];
                if (typeof facts === 'string') {
                    if (facts.includes('\n')) {
                        items = facts.split('\n').map(l => l.replace(/^[-*•\d.]+\s*/, '').trim()).filter(l => l.length > 3);
                    } else {
                        try {
                            const parsed = JSON.parse(facts);
                            items = Array.isArray(parsed) ? parsed : [parsed];
                        } catch {
                            items = [facts];
                        }
                    }
                } else if (Array.isArray(facts)) {
                    items = facts;
                }
                return JSON.stringify(items.slice(0, 5).map(f => {
                    const content = typeof f === 'object' && f !== null ? (f.fact || JSON.stringify(f)) : String(f);
                    return { fact: content.replace(/^[-*•\d.]+\s*/, '').trim() };
                }));
            } catch (e) {
                return JSON.stringify([]);
            }
        };

        const keyFactsJson = normalizeFacts(articleData.keyFactsJson);
        const translations = articleData.translations || [];

        // 2. Upsert the article and all translations in the Database
        const result = await prisma.$transaction(async (tx) => {
            // First, find or create the article
            const article = await tx.article.upsert({
                where: { slug: articleData.slug },
                update: {
                    category: articleData.category,
                    authorName: articleData.authorName || "SwissTech AI Editor",
                    authorRole: articleData.authorRole || "Automated Insight Engine",
                    imageUrl: publicImageUrl,
                    videoUrl: publicVideoUrl,
                    sourcesJson: articleData.sourcesJson,
                    expertQuote: articleData.expertQuote,
                    keyFactsJson: keyFactsJson,
                    isVerified: articleData.isVerified || false,
                },
                create: {
                    slug: articleData.slug,
                    category: articleData.category,
                    date: new Date(),
                    authorName: articleData.authorName || "SwissTech AI Editor",
                    authorRole: articleData.authorRole || "Automated Insight Engine",
                    imageUrl: publicImageUrl,
                    videoUrl: publicVideoUrl,
                    sourcesJson: articleData.sourcesJson,
                    expertQuote: articleData.expertQuote,
                    keyFactsJson: keyFactsJson,
                    isVerified: articleData.isVerified || false,
                }
            });

            // Upsert primary translation (de-CH)
            await tx.articleTranslation.upsert({
                where: { articleId_locale: { articleId: article.id, locale: 'de-CH' } },
                update: {
                    title: articleData.title,
                    excerpt: articleData.excerpt,
                    contentHtml: articleData.contentHtml,
                    expertQuote: articleData.expertQuote,
                    keyFactsJson: keyFactsJson,
                    metaTitle: articleData.metaTitle,
                    metaDescription: articleData.metaDescription
                },
                create: {
                    articleId: article.id,
                    locale: 'de-CH',
                    title: articleData.title,
                    excerpt: articleData.excerpt,
                    contentHtml: articleData.contentHtml,
                    expertQuote: articleData.expertQuote,
                    keyFactsJson: keyFactsJson,
                    metaTitle: articleData.metaTitle,
                    metaDescription: articleData.metaDescription
                }
            });

            // Upsert professional translations
            for (const t of translations) {
                await tx.articleTranslation.upsert({
                    where: { articleId_locale: { articleId: article.id, locale: t.locale } },
                    update: {
                        title: t.title,
                        excerpt: t.excerpt,
                        contentHtml: t.contentHtml,
                        expertQuote: t.expertQuote,
                        keyFactsJson: normalizeFacts(t.keyFactsJson),
                        metaTitle: t.metaTitle,
                        metaDescription: t.metaDescription
                    },
                    create: {
                        articleId: article.id,
                        locale: t.locale,
                        title: t.title,
                        excerpt: t.excerpt,
                        contentHtml: t.contentHtml,
                        expertQuote: t.expertQuote,
                        keyFactsJson: normalizeFacts(t.keyFactsJson),
                        metaTitle: t.metaTitle,
                        metaDescription: t.metaDescription
                    }
                });
            }

            return article;
        });

        console.log(`[AI Ingestion] Successfully published: ${result.slug}`);

        // --- AUTOMATIC REVALIDATION (PRO ACTIVE) ---
        try {
            const { revalidatePath } = await import("next/cache");
            const { locales } = await import("@/i18n/config");

            console.log(`[AI Ingestion] 🔄 Triggering global revalidation for ${result.slug}...`);

            // Revalidate the Root for all locales (The News Lists)
            for (const loc of locales) {
                revalidatePath(`/${loc}`);
                revalidatePath(`/${loc}/artikel/${result.slug}`);
                revalidatePath(`/${loc}/sitemap.xml`);
                console.log(`[AI Ingestion] -> Revalidated: /${loc}`);
            }

            revalidatePath("/");
            revalidatePath("/sitemap.xml");

            console.log(`[AI Ingestion] ✅ All cache tags cleared.`);
        } catch (revErr) {
            console.error("[AI Ingestion] ❌ Cache revalidation failed:", revErr);
        }

        return NextResponse.json({
            success: true,
            slug: result.slug,
            url: `https://swisstechbriefing.ch/de-CH/artikel/${result.slug}`
        });

    } catch (error: any) {
        console.error("[AI Ingestion Error]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
