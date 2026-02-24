import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/categories';
import CookieSettingsButton from '@/components/consent/CookieSettingsButton';
import { getDictionary } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/config';

interface FooterProps {
    locale?: string;
}

export default async function Footer({ locale = 'de-CH' }: FooterProps) {
    const dict = await getDictionary(locale as Locale);

    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link href={`/${locale}`} className="hover:opacity-90 transition-opacity flex items-center gap-2.5">
                            <div className="relative w-8 h-8 shrink-0">
                                <Image
                                    src="/assets/images/brand/logo-square.png"
                                    alt=""
                                    fill
                                    sizes="32px"
                                    className="object-contain"
                                    aria-hidden="true"
                                />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white leading-none">
                                <span className="text-white">Swiss</span>
                                <span className="text-blue-500">Tech</span>
                                <span className="text-white font-normal ml-1">Briefing</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs text-slate-400">
                            {dict.footer.description}
                        </p>
                    </div>
                    {/* Column 2: Navigation */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">{dict.footer.navigation}</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href={`/${locale}`} className="hover:text-primary transition-colors">{dict.nav.home}</Link></li>
                            <li><Link href={`/${locale}/ueber-uns`} className="hover:text-primary transition-colors">{dict.nav.about}</Link></li>
                            {CATEGORIES.map((cat) => (
                                <li key={cat.slug}>
                                    <Link href={`/${locale}/kategorie/${cat.slug}`} className="hover:text-primary transition-colors">
                                        {cat.label}
                                    </Link>
                                </li>
                            ))}
                            <li><Link href={`/${locale}/newsletter`} className="hover:text-primary transition-colors font-medium text-white">{dict.nav.newsletter}</Link></li>
                        </ul>
                    </div>
                    {/* Column 3: Rechtliches */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">{dict.footer.legal}</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href={`/${locale}/impressum`} className="hover:text-primary transition-colors">Impressum</Link></li>
                            <li><Link href={`/${locale}/datenschutz`} className="hover:text-primary transition-colors">Datenschutz</Link></li>
                            <li><Link href={`/${locale}/kontakt`} className="hover:text-primary transition-colors">Kontakt</Link></li>
                            <li><CookieSettingsButton /></li>
                        </ul>
                    </div>
                </div>
                {/* Bottom Line */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] tracking-wide">
                        © 2026 SwissTech Briefing. {dict.footer.rights}
                    </p>
                    <div className="flex gap-6 text-[11px] font-medium uppercase tracking-widest">
                        <span className="text-slate-600">{dict.footer.location}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
