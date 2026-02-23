import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-background-dark text-white px-4 h-16 flex items-center justify-between shadow-sm border-b border-white/5">
            <div className="flex items-center gap-2">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <h1 className="text-xl font-bold tracking-tight text-white uppercase cursor-pointer">
                        SwissTech <span className="text-primary">Briefing</span>
                    </h1>
                </Link>
            </div>
            <button className="flex items-center justify-center p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Suche">
                <span className="material-symbols-outlined text-2xl notranslate normal-case">search</span>
            </button>
        </header>
    );
}
