import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchClient from '@/components/search/SearchClient';

export default function SearchPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
                <SearchClient />
            </main>

            <Footer />
        </div>
    );
}