'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import { UiArticle } from '@/lib/articles.repo';

interface SearchClientProps {
    locale: string;
    initialQuery: string;
    initialResults: UiArticle[];
    dict: {
        title: string;
        placeholder: string;
        results_for: string;
        no_results_title: string;
        no_results_desc: string;
        initial_desc: string;
        fallback_results: string;
    };
}

export default function SearchClient({ locale, initialQuery, initialResults, dict }: SearchClientProps) {
    const [query, setQuery] = useState(initialQuery);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        startTransition(() => {
            router.push(`/${locale}/suche?q=${encodeURIComponent(query.trim())}`);
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-8 text-slate-900 dark:text-white leading-tight">
                {dict.title}
            </h1>

            <form onSubmit={handleSearch} className="relative mb-12">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    search
                </span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={dict.placeholder}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg shadow-sm focus:border-primary"
                />
                {isPending && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                )}
            </form>

            {initialQuery.trim() && initialResults.length > 0 ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col gap-2 mb-6">
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                            {initialResults.length} {dict.results_for} "{initialQuery}"
                        </h2>
                        {locale !== 'de-CH' && initialResults.every((a: UiArticle) => a.isFallback) && (
                            <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                <span className="material-symbols-outlined text-base">info</span>
                                <span>{dict.fallback_results}</span>
                            </div>
                        )}
                    </div>
                    {initialResults.map((article: UiArticle) => (
                        <ArticleCard
                            key={article.id}
                            title={article.title}
                            excerpt={article.excerpt}
                            category={article.category}
                            datePublished={article.datePublished}
                            image={article.image}
                            slug={article.slug}
                            locale={locale}
                        />
                    ))}
                </div>
            ) : initialQuery.trim() ? (
                /* No Results State */
                <div className="text-center py-20 px-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {dict.no_results_title}
                    </h3>
                    <p className="text-slate-500 text-base max-w-xs mx-auto leading-relaxed">
                        {dict.no_results_desc.replace('{query}', initialQuery)}
                    </p>
                </div>
            ) : (
                /* Initial state */
                <div className="text-center py-20 opacity-30 animate-in fade-in duration-700">
                    <span className="material-symbols-outlined text-7xl mb-6 block">manage_search</span>
                    <p className="text-lg font-medium">{dict.initial_desc}</p>
                </div>
            )}
        </div>
    );
}
