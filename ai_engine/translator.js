const deepl = require('deepl-node');
require('dotenv').config({ path: '../.env' }); // Load API key from root .env

/**
 * Professional Translator using DeepL API
 */
class Translator {
    constructor() {
        const apiKey = process.env.DEEPL_API_KEY;
        if (!apiKey) {
            console.error('❌ DEEPL_API_KEY missing in .env');
            this.active = false;
        } else {
            this.translator = new deepl.Translator(apiKey);
            this.active = true;
        }
    }

    async translateArticle(article, targetLocales = ['fr-CH', 'it-CH', 'es-ES', 'en']) {
        if (!this.active) return [];

        const results = [];
        console.log(`[DeepL] Translating to ${targetLocales.join(', ')}...`);

        for (const locale of targetLocales) {
            try {
                let deepLTarget;
                switch (locale) {
                    case 'fr-CH': deepLTarget = 'fr'; break;
                    case 'it-CH': deepLTarget = 'it'; break;
                    case 'es-ES': deepLTarget = 'es'; break;
                    case 'en': deepLTarget = 'en-US'; break;
                    default: deepLTarget = 'en-US';
                }

                // Translate fields
                const [title, excerpt, content, metaTitle, metaDesc] = await Promise.all([
                    this.translator.translateText(article.title, 'de', deepLTarget),
                    this.translator.translateText(article.excerpt, 'de', deepLTarget),
                    this.translator.translateText(article.contentHtml, 'de', deepLTarget, { tagHandling: 'html' }),
                    this.translator.translateText(article.metaTitle || article.title, 'de', deepLTarget),
                    this.translator.translateText(article.metaDescription || article.excerpt, 'de', deepLTarget)
                ]);

                results.push({
                    locale,
                    title: title.text,
                    excerpt: excerpt.text,
                    contentHtml: content.text,
                    metaTitle: metaTitle.text,
                    metaDescription: metaDesc.text
                });

                console.log(`   ✓ ${locale} translation complete.`);
            } catch (error) {
                console.error(`   ! Error translating to ${locale}:`, error.message);
            }
        }

        return results;
    }
}

module.exports = new Translator();
