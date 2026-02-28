const { PrismaClient } = require("./src/generated/prisma");
const prisma = new PrismaClient();

async function checkRecent() {
    try {
        const articles = await prisma.article.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { translations: true }
        });
        console.log("Recent articles in DB:");
        articles.forEach(a => {
            console.log(`- [${a.createdAt.toISOString()}] ${a.slug} (${a.translations.length} translations)`);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

checkRecent();
