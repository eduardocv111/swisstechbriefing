const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(__dirname, '../data/stb.db'));
const backup = JSON.parse(fs.readFileSync(path.join(__dirname, '../articles_backup.json'), 'utf8'));

console.log(`Starting restore using better-sqlite3...`);

const insertArt = db.prepare(`INSERT INTO Article (id, slug, category, date, authorName, authorRole, sourcesJson, imageUrl, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const insertTrans = db.prepare(`INSERT INTO ArticleTranslation (id, articleId, locale, title, excerpt, contentHtml, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`);

db.transaction(() => {
    for (const art of backup) {
        console.log(`Restoring: ${art.slug}`);

        insertArt.run(
            art.id,
            art.slug,
            art.category,
            art.date,
            art.authorName,
            art.authorRole,
            art.sourcesJson,
            art.imageUrl,
            art.createdAt,
            art.updatedAt
        );

        insertTrans.run(
            Math.random().toString(36).substring(2),
            art.id,
            'de-CH',
            art.title,
            art.excerpt,
            art.contentHtml,
            art.updatedAt
        );
    }
})();

console.log('Restore finished successfully.');
db.close();
