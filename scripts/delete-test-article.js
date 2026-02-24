const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const slug = 'swiss-ai-test-1';
    console.log(`Deleting article and translations for slug: ${slug}`);

    // Find the article first to get its ID
    const article = await prisma.article.findUnique({
        where: { slug }
    });

    if (!article) {
        console.log('Article not found.');
        return;
    }

    // Delete translations first (though cleanup should handle it if defined, but safe anyway)
    await prisma.articleTranslation.deleteMany({
        where: { articleId: article.id }
    });

    // Delete the article
    await prisma.article.delete({
        where: { id: article.id }
    });

    console.log('Successfully deleted from local database.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
