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
import NewsletterInlineCard from "@/components/NewsletterInlineCard";
import ScrollProgress from "@/components/ScrollProgress";
import ShareButtons from "@/components/ShareButtons";
import AdSlot from "@/components/consent/AdSlot";
import { Locale, defaultLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

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

function estimateReadingTimeFromHtml(html: string = ""): number {
    const plainText = stripHtml(html);
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(wordCount / 200));
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
    // If fallback to DE-CH, canonical points to /de-CH/
    const canonicalLocale = article.isFallback ? defaultLocale : locale;
    const canonicalUrl = `${SITE_CONFIG.url}/${canonicalLocale}/artikel/${article.slug}`;

    const imageUrl = toAbsoluteUrl(getArticleImageOrFallback(article.image));
    const publishedTime = toIsoDate(article.publishedAt);
    const modifiedTime = toIsoDate(article.dateModified);
    const authorName = article.author?.name ?? SITE_CONFIG.name;

    // Hreflang logic
    const languages: Record<string, string> = {};
    article.availableLocales.forEach(loc => {
        languages[loc] = `${SITE_CONFIG.url}/${loc}/artikel/${article.slug}`;
    });
    languages['x-default'] = `${SITE_CONFIG.url}/${defaultLocale}/artikel/${article.slug}`;

    return {
        metadataBase: new URL(SITE_CONFIG.url),
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages,
        },
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
    const readingTime = estimateReadingTimeFromHtml(article.contentHtml);

    const newsArticleJsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        description: article.excerpt,
        image: imageUrl ? [imageUrl] : [],
        datePublished: publishedTime,
        dateModified: modifiedTime,
        author: [{ "@type": "Person", name: article.author?.name ?? SITE_CONFIG.name }],
        publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }} />
            <Header locale={locale} />
            <ScrollProgress />

            <main className="mx-auto min-h-screen max-w-3xl px-6 pt-10 pb-16">
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
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                            {article.category}
                        </span>
                    </div>

                    <h1 className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-4xl">
                        {article.title}
                    </h1>

                    <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            <span>{formatSwissDate(article.datePublished)}</span>
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

                    <div className="relative my-8 aspect-video overflow-hidden rounded-xl">
                        <Image src={getArticleImageOrFallback(article.image)} alt={article.title} fill className="object-cover" sizes="100vw" unoptimized />
                    </div>

                    <div className="prose prose-slate max-w-none dark:prose-invert">
                        <p className="text-lg font-medium leading-relaxed">{article.excerpt}</p>
                        <div className="mt-6" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
                    </div>

                    <div className="my-10">
                        <AdSlot slotId="article-mid" format="auto" pageType="article" category={article.category} label="Anzeige" />
                    </div>

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
