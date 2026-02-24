import { PrismaClient } from '../src/generated/prisma';

async function main() {
    const prisma = new PrismaClient();

    console.log('--- BACKFILL START ---');

    interface RawArticle {
        id: string;
        title: string;
        excerpt: string;
        contentHtml: string;
    }

    try {
        // 1. Fetch raw data from Article table (including fields no longer in schema)
        const rawArticles = await prisma.$queryRawUnsafe<RawArticle[]>(
            'SELECT id, title, excerpt, contentHtml FROM Article'
        );

        console.log(`Found ${rawArticles.length} articles to process.`);

        for (const art of rawArticles) {
            console.log(`Processing: ${art.id}`);

            // 2. Create translation record for DE-CH
            await prisma.articleTranslation.upsert({
                where: {
                    articleId_locale: {
                        articleId: art.id,
                        locale: 'de-CH'
                    }
                },
                update: {
                    title: art.title,
                    excerpt: art.excerpt,
                    contentHtml: art.contentHtml
                },
                create: {
                    articleId: art.id,
                    locale: 'de-CH',
                    title: art.title,
                    excerpt: art.excerpt,
                    contentHtml: art.contentHtml
                }
            });
        }

        console.log('--- BACKFILL COMPLETED SUCCESSFULLY ---');
    } catch (error) {
        console.error('BACKFILL FAILED:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
