const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

/**
 * EXPORT SCRIPT (i18n compatible)
 * This script exports current articles from the DB to articles_backup.json.
 * Use this BEFORE running 'prisma migrate reset' to ensure you don't lose data.
 */

const dbPath = path.join(__dirname, '../data/stb.db');
const backupPath = path.join(__dirname, '../articles_backup.json');

const db = new Database(dbPath);

console.log(`\n--- EXPORT START ---`);
console.log(`Target: ${backupPath}`);

try {
    // We join with the first available translation (de-CH prefered) to maintain the legacy backup format structure
    const articles = db.prepare(`
        SELECT 
            a.*,
            t.title,
            t.excerpt,
            t.contentHtml
        FROM Article a
        LEFT JOIN ArticleTranslation t ON a.id = t.articleId AND t.locale = 'de-CH'
    `).all();

    fs.writeFileSync(backupPath, JSON.stringify(articles, null, 2));

    console.log(`\n--- EXPORT COMPLETED SUCCESSFULLY ---`);
    console.log(`Exported ${articles.length} articles to ${backupPath}`);
} catch (err) {
    console.error(`\n!!! EXPORT FAILED !!!`);
    console.error(err);
} finally {
    db.close();
}
