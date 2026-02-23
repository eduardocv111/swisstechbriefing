import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[#0a0f1a] text-white px-4 h-14 flex items-center justify-between shadow-sm border-b border-white/5">
            <div className="flex items-center shrink-0">
                <Link href="/" className="hover:opacity-90 transition-opacity flex items-center gap-2">
                    {/* Logo image — visible and premium-sized */}
                    <div className="relative w-[200px] h-[48px] sm:w-[180px] sm:h-[44px] shrink-0">
                        <Image
                            src="/assets/images/brand/logo-horizontal-dark.png"
                            alt="SwissTech Briefing"
                            fill
                            priority
                            sizes="200px"
                            className="object-contain object-left"
                        />
                    </div>
                </Link>
            </div>
            <button
                className="flex items-center justify-center p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
                aria-label="Suche"
            >
                <span className="material-symbols-outlined text-2xl notranslate normal-case">search</span>
            </button>
        </header>
    );
}
