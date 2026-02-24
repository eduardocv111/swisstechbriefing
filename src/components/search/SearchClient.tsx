'use client';

import { useState, useMemo } from 'react';
import { ARTICLES } from '@/lib/data/mock';
import ArticleCard from '@/components/ArticleCard';

export default function SearchClient() {
    const [query, setQuery] = useState('');

    const filteredArticles = useMemo(() => {
        if (!query.trim()) return [];
        const lowQuery = query.toLowerCase();
        return ARTICLES.filter(art =>
            art.title.toLowerCase().includes(lowQuery) ||
            art.excerpt.toLowerCase().includes(lowQuery) ||
            art.category.toLowerCase().includes(lowQuery)
        );
    }, [query]);

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Suche</h1>

            <div className="relative mb-12">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    search
                </span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nach Themen, Artikeln oder Startups suchen..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
            </div>

            {query.trim() && filteredArticles.length > 0 ? (
                <div className="space-y-6">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                        {filteredArticles.length} Ergebnisse für "{query}"
                    </h2>
                    {filteredArticles.map(article => (
                        <ArticleCard
                            key={article.id}
                            title={article.title}
                            excerpt={article.excerpt}
                            category={article.category}
                            datePublished={article.datePublished}
                            image={article.image}
                            slug={article.slug}
                        />
                    ))}
                </div>
            ) : query.trim() ? (
                /* No Results State */
                <div className="text-center py-16 px-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl text-slate-300">search_off</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        Keine Ergebnisse gefunden
                    </h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                        Für "{query}" wurden leider keine passenden Artikel gefunden. Versuchen Sie es mit anderen Suchbegriffen.
                    </p>
                </div>
            ) : (
                /* Initial state */
                <div className="text-center py-16 opacity-40">
                    <span className="material-symbols-outlined text-6xl mb-4">manage_search</span>
                    <p>Geben Sie einen Suchbegriff ein, um zu beginnen.</p>
                </div>
            )}
        </div>
    );
}
