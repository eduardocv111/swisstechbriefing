import Link from 'next/link';
import Image from 'next/image';
import { formatSwissDate } from '@/lib/formatDate';

interface ArticleCardProps {
    title: string;
    excerpt: string;
    category: string;
    datePublished: string;
    image: string;
    slug: string;
    priority?: boolean;
    locale?: string;
}

export default function ArticleCard({
    title,
    excerpt,
    category,
    datePublished,
    image,
    slug,
    priority = false,
    locale = 'de-CH',
}: ArticleCardProps) {
    return (
        <Link href={`/${locale}/artikel/${slug}`} className="group block">
            <article className="bg-background-light dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-5 items-start hover:shadow-md transition-shadow duration-200">
                {/* Image */}
                <div className="w-full md:w-36 h-28 flex-shrink-0 rounded-md bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 144px"
                        priority={priority}
                    />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold tracking-wide text-blue-700 uppercase">
                            {category}
                        </span>
                        <time
                            className="text-[11px] text-slate-400"
                            dateTime={datePublished}
                            suppressHydrationWarning
                        >
                            {formatSwissDate(datePublished, locale)}
                        </time>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold leading-snug mb-2 text-slate-900 dark:text-white transition-colors duration-200 group-hover:text-blue-700">
                        <span className="underline-offset-4 group-hover:underline">{title}</span>
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{excerpt}</p>
                </div>
            </article>
        </Link>
    );
}