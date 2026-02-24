import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
            <Header locale="de-CH" />
            <main className="flex-1 flex flex-col items-center justify-center px-4 text-center py-20">
                <h1 className="text-6xl font-black text-primary mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Seite nicht gefunden</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-md">
                    Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
                </p>
                <Link
                    href="/de-CH"
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                >
                    Zurück zur Startseite
                </Link>
            </main>
            <Footer locale="de-CH" />
        </div>
    );
}
