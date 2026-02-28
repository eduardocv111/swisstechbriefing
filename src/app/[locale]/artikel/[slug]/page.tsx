import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo/site";
import { formatSwissDate } from "@/lib/formatDate";
import {
    getArticleBySlug,
    getRelatedArticles,
    getAllArticleSlugs,
} from "@/lib/articles.repo";
import NewsletterBox from "@/components/newsletter/NewsletterBox";
import ScrollProgress from "@/components/ScrollProgress";
import ShareButtons from "@/components/ShareButtons";
import AdSlot from "@/components/consent/AdSlot";
import GoogleRrmScript from "@/components/analytics/GoogleRrmScript";
import { Locale, defaultLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { estimateReadingTime } from "@/lib/seo/read-time";

export const runtime = "nodejs";
export const revalidate = 3600;

type Props = {
    params: Promise<{ slug: string; locale: string }>;
};

const FALLBACK_OG_IMAGE = "/assets/images/news/default-news.svg";

function stripHtml(html: string = ""): string {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}


function toAbsoluteUrl(pathOrUrl?: string | null): string | undefined {
    if (!pathOrUrl) return undefined;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    return `${SITE_CONFIG.url}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function toIsoDate(value?: string | Date | null): string | undefined {
    if (!value) return undefined;
    const d = value instanceof Date ? value : new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function getArticleImageOrFallback(image?: string | null): string {
    return image && image.trim() ? image : FALLBACK_OG_IMAGE;
}

export async function generateStaticParams(): Promise<Array<{ slug: string; locale: string }>> {
    try {
        const slugs = await getAllArticleSlugs();
        const params: Array<{ slug: string; locale: string }> = [];

        for (const locale of locales) {
            for (const slug of slugs) {
                params.push({ slug, locale });
            }
        }
        return params;
    } catch (error) {
        console.error("generateStaticParams error:", error);
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const article = await getArticleBySlug(locale, slug);

    if (!article) {
        return { title: "Not Found" };
    }

    const title = `${article.title} | ${SITE_CONFIG.name}`;
    const description = article.excerpt ?? "";

    // Canonical Logic
    // If it's a fallback, we canonical to the default locale (de-CH) to avoid duplicate content
    const canonicalLocale = article.isFallback ? defaultLocale : locale;
    const canonicalUrl = `${SITE_CONFIG.url}/${canonicalLocale}/artikel/${article.slug}`;

    const imageUrl = toAbsoluteUrl(getArticleImageOrFallback(article.image));
    const publishedTime = toIsoDate(article.publishedAt);
    const modifiedTime = toIsoDate(article.dateModified);
    const authorName = article.author?.name ?? SITE_CONFIG.name;

    // Hreflang logic - only include locales that actually have translations
    const languages: Record<string, string> = {};
    article.availableLocales.forEach(loc => {
        languages[loc] = `${SITE_CONFIG.url}/${loc}/artikel/${article.slug}`;
    });
    // Add x-default pointing to the default language version
    languages['x-default'] = `${SITE_CONFIG.url}/${defaultLocale}/artikel/${article.slug}`;

    return {
        metadataBase: new URL(SITE_CONFIG.url),
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages,
        },
        // SEO Strategy: if it's a fallback, don't index this specific URL
        ...(article.isFallback ? { robots: "noindex, follow" } : {}),
        openGraph: {
            title,
            description,
            url: `${SITE_CONFIG.url}/${locale}/artikel/${article.slug}`,
            siteName: SITE_CONFIG.name,
            type: "article",
            locale: locale,
            ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            authors: [authorName],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            ...(imageUrl ? { images: [imageUrl] } : {}),
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug, locale } = await params;
    const article = await getArticleBySlug(locale, slug);
    const dict = await getDictionary(locale as Locale);

    if (!article) {
        notFound();
    }

    const relatedArticles = await getRelatedArticles(locale, article.category, article.slug, 3);
    const articleUrl = `${SITE_CONFIG.url}/${locale}/artikel/${article.slug}`;
    const imageUrl = toAbsoluteUrl(getArticleImageOrFallback(article.image));
    const publishedTime = toIsoDate(article.publishedAt);
    const modifiedTime = toIsoDate(article.dateModified);
    const readingTime = estimateReadingTime(article.contentHtml);

    const newsArticleJsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        description: article.excerpt,
        image: imageUrl ? [imageUrl] : [],
        datePublished: publishedTime,
        dateModified: modifiedTime,
        author: [{
            "@type": "Person",
            "name": article.author?.name ?? SITE_CONFIG.name,
            "jobTitle": article.author?.role ?? "Technology Analyst"
        }],
        publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
        "isAccessibleForFree": "True",
        "hasPart": article.isVerified ? { "@type": "WebPageElement", "isVerified": "True" } : undefined
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }} />
            <Header locale={locale} />
            <ScrollProgress />
            <GoogleRrmScript />

            <main className="mx-auto min-h-screen max-w-3xl px-6 pt-10 pb-16">
                {article.isVerified && (
                    <div className="mb-6 flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-green-600 dark:bg-green-500/20 dark:text-green-400 w-fit border border-green-500/20">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        <span>{dict.article.factChecked || 'Fact-Checked & Verified'}</span>
                    </div>
                )}

                {article.isFallback && (
                    <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-300">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">info</span>
                            <p>{dict.article.fallbackNotice}</p>
                        </div>
                    </div>
                )}

                <article>
                    <div className="mb-4">
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            {(() => {
                                const key = article.category.toLowerCase();
                                if (key.includes('ki') || key.includes('ai')) return dict.categories.ki;
                                if (key.includes('startup')) return dict.categories.startups;
                                if (key.includes('regulierung') || key.includes('regulation')) return dict.categories.regulation;
                                if (key.includes('defense') || key.includes('security')) return dict.categories.defense;
                                return article.category;
                            })()}
                        </span>
                    </div>

                    <h1 className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-4xl">
                        {article.title}
                    </h1>

                    <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            <span>{formatSwissDate(article.datePublished, locale)}</span>
                        </div>
                        <span className="opacity-30">|</span>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            <span>{readingTime} {dict.article.readTime}</span>
                        </div>
                        <span className="opacity-30">|</span>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-slate-400">{dict.article.by}</span>
                            <span className="text-slate-900 dark:text-white">{article.author?.name}</span>
                        </div>
                    </div>

                    <ShareButtons url={articleUrl} title={article.title} />

                    <div className="relative mt-10 mb-5 aspect-video overflow-hidden rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                        {article.videoUrl ? (
                            <video
                                src={article.videoUrl}
                                poster={getArticleImageOrFallback(article.image)}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Image src={getArticleImageOrFallback(article.image)} alt={article.title} fill className="object-cover transition group-hover:scale-105" sizes="100vw" />
                        )}
                    </div>

                    {/* Image Caption & Company Review Section (Following reference example) */}
                    <div className="mb-12 border-b border-slate-100 pb-10 dark:border-slate-800/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-primary font-black text-sm tracking-tighter">STB 1/1</span>
                                <div className="flex items-center gap-1 text-slate-300 dark:text-slate-700">
                                    <span className="material-symbols-outlined text-base">chevron_left</span>
                                    <span className="material-symbols-outlined text-base">chevron_right</span>
                                </div>
                            </div>
                            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                {dict.article.imageCredit} <span className="text-primary/80">Archiv SwissTech Briefing</span>
                            </div>
                        </div>

                        <p className="text-[13px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 border-l-2 border-primary/20 pl-4 py-1">
                            {article.excerpt || dict.footer.description}
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-white dark:bg-slate-950 px-3 italic">
                                {dict.footer.description}
                            </div>
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none dark:prose-invert prose-p:leading-relaxed prose-strong:text-slate-900 dark:prose-strong:text-white">
                        {/* Excerpt removed from here as it is now in the caption section */}

                        {/* Expert Quote Block */}
                        {article.expertQuote && (
                            <div className="my-8 rounded-2xl border-l-4 border-primary bg-slate-50 p-8 dark:bg-slate-900/50">
                                <span className="material-symbols-outlined text-4xl text-primary/20 mb-2">format_quote</span>
                                <p className="italic text-xl font-serif text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {article.expertQuote}
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{dict.article.analystInsight}</span>
                                </div>
                            </div>
                        )}

                        <div className="mt-6" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

                        {/* Key Facts / Hard Data Section */}
                        {article.keyFacts && article.keyFacts.length > 0 && (
                            <div className="my-10 rounded-2xl border border-slate-100 p-8 dark:border-slate-800">
                                <h3 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                    <span className="material-symbols-outlined text-primary">data_usage</span>
                                    {dict.article.hardDataTitle || 'Fakten & Daten'}
                                </h3>
                                <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    {article.keyFacts.map((item, i) => (
                                        <div key={i} className="flex gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <p>{item.fact}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="my-10">
                        <AdSlot slotId="article-mid" format="auto" pageType="article" category={article.category} label={dict.ads.label} />
                    </div>

                    <NewsletterBox locale={locale} variant="inline" />

                    {article.sources?.length > 0 && (
                        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
                            <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400">
                                {dict.article.sourcesTitle}
                            </h3>
                            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {article.sources.map((source, i) => (
                                    <li key={i}>
                                        <a href={source.url} target="_blank" rel="noopener" className="flex items-center gap-2 text-sm hover:text-primary">
                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                                            {source.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {relatedArticles.length > 0 && (
                        <div className="mt-16 border-t border-slate-100 pt-12 dark:border-slate-800">
                            <h3 className="mb-8 text-xs font-black uppercase tracking-wider text-primary">
                                {dict.article.relatedTitle}
                            </h3>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                                {relatedArticles.map((rel) => (
                                    <Link key={rel.id} href={`/${locale}/artikel/${rel.slug}`} className="group block">
                                        <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-slate-100">
                                            <Image src={getArticleImageOrFallback(rel.image)} alt="" fill className="object-cover transition group-hover:scale-105" sizes="300px" unoptimized />
                                        </div>
                                        <h4 className="line-clamp-2 text-sm font-bold group-hover:text-primary">{rel.title}</h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase text-primary">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            {dict.article.backToHome}
                        </Link>
                    </div>
                </article>
            </main>
            <Footer locale={locale} />
        </>
    );
}
