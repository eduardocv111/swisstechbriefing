import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryTabs from '@/components/CategoryTabs';
import ArticleCard from '@/components/ArticleCard';
import { ARTICLES, FEATURED_ARTICLE, CATEGORIES } from '@/lib/data/mock';
import { use } from 'react';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    // Find category based on slug
    const activeCategory = CATEGORIES.find(cat => cat.slug === slug);
    const categoryName = activeCategory?.name || slug;

    // Search in both featured and list articles
    const allArticles = [FEATURED_ARTICLE, ...ARTICLES];

    // Filter articles by categorySlug
    const filteredArticles = allArticles.filter(art => art.categorySlug === slug);

    return (
        <>
            <Header />
            <CategoryTabs activeCategory={categoryName} />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                        Schwerpunkt: {categoryName}
                    </h2>
                </div>

                <div className="space-y-4">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map(article => (
                            <ArticleCard
                                key={article.id}
                                title={article.title}
                                excerpt={article.excerpt}
                                category={article.category}
                                date={article.date}
                                datePublished={article.datePublished}
                                image={article.image}
                                slug={article.slug}
                            />
                        ))
                    ) : (
                        <p className="text-slate-500 italic text-sm mb-8">
                            Aktuell liegen keine weiteren Meldungen zum Thema {categoryName} vor.
                        </p>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
