import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import ArticleCard from "@/components/ArticleCard";
import NewsletterInlineCard from "@/components/NewsletterInlineCard";
import Link from "next/link";
import Image from "next/image";
import { formatSwissDate } from "@/lib/formatDate";
import { getLatestArticles } from "@/lib/articles.repo";

export const runtime = "nodejs";

/**
 * Revalida cada 60 segundos.
 * Reduce carga en VPS pero mantiene artículos casi en tiempo real.
 */
export const revalidate = 60;

const FALLBACK_IMAGE = "/assets/images/news/default-news.svg";

function getArticleImage(url?: string | null): string {
  if (!url || url.trim() === "") return FALLBACK_IMAGE;
  return url;
}

export default async function Home() {
  const articles = await getLatestArticles(30);

  const featured = articles.length > 0 ? articles[0] : null;
  const rest = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <CategoryTabs />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:py-12">
        {/* ================= FEATURED ================= */}
        {featured ? (
          <section className="mb-12 md:mb-20">
            <Link href={`/artikel/${featured.slug}`} className="block">
              <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-background-light shadow-lg dark:border-slate-800 dark:bg-slate-900 lg:flex-row">
                {/* Imagen */}
                <div className="relative min-h-[300px] overflow-hidden md:min-h-[400px] lg:w-3/5">
                  <Image
                    src={getArticleImage(featured.image)}
                    alt={featured.title}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden" />
                </div>

                {/* Texto */}
                <div className="flex flex-col justify-center p-8 md:p-10 lg:w-2/5">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="rounded-sm bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                      {featured.category}
                    </span>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      {formatSwissDate(featured.datePublished)}
                    </span>
                  </div>

                  <h2 className="mb-6 text-3xl font-bold leading-[1.15] text-slate-900 dark:text-white transition-colors decoration-primary/30 decoration-2 underline-offset-4 group-hover:text-primary group-hover:underline md:text-4xl">
                    {featured.title}
                  </h2>

                  <p className="mb-8 line-clamp-3 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                    {featured.excerpt}
                  </p>

                  <div className="mt-auto flex items-center text-sm font-bold uppercase tracking-widest text-primary transition-all group-hover:gap-2">
                    Bericht lesen
                    <span className="material-symbols-outlined ml-1.5 text-lg notranslate normal-case">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </section>
        ) : (
          <section className="mb-12 rounded-2xl border border-slate-200 bg-background-light p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:mb-20">
            <h2 className="mb-2 text-xl font-bold">Noch keine Artikel</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Publiziere deinen ersten Artikel über{" "}
              <code className="rounded bg-slate-100 px-2 py-1 text-sm dark:bg-slate-800">
                /api/admin/publish
              </code>
              , dann erscheint er hier automatisch.
            </p>
          </section>
        )}

        {/* ================= LISTA RESTO ================= */}
        {rest.length > 0 && (
          <div className="space-y-10">
            <section>
              <div className="mb-8 flex items-center gap-4">
                <h3 className="whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] text-primary">
                  Analysen & Meldungen
                </h3>
                <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="grid grid-cols-1 gap-8">
                {rest.slice(0, 2).map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    category={article.category}
                    datePublished={article.datePublished}
                    image={article.image}
                    slug={article.slug}
                    priority
                  />
                ))}

                <div className="my-4">
                  <NewsletterInlineCard />
                </div>

                {rest.slice(2).map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    category={article.category}
                    datePublished={article.datePublished}
                    image={article.image}
                    slug={article.slug}
                  />
                ))}
              </div>
            </section>

            <div className="flex justify-center pb-8 pt-12">
              <Link
                href="/suche"
                className="rounded-full border border-slate-300 px-12 py-4 text-xs font-black uppercase tracking-widest text-slate-600 shadow-sm transition-all hover:scale-105 hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-900"
              >
                Archiv durchsuchen
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}