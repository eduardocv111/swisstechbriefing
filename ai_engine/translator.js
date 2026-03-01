const deepl = require('deepl-node');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

/**
 * Professional Translator using DeepL API
 * Features: Retry strategy, Language Verification, and Multi-field localization.
 */
class Translator {
    constructor() {
        const apiKey = process.env.DEEPL_API_KEY;
        if (!apiKey) {
            console.error('❌ DEEPL_API_KEY missing in .env');
            this.active = false;
        } else {
            this.translator = new deepl.Translator(apiKey, {
                minTimeout: 15000,
                maxRetries: 3
            });
            this.active = true;
        }
    }

    /**
     * Helper to retry a function with exponential backoff
     */
    async withRetry(fn, attempts = 3, delay = 1000) {
        for (let i = 0; i < attempts; i++) {
            try {
                return await fn();
            } catch (err) {
                if (i === attempts - 1) throw err;
                const wait = delay * Math.pow(2, i);
                console.log(`[DeepL] Retry ${i + 1}/${attempts} after ${wait}ms due to: ${err.message}`);
                await new Promise(r => setTimeout(r, wait));
            }
        }
    }

    /**
     * Checks if the translated content is valid and not just the original text.
     */
    verifyTranslationIntegrity(text, targetLocale, originalText) {
        if (!text || text.trim().length === 0) {
            console.warn(`[DeepL Integrity] FAIL: Empty content for ${targetLocale}`);
            return false;
        }

        // If content is identical to German original but target is not German, something failed.
        if (targetLocale !== 'de' && text.trim() === (originalText || "").trim()) {
            console.warn(`[DeepL Integrity] FAIL: Content identical to original for ${targetLocale}`);
            return false;
        }

        // English specific: Should contain basic English markers if it's a long text
        if (targetLocale.startsWith('en') && text.length > 100) {
            const hasEn = [' the ', ' and ', ' is ', ' of ', ' to '].some(m => text.toLowerCase().includes(m));
            if (!hasEn) {
                console.warn(`[DeepL Integrity] FAIL: No English markers found for ${targetLocale}. Sample: "${text.substring(0, 50)}..."`);
                return false;
            }
        }

        return true;
    }

    async translateArticle(article, targetLocales = ['fr-CH', 'it-CH', 'es-ES', 'en']) {
        if (!this.active) return [];

        const results = [];
        console.log(`[DeepL] Initiating professional pipeline for ${targetLocales.join(', ')}...`);

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

                const translate = async (text, options = {}) => {
                    const cleanText = (text ?? "").toString().trim();
                    if (!cleanText) return "";
                    const r = await this.withRetry(() =>
                        this.translator.translateText(cleanText, 'de', deepLTarget, options)
                    );
                    return (r?.text ?? "").toString();
                };

                // Prepare keyFacts for translation (joining prevents multiple API calls)
                // 🛡️ Robust Handling: Handle both strings and objects in keyFacts
                const factsString = Array.isArray(article.keyFacts)
                    ? article.keyFacts.map(f => typeof f === 'object' ? (f.fact || JSON.stringify(f)) : String(f)).join('\n')
                    : (article.keyFacts || "");

                // Execute batch translation
                console.log(`[DeepL] Translating fields for ${locale}. KeyFacts input (size): ${factsString.length}`);
                if (factsString.includes('[object Object]')) {
                    console.error(`[DeepL] 🛡️ EMERGENCY: Detected [object Object] in factsString BEFORE translation!`);
                }

                const [title, excerpt, content, expert, facts, metaTitle, metaDesc] = await Promise.all([
                    translate(article.title),
                    translate(article.excerpt),
                    translate(article.contentHtml, { tagHandling: 'html' }),
                    translate(article.expertQuote),
                    translate(factsString),
                    translate(article.metaTitle || article.title),
                    translate(article.metaDescription || article.excerpt)
                ]);

                console.log(`[DeepL] Translation for ${locale} received. Facts sample: "${(facts || "").substring(0, 50)}..."`);

                // Integrity Check
                const isConsitent = this.verifyTranslationIntegrity(content, deepLTarget, article.contentHtml);

                // Reconstruct keyFacts
                const translatedFactsArray = (facts || "").split('\n')
                    .map(l => l.trim())
                    .filter(l => l.length > 0)
                    .map(l => {
                        const clean = l.replace(/^[*-]\s*/, '').trim();
                        if (clean.includes('[object Object]')) {
                            return { fact: "..." }; // Guard
                        }
                        return { fact: clean };
                    });

                results.push({
                    locale,
                    title,
                    excerpt,
                    contentHtml: content,
                    expertQuote: expert,
                    keyFactsJson: JSON.stringify(translatedFactsArray),
                    metaTitle,
                    metaDescription: metaDesc,
                    integrityVerified: isConsitent
                });

                console.log(`   ✓ ${locale} translation complete (Integrity: ${isConsitent ? 'PASS' : 'FAIL'}).`);
            } catch (error) {
                console.error(`   ! Error translating to ${locale} after retries:`, error.message);
                // We keep results partial so other locales can proceed
            }
        }

        return results;
    }
}

module.exports = new Translator();
