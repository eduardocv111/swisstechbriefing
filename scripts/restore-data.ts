import { PrismaClient } from '../src/generated/prisma';
import fs from 'fs';
import path from 'path';

async function main() {
    const prisma = new PrismaClient();
    const backupPath = path.join(__dirname, '../articles_backup.json');

    if (!fs.existsSync(backupPath)) {
        console.error('No backup file found!');
        return;
    }

    const rawData = fs.readFileSync(backupPath, 'utf-8');
    const articles = JSON.parse(rawData);

    console.log(`Starting restore of ${articles.length} articles...`);

    for (const art of articles) {
        try {
            console.log(`Restoring: ${art.slug}`);

            // 1. Create Article Base
            const createdArticle = await prisma.article.create({
                data: {
                    id: art.id,
                    slug: art.slug,
                    category: art.category,
                    date: new Date(art.date),
                    authorName: art.authorName,
                    authorRole: art.authorRole,
                    sourcesJson: art.sourcesJson,
                    imageUrl: art.imageUrl,
                    createdAt: new Date(art.createdAt),
                    updatedAt: new Date(art.updatedAt),
                }
            });

            // 2. Create translation for DE-CH
            await prisma.articleTranslation.create({
                data: {
                    articleId: createdArticle.id,
                    locale: 'de-CH',
                    title: art.title,
                    excerpt: art.excerpt,
                    contentHtml: art.contentHtml,
                }
            });

        } catch (e) {
            console.error(`Failed to restore ${art.slug}:`, e);
        }
    }

    console.log('Restore completed.');
    await prisma.$disconnect();
}

main();
