import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[#0a0f1a] text-white px-4 h-14 flex items-center justify-between shadow-sm border-b border-white/5">
            <Link href="/" className="hover:opacity-90 transition-opacity flex items-center gap-2.5 shrink-0">
                {/* Logo icon — cropped square, no padding issues */}
                <div className="relative w-8 h-8 sm:w-7 sm:h-7 shrink-0">
                    <Image
                        src="/assets/images/brand/logo-square.png"
                        alt=""
                        fill
                        priority
                        sizes="32px"
                        className="object-contain"
                        aria-hidden="true"
                    />
                </div>
                {/* Brand name — HTML text, fully controllable size */}
                <span className="text-lg sm:text-base font-bold tracking-tight text-white leading-none">
                    <span className="text-white">Swiss</span>
                    <span className="text-blue-500">Tech</span>
                    <span className="text-white font-normal ml-1">Briefing</span>
                </span>
            </Link>
            <button
                className="flex items-center justify-center p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
                aria-label="Suche"
            >
                <span className="material-symbols-outlined text-2xl notranslate normal-case">search</span>
            </button>
        </header>
    );
}
