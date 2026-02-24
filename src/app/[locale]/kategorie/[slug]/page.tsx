import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, CATEGORIES } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles.repo";
import { getDictionary } from "@/i18n/get-dictionary";
import { Locale, defaultLocale, locales } from "@/i18n/config";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo/site";

export const runtime = "nodejs";
export const revalidate = 3600;

type Props = {
    params: Promise<{ slug: string; locale: string }>;
};

const getTranslatedCategoryLabel = (label: string, dict: any) => {
    const key = label.toLowerCase();
    if (key.includes('ki') || key.includes('ai')) return dict.categories.ki;
    if (key.includes('startup')) return dict.categories.startups;
    if (key.includes('regulierung') || key.includes('regulation')) return dict.categories.regulation;
    if (key.includes('defense')) return dict.categories.defense;
    return label;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const category = getCategoryBySlug(slug);
    const dict = await getDictionary(locale);

    if (!category) return { title: "Not Found" };

    const label = getTranslatedCategoryLabel(category.label, dict);
    const title = `${label} | ${SITE_CONFIG.name}`;

    // Hreflang
    const languages: Record<string, string> = {};
    locales.forEach(loc => {
        languages[loc] = `${SITE_CONFIG.url}/${loc}/kategorie/${slug}`;
    });

    return {
        title,
        alternates: {
            canonical: `${SITE_CONFIG.url}/${locale}/kategorie/${slug}`,
            languages,
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug, locale } = await params;
    const dict = await getDictionary(locale as Locale);

    const category = getCategoryBySlug(slug);
    if (!category) return notFound();

    const articles = await getArticlesByCategory(locale, category.label, 50);
    const translatedLabel = getTranslatedCategoryLabel(category.label, dict);

    return (
        <div className="flex flex-col min-h-screen">
            <Header locale={locale} />
            <CategoryTabs activeCategory={category.slug} locale={locale} />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                        {translatedLabel}
                    </h2>
                </div>

                <div className="space-y-6">
                    {articles.length > 0 ? (
                        articles.map((a) => (
                            <ArticleCard
                                key={a.id}
                                locale={locale}
                                title={a.title}
                                excerpt={a.excerpt}
                                category={a.category}
                                datePublished={a.datePublished}
                                image={a.image}
                                slug={a.slug}
                            />
                        ))
                    ) : (
                        <div className="text-slate-500 italic text-sm mb-8 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                            {dict.home.no_articles}
                            <div className="mt-6">
                                <Link href={`/${locale}`} className="text-xs font-bold text-primary uppercase hover:underline inline-flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                    {dict.article.backToHome}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer locale={locale} />
        </div>
    );
}
