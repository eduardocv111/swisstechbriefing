import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo/site";
import { formatSwissDate } from "@/lib/formatDate";
import {
  getArticleBySlug,
  getRelatedArticles,
  getAllArticleSlugs,
} from "@/lib/articles.repo";
import NewsletterInlineCard from "@/components/NewsletterInlineCard";

export const runtime = "nodejs";
export const revalidate = 3600; // 1h ISR

type Props = {
  params: Promise<{ slug: string }>;
};

const FALLBACK_OG_IMAGE = "/assets/images/news/default-news.svg";

function stripHtml(html: string = ""): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadingTimeFromHtml(html: string = ""): number {
  const plainText = stripHtml(html);
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function toAbsoluteUrl(pathOrUrl?: string | null): string | undefined {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_CONFIG.url}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function toIsoDate(value?: string | Date | null): string | undefined {
  if (!value) return undefined;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function getArticleImageOrFallback(image?: string | null): string {
  return image && image.trim() ? image : FALLBACK_OG_IMAGE;
}

// ✅ Pre-render de slugs
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const slugs = await getAllArticleSlugs();
    return slugs
      .filter((s): s is string => typeof s === "string" && s.length > 0)
      .map((slug) => ({ slug }));
  } catch (error) {
    console.error("generateStaticParams error:", error);
    return [];
  }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  // ✅ notFound metadata
  if (!article) {
    return {
      title: "Artikel nicht gefunden",
      description: "Der angeforderte Artikel konnte nicht gefunden werden.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${article.title} | ${SITE_CONFIG.name}`;
  const description = article.excerpt ?? "";
  const url = `${SITE_CONFIG.url}/artikel/${article.slug}`;

  // ✅ og:image fallback automático
  const imageUrl = toAbsoluteUrl(getArticleImageOrFallback(article.image));
  // ✅ SEO/Discover: usar fecha real de publicación
  const publishedTime = toIsoDate(article.publishedAt);
  const modifiedTime = toIsoDate(article.dateModified);
  const authorName = article.author?.name ?? SITE_CONFIG.name;

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      type: "article",
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      authors: [authorName],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.category, article.slug, 3);

  const articleUrl = `${SITE_CONFIG.url}/artikel/${article.slug}`;
  const imageUrl = toAbsoluteUrl(getArticleImageOrFallback(article.image));
  // ✅ SEO/Discover: usar fecha real de publicación
  const publishedTime = toIsoDate(article.publishedAt);
  const modifiedTime = toIsoDate(article.dateModified);
  const readingTime = estimateReadingTimeFromHtml(article.contentHtml);

  // ✅ NewsArticle JSON-LD
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: article.title,
    description: article.excerpt,
    ...(imageUrl ? { image: [imageUrl] } : {}),
    articleSection: article.category,
    inLanguage: "de-CH",
    isAccessibleForFree: true,
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
    author: [
      {
        "@type": "Person",
        name: article.author?.name ?? SITE_CONFIG.name,
        url: `${SITE_CONFIG.url}/ueber-uns`,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  // ✅ Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Artikel",
        item: `${SITE_CONFIG.url}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  const heroImage = getArticleImageOrFallback(article.image);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main className="mx-auto min-h-screen max-w-3xl bg-slate-50 shadow-sm dark:bg-slate-900/50">
        <article className="px-6 pt-10 pb-16">
          <div className="mb-4">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              {article.category}
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-4xl">
            {article.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              <span>{formatSwissDate(article.datePublished)}</span>
            </div>

            <span className="opacity-30">|</span>

            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">schedule</span>
              <span>{readingTime} min Lesezeit</span>
            </div>

            <span className="opacity-30">|</span>

            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <span className="text-slate-400">Von</span>
              <span className="text-slate-900 dark:text-white">
                {article.author?.name ?? SITE_CONFIG.name}
              </span>
              {article.author?.role && (
                <>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="text-primary">{article.author.role}</span>
                </>
              )}
            </div>
          </div>

          <div className="relative mb-8 h-64 overflow-hidden rounded-xl md:h-96">
            <Image
              src={heroImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div className="prose prose-slate max-w-none leading-relaxed text-slate-800 dark:prose-invert dark:text-slate-200">
            <p className="text-lg font-medium leading-relaxed">{article.excerpt}</p>

            <div
              className="mt-6"
              dangerouslySetInnerHTML={{
                __html: article.contentHtml,
              }}
            />
          </div>

          <div className="mt-12 rounded-2xl border border-primary/10 bg-primary/5 p-2">
            <NewsletterInlineCard />
          </div>

          {article.sources && article.sources.length > 0 && (
            <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                <span className="material-symbols-outlined text-sm">link</span>
                Quellen & Referenzen
              </h3>

              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {article.sources.map((source, index) => (
                  <li key={`${source.url}-${index}`}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors group-hover:bg-primary dark:bg-slate-600" />
                      {source.name}
                      <span className="material-symbols-outlined text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                        open_in_new
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedArticles.length > 0 && (
            <div className="mt-16 border-t border-slate-100 pt-12 dark:border-slate-800">
              <h3 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-primary">
                Das könnte Sie auch interessieren
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/artikel/${rel.slug}`}
                    className="group flex flex-col"
                  >
                    <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg">
                      <Image
                        src={getArticleImageOrFallback(rel.image)}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>

                    <div className="mb-2 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
                      {formatSwissDate(rel.datePublished)}
                    </div>

                    <h4 className="line-clamp-2 text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                      {rel.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 border-t border-slate-100 pt-8 text-center dark:border-slate-800 md:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase text-primary transition-transform hover:translate-x-[-4px]"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Zurück zur Startseite
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}