import Link from 'next/link';
import Image from 'next/image';
import { formatSwissDate } from '@/lib/formatDate';

interface ArticleCardProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    datePublished: string;
    image: string;
    slug: string;
}

export default function ArticleCard({ title, excerpt, category, date, datePublished, image, slug }: ArticleCardProps) {
    return (
        <Link href={`/artikel/${slug}`}>
            <article className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-start hover:shadow-md transition-shadow cursor-pointer group">
                <div className="w-full md:w-32 h-24 flex-shrink-0 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <Image
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 128px"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-primary uppercase">{category}</span>
                        <span className="text-[10px] text-slate-400">{formatSwissDate(datePublished)}</span>
                    </div>
                    <h4 className="text-lg font-bold leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                        {excerpt}
                    </p>
                </div>
            </article>
        </Link>
    );
}
