import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import ArticleCard from "@/components/ArticleCard";
import NewsletterBox from "@/components/newsletter/NewsletterBox";
import AdSlot from "@/components/consent/AdSlot";
import Link from "next/link";
import Image from "next/image";
import MobileAppCTA from "@/components/MobileAppCTA";
import { formatSwissDate } from "@/lib/formatDate";
import { getLatestArticles } from "@/lib/articles.repo";
import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from "@/i18n/config";

export const revalidate = 60; // Refresh page every 60 seconds to show new AI news

import MarketSnapshotCard from "@/components/MarketSnapshotCard";
import MarketTicker from "@/components/MarketTicker";
import { getLatestMarketSnapshot } from "@/lib/market.repo";

interface PageProps {
    params: Promise<{ locale: string }>;
}

function estimateReadingTime(html: string = ""): number {
    const text = html.replace(/<[^>]*>/g, "").trim();
    const words = text ? text.split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(words / 200));
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FALLBACK_IMAGE = "/assets/images/news/default-news.svg";

function getArticleImage(url?: string | null): string {
    if (!url || url.trim() === "") return FALLBACK_IMAGE;
    return url;
}

export default async function Home({ params }: PageProps) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const articles = await getLatestArticles(locale, 30);
    const market = getLatestMarketSnapshot();

    const featured = articles.length > 0 ? articles[0] : null;
    const collageArticles = articles.slice(1, 5);
    const rest = articles.slice(5);

    return (
        <div className="flex min-h-screen flex-col">
            <Header locale={locale} />
            <CategoryTabs locale={locale} />
            <MarketTicker initial={market} />

            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:py-12">
                {/* ================= FEATURED HERO ================= */}
                {featured ? (
                    <section className="mb-12 md:mb-20">
                        <Link href={`/${locale}/artikel/${featured.slug}`} className="block">
                            <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-background-light shadow-lg dark:border-slate-800 dark:bg-slate-900 lg:flex-row">
                                <div className="relative max-h-[45vh] overflow-hidden md:max-h-none lg:w-3/5">
                                    <div className="aspect-video relative w-full">
                                        <Image
                                            src={getArticleImage(featured.image)}
                                            alt={featured.title}
                                            fill
                                            priority
                                            unoptimized
                                            sizes="(max-width: 1024px) 100vw, 60vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden" />
                                </div>

                                <div className="flex flex-col justify-center p-6 md:p-10 lg:w-2/5">
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="rounded-sm bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                                            {featured.category}
                                        </span>
                                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                                            {formatSwissDate(featured.datePublished)}
                                        </span>
                                    </div>

                                    <h2 className="mb-3 text-2xl font-bold leading-[1.15] text-slate-900 dark:text-white transition-colors decoration-primary/30 decoration-2 underline-offset-4 group-hover:text-primary group-hover:underline md:text-4xl">
                                        {featured.title}
                                    </h2>

                                    <p className="mb-5 line-clamp-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                                        {featured.excerpt}
                                    </p>

                                    <div className="mb-6 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                                        {featured.author?.name && (
                                            <span className="font-semibold text-slate-500 dark:text-slate-400">
                                                {featured.author.name}
                                            </span>
                                        )}
                                        <span className="h-0.5 w-0.5 rounded-full bg-slate-400"></span>
                                        <span>{estimateReadingTime(featured.contentHtml)} {dict.article.readTime}</span>
                                    </div>

                                    <div className="mt-auto flex items-center text-base sm:text-sm font-extrabold uppercase tracking-widest text-primary transition-all group-hover:gap-2">
                                        {dict.article.readMore}
                                        <span className="material-symbols-outlined ml-1.5 text-lg notranslate normal-case">
                                            arrow_forward
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </section>
                ) : null}

                {/* ================= EDITORIAL COLLAGE 2×2 ================= */}
                {collageArticles.length > 0 && (
                    <section className="mb-12 md:mb-16">
                        <div className="mb-8 flex items-center gap-4">
                            <h3 className="whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] text-primary">
                                {dict.home.featured_title}
                            </h3>
                            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
                        </div>

                        <div className="grid grid-cols-2 gap-[3px] rounded-xl overflow-hidden bg-slate-800">
                            {collageArticles.map((article, idx) => (
                                <Link
                                    key={article.id}
                                    href={`/${locale}/artikel/${article.slug}`}
                                    className="group relative block"
                                >
                                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        <Image
                                            src={getArticleImage(article.image)}
                                            alt={article.title}
                                            fill
                                            unoptimized
                                            sizes="(max-width: 640px) 50vw, 25vw"
                                            priority={idx < 2}
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                                            <span className="mb-1 self-start rounded-sm bg-primary/90 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white">
                                                {article.category}
                                            </span>
                                            <h4 className="text-xs sm:text-sm md:text-base font-bold leading-tight text-white line-clamp-2 sm:line-clamp-3 drop-shadow-sm transition-colors group-hover:text-primary/90">
                                                {article.title}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── Ad slot: after hero ── */}
                <div className="mb-12 md:mb-20">
                    <AdSlot
                        slotId="home-after-hero"
                        format="horizontal"
                        pageType="home"
                        minHeight={90}
                        label={dict.ads.label}
                    />
                </div>

                {/* ================= MOBILE APP CTA ================= */}
                <section className="mb-16 md:mb-24">
                    <MobileAppCTA locale={locale} />
                </section>

                {/* ================= NEWSLETTER HERO ================= */}
                <section className="mb-16 md:mb-24">
                    <NewsletterBox locale={locale} variant="hero" />
                </section>

                {/* ================= REMAINING ARTICLES LIST ================= */}
                {rest.length > 0 && (
                    <section>
                        <div className="mb-8 flex items-center gap-4">
                            <h3 className="whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] text-primary">
                                {dict.home.latest_title}
                            </h3>
                            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            {rest.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    locale={locale}
                                    title={article.title}
                                    excerpt={article.excerpt}
                                    category={article.category}
                                    datePublished={article.datePublished}
                                    image={article.image}
                                    slug={article.slug}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer locale={locale} />
        </div>
    );
}
