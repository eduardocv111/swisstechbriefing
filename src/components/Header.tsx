import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[#0a0f1a] text-white px-4 h-12 md:h-14 flex items-center justify-between shadow-sm border-b border-white/5">
            <div className="flex items-center gap-2">
                <Link href="/" className="hover:opacity-90 transition-opacity flex items-center h-full">
                    <div className="relative h-6 w-32 md:h-8 md:w-44">
                        <Image
                            src="/assets/images/brand/logo-horizontal-dark.png"
                            alt="SwissTech Briefing"
                            fill
                            priority
                            className="object-contain"
                        />
                    </div>
                </Link>
            </div>
            <button className="flex items-center justify-center p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Suche">
                <span className="material-symbols-outlined text-2xl notranslate normal-case">search</span>
            </button>
        </header>
    );
}
