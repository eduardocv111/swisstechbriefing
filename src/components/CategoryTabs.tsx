import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = {
    activeCategory?: string; // slug
    locale?: string;
};

export default async function CategoryTabs({ activeCategory, locale = 'de-CH' }: Props) {
    const dict = await getDictionary(locale);

    // Map internal category labels to dictionary keys
    const getTranslatedLabel = (label: string) => {
        const key = label.toLowerCase();
        if (key.includes('ki') || key.includes('ai')) return dict.categories.ki;
        if (key.includes('startup')) return dict.categories.startups;
        if (key.includes('regulierung') || key.includes('regulation')) return dict.categories.regulation;
        if (key.includes('defense')) return dict.categories.defense;
        return label;
    };

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
                    {dict.categories.all}
                </Link>

                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.slug;
                    const translatedLabel = getTranslatedLabel(cat.label);

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
