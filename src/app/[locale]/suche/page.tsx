import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchClient from '@/components/search/SearchClient';

export default async function SearchPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;

    return (
        <div className="flex flex-col min-h-screen">
            <Header locale={locale} />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
                <SearchClient />
            </main>

            <Footer locale={locale} />
        </div>
    );
}