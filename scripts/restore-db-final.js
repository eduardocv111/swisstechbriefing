const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

/**
 * RESTORE SCRIPT (i18n compatible)
 * This script restores articles from articles_backup.json into the Article and ArticleTranslation tables.
 * It also creates translations for all supported locales to ensure the site is functional.
 */

const dbPath = path.join(__dirname, '../data/stb.db');
const backupPath = path.join(__dirname, '../articles_backup.json');

if (!fs.existsSync(backupPath)) {
    console.error(`ERROR: Backup file not found at ${backupPath}`);
    process.exit(1);
}

const db = new Database(dbPath);
const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
const locales = ['de-CH', 'fr-CH', 'it-CH', 'en'];

console.log(`\n--- RESTORE START ---`);
console.log(`Source: ${backupPath}`);
console.log(`Target: ${dbPath}`);
console.log(`Articles to process: ${backup.length}`);

// Prepare statements
const insertArt = db.prepare(`
    INSERT OR REPLACE INTO Article 
    (id, slug, category, date, authorName, authorRole, sourcesJson, imageUrl, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertTrans = db.prepare(`
    INSERT OR REPLACE INTO ArticleTranslation 
    (id, articleId, locale, title, excerpt, contentHtml, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
`);

try {
    db.transaction(() => {
        let count = 0;
        for (const art of backup) {
            count++;
            console.log(`[${count}/${backup.length}] Restoring: ${art.slug}`);

            // 1. Insert Base Article
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

            // 2. Insert Translations for ALL locales
            // Since the backup only has German, we use it as the base for all.
            for (const loc of locales) {
                insertTrans.run(
                    `${art.id}_${loc}`, // stable, unique ID
                    art.id,
                    loc,
                    art.title,
                    art.excerpt,
                    art.contentHtml,
                    art.updatedAt
                );
            }
        }
    })();

    console.log(`\n--- RESTORE COMPLETED SUCCESSFULLY ---`);
    console.log(`Total restored: ${backup.length} articles with translations for ${locales.join(', ')}.`);
} catch (err) {
    console.error(`\n!!! RESTORE FAILED !!!`);
    console.error(err);
} finally {
    db.close();
}
