import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryTabs from '@/components/CategoryTabs';
import ArticleCard from '@/components/ArticleCard';
import NewsletterInlineCard from '@/components/NewsletterInlineCard';
import { FEATURED_ARTICLE, ARTICLES } from '@/lib/data/mock';
import Link from 'next/link';
import { formatSwissDate } from '@/lib/formatDate';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <CategoryTabs />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Featured Article (Editorial Hero) */}
        <section className="mb-12 md:mb-20">
          <Link href={`/artikel/${FEATURED_ARTICLE.slug}`}>
            <article className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-stretch">
              <div className="lg:w-3/5 overflow-hidden relative min-h-[300px] md:min-h-[400px]">
                <Image
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  src={FEATURED_ARTICLE.image}
                  alt={FEATURED_ARTICLE.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden" />
              </div>
              <div className="lg:w-2/5 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                    {FEATURED_ARTICLE.category}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">{formatSwissDate(FEATURED_ARTICLE.datePublished)}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-[1.15] mb-6 group-hover:text-primary transition-colors decoration-primary/30 decoration-2 underline-offset-4 group-hover:underline">
                  {FEATURED_ARTICLE.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed line-clamp-3 mb-8">
                  {FEATURED_ARTICLE.excerpt}
                </p>
                <div className="mt-auto flex items-center text-primary font-bold text-sm uppercase tracking-widest group-hover:gap-2 transition-all">
                  Bericht lesen <span className="material-symbols-outlined ml-1.5 text-lg">arrow_forward</span>
                </div>
              </div>
            </article>
          </Link>
        </section>

        {/* Section Divider & Title */}
        <div className="space-y-10">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary whitespace-nowrap">Analysen & Meldungen</h3>
              <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Article List */}
            <div className="grid grid-cols-1 gap-8">
              {ARTICLES.slice(0, 2).map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  date={article.date}
                  datePublished={article.datePublished}
                  image={article.image}
                  slug={article.slug}
                />
              ))}

              <div className="my-4">
                <NewsletterInlineCard />
              </div>

              {ARTICLES.slice(2).map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  date={article.date}
                  datePublished={article.datePublished}
                  image={article.image}
                  slug={article.slug}
                />
              ))}
            </div>
          </section>

          {/* Load More Section */}
          <div className="pt-12 pb-8 flex justify-center">
            <button className="px-12 py-4 border border-slate-300 dark:border-slate-700 rounded-full text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:scale-105 active:scale-95 shadow-sm">
              Archiv durchsuchen
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
