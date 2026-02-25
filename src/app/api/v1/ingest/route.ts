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

        if (!articleJson || !imageFile) {
            return NextResponse.json({ error: "Missing article data or image" }, { status: 400 });
        }

        const articleData = JSON.parse(articleJson);
        const translations = articleData.translations || [];

        // 1. Save the image to public/assets/images/news/
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), "public", "assets", "images", "news");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) { }

        const filename = `stb_${articleData.slug}.png`;
        const imagePath = path.join(uploadDir, filename);
        await writeFile(imagePath, buffer);

        const publicImageUrl = `/assets/images/news/${filename}`;

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
                    sourcesJson: articleData.sourcesJson,
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
