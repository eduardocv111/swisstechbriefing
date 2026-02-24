import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as deepl from 'deepl-node';
import path from 'path';

/**
 * CONFIGURATION & INITIALIZATION
 */
const DEFAULT_TAKE = 20;
const SOURCE_LOCALE = 'de-CH';
const TARGET_LOCALES = ['fr-CH', 'it-CH', 'en'];

// 1. Robust Database Initialization
const rawUrl = process.env.DATABASE_URL ?? "file:./data/stb.db";
const extractedPath = rawUrl.startsWith("file:") ? rawUrl.replace("file:", "") : rawUrl;
const dbParamPath = path.isAbsolute(extractedPath) ? extractedPath : path.resolve(process.cwd(), extractedPath);

// Initialize Prisma
const adapter = new PrismaBetterSqlite3({
    url: `file:${dbParamPath}`,
});
const prisma = new PrismaClient({ adapter });

// 2. Global translator variable (will be initialized in main)
let translator: deepl.Translator;

/**
 * TRANSLATION METRICS TRACKER
 */
let totalChars = 0;
let totalFields = 0;

/**
 * DEEPL TRANSLATION FUNCTION
 */
async function translateText(
    text: string,
    targetLocale: string,
    isHtml: boolean = false
): Promise<{ text: string, usedFormality: boolean }> {
    if (!text || !text.trim()) return { text: '', usedFormality: false };

    let deepLTarget: deepl.TargetLanguageCode;
    switch (targetLocale) {
        case 'fr-CH': deepLTarget = 'fr'; break;
        case 'it-CH': deepLTarget = 'it'; break;
        case 'en': deepLTarget = 'en-US'; break;
        default: deepLTarget = 'en-US';
    }

    const translate = async (formality?: deepl.Formality) => {
        const options: deepl.TranslateTextOptions = {
            tagHandling: isHtml ? 'html' : undefined,
            formality: formality,
        };
        return await translator.translateText(text, 'de', deepLTarget, options);
    };

    try {
        const supportsFormality = (targetLocale === 'fr-CH' || targetLocale === 'it-CH');
        totalChars += text.length;
        totalFields++;

        try {
            const result = await translate(supportsFormality ? 'more' : undefined);
            return { text: result.text, usedFormality: supportsFormality };
        } catch (formalityError) {
            if (supportsFormality) {
                const result = await translate(undefined);
                return { text: result.text, usedFormality: false };
            }
            throw formalityError;
        }
    } catch (error) {
        console.error(`  ! Fatal translation error for ${targetLocale}:`, error);
        return { text: `[ERROR: ${targetLocale}] ${text}`, usedFormality: false };
    }
}

/**
 * MAIN BATCH PROCESSING
 */
async function main() {
    // SQLite Hardening
    try {
        await prisma.$executeRawUnsafe("PRAGMA journal_mode = WAL");
        await prisma.$executeRawUnsafe("PRAGMA busy_timeout = 5000");
    } catch (e) {
        console.warn('⚠️  Pragmas non-critical failure:', e);
    }

    const args = process.argv.slice(2);
    const takeArg = args.find(a => a.startsWith('--take='))?.split('=')[1];
    const slugArg = args.find(a => a.startsWith('--slug='))?.split('=')[1];
    const keyArg = args.find(a => a.startsWith('--key='))?.split('=')[1];
    const force = args.includes('--force');
    const take = takeArg ? parseInt(takeArg) : DEFAULT_TAKE;

    const apiKey = keyArg || process.env.DEEPL_API_KEY;

    console.log('\n======================================================');
    console.log('      SWISSTECH BRIEFING: EDITORIAL AUTOMATION');
    console.log('======================================================');
    console.log(`> DB: ${dbParamPath}`);
    console.log(`> Mode: ${force ? 'Force Overwrite' : 'Incremental'}`);
    if (slugArg) console.log(`> Target Slug: ${slugArg}`);
    console.log('------------------------------------------------------\n');

    if (!apiKey) {
        console.error('❌ Error: DEEPL_API_KEY is missing in .env and no --key provided');
        process.exit(1);
    }

    translator = new deepl.Translator(apiKey);

    try {
        const articles = await prisma.article.findMany({
            where: slugArg ? { slug: slugArg } : {},
            include: { translations: true },
            take,
            orderBy: { createdAt: 'desc' }
        });

        if (articles.length === 0) {
            console.log('No articles found matching criteria.');
            return;
        }

        let processedArticles = 0;
        let createdTranslations = 0;

        for (const article of articles) {
            console.log(`\n[ARTICLE] ${article.slug}`);
            const source = article.translations.find(t => t.locale === SOURCE_LOCALE);
            if (!source) {
                console.warn(`  ! Skip: Source (de-CH) missing.`);
                continue;
            }

            for (const targetLocale of TARGET_LOCALES) {
                const exists = article.translations.find(t => t.locale === targetLocale);
                if (exists && !force) {
                    console.log(`  - ${targetLocale}: OK (exists)`);
                    continue;
                }

                console.log(`  + Translating to ${targetLocale}...`);

                const tTitle = await translateText(source.title, targetLocale, false);
                const tExcerpt = await translateText(source.excerpt, targetLocale, false);
                const tContent = await translateText(source.contentHtml, targetLocale, true);

                const mTitleSource = source.metaTitle || source.title;
                const mDescSource = source.metaDescription || source.excerpt;
                const tMetaTitle = await translateText(mTitleSource, targetLocale, false);
                const tMetaDesc = await translateText(mDescSource, targetLocale, false);

                const usedFallback = [tTitle, tExcerpt, tContent, tMetaTitle, tMetaDesc].some(r => (targetLocale === 'fr-CH' || targetLocale === 'it-CH') && !r.usedFormality);

                await prisma.articleTranslation.upsert({
                    where: { articleId_locale: { articleId: article.id, locale: targetLocale } },
                    update: {
                        title: tTitle.text.substring(0, 255),
                        excerpt: tExcerpt.text.substring(0, 500),
                        contentHtml: tContent.text,
                        metaTitle: tMetaTitle.text.substring(0, 60),
                        metaDescription: tMetaDesc.text.substring(0, 160)
                    },
                    create: {
                        articleId: article.id,
                        locale: targetLocale,
                        title: tTitle.text.substring(0, 255),
                        excerpt: tExcerpt.text.substring(0, 500),
                        contentHtml: tContent.text,
                        metaTitle: tMetaTitle.text.substring(0, 60),
                        metaDescription: tMetaDesc.text.substring(0, 160)
                    }
                });

                console.log(`    ✓ Done. Fields: 5 | Chars: ~${tTitle.text.length + tExcerpt.text.length + tContent.text.length} | Formality: ${usedFallback ? 'FALLBACK' : 'YES'}`);
                createdTranslations++;
            }
            processedArticles++;
        }

        console.log('\n======================================================');
        console.log('                   FINAL SUMMARY');
        console.log('======================================================');
        console.log(`> Articles: ${processedArticles}`);
        console.log(`> Translations: ${createdTranslations}`);
        console.log(`> Est. API Usage: ${totalChars} chars across ${totalFields} fields`);
        console.log('======================================================\n');

    } catch (err) {
        console.error('Fatal batch error:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
