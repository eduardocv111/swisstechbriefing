import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

type Props = {
    activeCategory?: string; // label
};

export default function CategoryTabs({ activeCategory }: Props) {
    return (
        <nav className="bg-background-light dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
            <div className="flex overflow-x-auto px-4 gap-6 py-3 items-center no-scrollbar">

                {/* 🔹 Alle (Home) */}
                <Link
                    href="/"
                    aria-current={!activeCategory ? "page" : undefined}
                    className={`whitespace-nowrap text-sm pb-1 border-b-2 transition-colors ${!activeCategory
                        ? "font-bold text-primary border-primary"
                        : "font-medium text-slate-500 dark:text-slate-400 hover:text-primary border-transparent"
                        }`}
                >
                    Alle
                </Link>

                {/* 🔹 Categorías dinámicas */}
                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.label;

                    return (
                        <Link
                            key={cat.slug}
                            href={`/kategorie/${cat.slug}`}
                            aria-current={isActive ? "page" : undefined}
                            className={`whitespace-nowrap text-sm pb-1 border-b-2 transition-colors ${isActive
                                ? "font-bold text-primary border-primary"
                                : "font-medium text-slate-500 dark:text-slate-400 hover:text-primary border-transparent"
                                }`}
                        >
                            {cat.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}