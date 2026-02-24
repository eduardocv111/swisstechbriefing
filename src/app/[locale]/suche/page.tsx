import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchClient from '@/components/search/SearchClient';
import { getDictionary } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/config';
import { searchArticles } from '@/lib/articles.repo';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/seo/site';

type Props = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { locale } = await params;
    const { q } = await searchParams;
    const dict = await getDictionary(locale as Locale);

    return {
        title: q ? `${dict.search.results_for} "${q}" | ${SITE_CONFIG.name}` : `${dict.search.title} | ${SITE_CONFIG.name}`,
        robots: {
            index: false,
            follow: true
        }
    };
}

export default async function SearchPage({
    params,
    searchParams
}: Props) {
    const { locale } = await params;
    const { q } = await searchParams;
    const dict = await getDictionary(locale as Locale);

    const query = q || '';
    const results = query ? await searchArticles(locale, query) : [];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            <Header locale={locale} />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
                <SearchClient
                    locale={locale}
                    initialQuery={query}
                    initialResults={results}
                    dict={dict.search}
                />
            </main>

            <Footer locale={locale} />
        </div>
    );
}