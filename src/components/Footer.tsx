import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <h2 className="text-white font-bold text-lg tracking-tight uppercase">SwissTech Briefing</h2>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Kuratiertes Medium für KI, Startups und Technologie in der Schweiz. Tägliche Einblicke in die digitale Transformation.
                        </p>
                    </div>
                    {/* Column 2: Navigation */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Navigation</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/ueber-uns" className="hover:text-primary transition-colors">Über uns</Link></li>
                            {CATEGORIES.map((cat) => (
                                <li key={cat.slug}>
                                    <Link href={`/kategorie/${cat.slug}`} className="hover:text-primary transition-colors">
                                        {cat.label}
                                    </Link>
                                </li>
                            ))}
                            <li><Link href="/newsletter" className="hover:text-primary transition-colors font-medium text-white">Newsletter</Link></li>
                        </ul>
                    </div>
                    {/* Column 3: Rechtliches */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Rechtliches</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/impressum" className="hover:text-primary transition-colors">Impressum</Link></li>
                            <li><Link href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link></li>
                            <li><Link href="/kontakt" className="hover:text-primary transition-colors">Kontakt</Link></li>
                        </ul>
                    </div>
                </div>
                {/* Bottom Line */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] tracking-wide">
                        © 2026 SwissTech Briefing. Alle Rechte vorbehalten.
                    </p>
                    <div className="flex gap-6 text-[11px] font-medium uppercase tracking-widest">
                        <span className="text-slate-600">Zurich, Schweiz</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
