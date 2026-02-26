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
        const AI_SECRET = (process.env.AI_INGESTION_SECRET || "SwissTech_AI_Secret_2026_!#").trim();

        if (authHeader !== AI_SECRET) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const formData = await req.formData();
        const articleJson = formData.get("article") as string;
        const imageFile = formData.get("image") as File;
        const videoFile = formData.get("video") as File;

        if (!articleJson || !imageFile) {
            return NextResponse.json({ error: "Missing article data or image" }, { status: 400 });
        }

        const articleData = JSON.parse(articleJson);
        const translations = articleData.translations || [];

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), "public", "assets", "images", "news");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) { }

        // 1. Process Main Image (Hero)
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mainFilename = `stb_${articleData.slug}_hero.png`;
        await writeFile(path.join(uploadDir, mainFilename), buffer);

        // 1.1 Process Video (if exists)
        let publicVideoUrl = null;
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

        const publicImageUrl = `/assets/images/news/${mainFilename}`;

        // 2. Create the article and all translations in the Database
        const result = await prisma.$transaction(async (tx) => {
            return await tx.article.create({
                data: {
                    slug: articleData.slug,
                    category: articleData.category,
                    date: new Date(),
                    authorName: articleData.authorName || "SwissTech AI Editor",
                    authorRole: articleData.authorRole || "Automated Insight Engine",
                    imageUrl: publicImageUrl,
                    videoUrl: publicVideoUrl,
                    sourcesJson: articleData.sourcesJson,
                    expertQuote: articleData.expertQuote,
                    keyFactsJson: articleData.keyFactsJson,
                    isVerified: articleData.isVerified || false,
                    translations: {
                        create: [
                            // Include the primary translation (usually de-CH)
                            {
                                locale: 'de-CH',
                                title: articleData.title,
                                excerpt: articleData.excerpt,
                                contentHtml: articleData.contentHtml,
                                metaTitle: articleData.metaTitle,
                                metaDescription: articleData.metaDescription
                            },
                            // Include all additional professional translations
                            ...translations.map((t: any) => ({
                                locale: t.locale,
                                title: t.title,
                                excerpt: t.excerpt,
                                contentHtml: t.contentHtml,
                                metaTitle: t.metaTitle,
                                metaDescription: t.metaDescription
                            }))
                        ]
                    }
                }
            });
        });

        console.log(`[AI Ingestion] Successfully published: ${result.slug}`);

        // --- AUTOMATIC REVALIDATION ---
        try {
            const { revalidatePath } = await import("next/cache");
            const { locales } = await import("@/i18n/config");

            locales.forEach(loc => {
                revalidatePath(`/${loc}`);
                revalidatePath(`/${loc}/artikel/${result.slug}`);
                revalidatePath(`/${loc}/sitemap.xml`);
            });
            revalidatePath("/sitemap.xml");
            console.log(`[AI Ingestion] Cache revalidation triggered for: ${result.slug}`);
        } catch (revErr) {
            console.error("[AI Ingestion] Cache revalidation failed:", revErr);
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
