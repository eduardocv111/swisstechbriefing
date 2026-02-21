import Link from 'next/link';
import { CATEGORIES } from '@/lib/data/mock';

export default function CategoryTabs({ activeCategory }: { activeCategory?: string }) {
    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
            <div className="flex overflow-x-auto hide-scrollbar px-4 gap-6 py-3 items-center">
                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.name;
                    return (
                        <Link
                            key={cat.slug}
                            href={cat.href}
                            className={`whitespace-nowrap text-sm pb-1 border-b-2 transition-colors ${isActive
                                    ? 'font-bold text-primary border-primary'
                                    : 'font-medium text-slate-500 dark:text-slate-400 hover:text-primary border-transparent'
                                }`}
                        >
                            {cat.name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
