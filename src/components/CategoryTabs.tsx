import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

type Props = {
    activeCategory?: string; // label
    locale?: string;
};

// Simple mapping for demo, usually this would come from the dictionary
const CATEGORY_TRANSLATIONS: Record<string, Record<string, string>> = {
    'de-CH': {
        'KI': 'KI',
        'Startups': 'Startups',
        'Regulierung': 'Regulierung',
        'Defense & Security Tech': 'Defense Tech'
    },
    'fr-CH': {
        'KI': 'IA',
        'Startups': 'Startups',
        'Regulierung': 'Régulation',
        'Defense & Security Tech': 'Défense'
    },
    'it-CH': {
        'KI': 'IA',
        'Startups': 'Startup',
        'Regulierung': 'Regolamento',
        'Defense & Security Tech': 'Difesa'
    },
    'en': {
        'KI': 'AI',
        'Startups': 'Startups',
        'Regulierung': 'Regulation',
        'Defense & Security Tech': 'Defense'
    }
};

export default function CategoryTabs({ activeCategory, locale = 'de-CH' }: Props) {
    const labels = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS['de-CH'];

    return (
        <nav className="bg-background-light dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-12 md:top-14 z-40">
            <div className="flex overflow-x-auto px-4 gap-6 py-3 items-center no-scrollbar">
                <Link
                    href={`/${locale}`}
                    aria-current={!activeCategory ? "page" : undefined}
                    className={`whitespace-nowrap text-sm pb-1 border-b-2 transition-colors ${!activeCategory
                        ? "font-bold text-primary border-primary"
                        : "font-medium text-slate-500 dark:text-slate-400 hover:text-primary border-transparent"
                        }`}
                >
                    {locale === 'de-CH' ? 'Alle' : locale === 'fr-CH' ? 'Tous' : locale === 'it-CH' ? 'Tutti' : 'All'}
                </Link>

                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.label;
                    const translatedLabel = labels[cat.label] || cat.label;

                    return (
                        <Link
                            key={cat.slug}
                            href={`/${locale}/kategorie/${cat.slug}`}
                            aria-current={isActive ? "page" : undefined}
                            className={`whitespace-nowrap text-sm pb-1 border-b-2 transition-colors ${isActive
                                ? "font-bold text-primary border-primary"
                                : "font-medium text-slate-500 dark:text-slate-400 hover:text-primary border-transparent"
                                }`}
                        >
                            {translatedLabel}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}