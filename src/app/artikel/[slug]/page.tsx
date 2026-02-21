import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ARTICLES, FEATURED_ARTICLE, Article } from '@/lib/data/mock';
import ArticleCard from '@/components/ArticleCard';
import { SITE_CONFIG } from '@/lib/seo/site';
import { Metadata } from 'next';
import Link from 'next/link';
import { formatSwissDate } from '@/lib/formatDate';

type Props = {
    params: Promise<{ slug: string }>;
};

// Search in both featured and list articles
function getArticle(slug: string): Article | undefined {
    const allArticles: Article[] = [FEATURED_ARTICLE, ...ARTICLES];
    return allArticles.find(a => a.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticle(slug);

    if (!article) return { title: 'Artikel nicht gefunden' };

    const title = `${article.title} | ${SITE_CONFIG.name}`;
    const description = article.excerpt;
    const url = `${SITE_CONFIG.url}/artikel/${article.slug}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_CONFIG.name,
            images: [{ url: article.image }],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [article.image],
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = getArticle(slug);

    if (!article) {
        return (
            <>
                <Header />
                <main className="max-w-3xl mx-auto py-20 text-center">
                    <h1 className="text-2xl font-bold">Artikel nicht gefunden</h1>
                    <p className="text-slate-500 mt-2">Der angeforderte Beitrag existiert leider nicht.</p>
                </main>
                <Footer />
            </>
        );
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        image: [article.image],
        datePublished: article.date === 'Aktuell' ? '2026-05-20T08:00:00+02:00' : '2026-05-20T08:00:00+02:00', // Mock dates
        dateModified: article.date === 'Aktuell' ? '2026-05-20T08:00:00+02:00' : '2026-05-20T08:00:00+02:00',
        author: [{
            '@type': 'Person',
            name: article.author.name,
            url: `${SITE_CONFIG.url}/ueber-uns`,
        }],
        publisher: {
            '@type': 'Organization',
            name: 'SwissTech Briefing',
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_CONFIG.url}/logo.png`,
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_CONFIG.url}/artikel/${article.slug}`,
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            {/* Reading Progress Bar (Simulated) */}
            <div className="sticky top-16 z-50 h-1 bg-slate-200 dark:bg-slate-800">
                <div className="h-full bg-primary w-1/3"></div>
            </div>

            <main className="max-w-3xl mx-auto bg-white dark:bg-slate-900 min-h-screen shadow-sm">
                <article className="px-6 pt-8 pb-12">
                    <div className="mb-4">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {article.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-slate-900 dark:text-white">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                        <span className="material-symbols-outlined text-base">calendar_today</span>
                        <span>{formatSwissDate(article.datePublished)}</span>
                        <span className="mx-1 font-light opacity-30">|</span>
                        <span className="uppercase text-[10px] font-bold tracking-widest text-slate-400">Von {article.author.name}</span>
                    </div>

                    {/* Box Section: In 30 Sekunden erklärt */}
                    {article.summaryPoints && (
                        <section className="bg-background-light dark:bg-slate-800 p-6 rounded-xl border-l-4 border-primary mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary">bolt</span>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">In 30 Sekunden erklärt</h2>
                            </div>
                            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                                {article.summaryPoints.map((point, idx) => (
                                    <li key={idx} className="flex gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        <p>{point}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Body Text */}
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-6">
                        <p>{article.excerpt}</p>

                        <div className="my-10 overflow-hidden rounded-xl bg-slate-100 relative h-64 md:h-96">
                            <Image
                                className="object-cover"
                                src={article.image}
                                alt={article.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 800px"
                            />
                        </div>
                        <p className="text-xs text-slate-500 p-3 italic">Quelle: SwissTech Briefing (Symbolbild)</p>

                        <p>
                            Die Schweiz festigt ihre Position als globaler Vorreiter in der künstlichen Intelligenz.
                            Mit der offiziellen Einweihung neuer Infrastruktur beginnt eine neue Ära der Forschung.
                            Dies sichert nicht nur die Qualität, sondern auch den Schutz sensibler Daten gemäss Schweizer Standards.
                        </p>

                        {/* Impact Box */}
                        {article.impactItems && (
                            <div className="mt-12 mb-8 p-1 bg-primary/5 rounded-xl">
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">insights</span>
                                        Was bedeutet das für die Schweiz?
                                    </h3>
                                    <div className="grid gap-6">
                                        {article.impactItems.map((item, idx) => (
                                            <ImpactItem
                                                key={idx}
                                                icon={item.icon}
                                                title={item.title}
                                                desc={item.desc}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Share Buttons */}
                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase text-slate-400">Teilen:</span>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-xl">share</span>
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors text-xs font-bold">
                                            in
                                        </button>
                                    </div>
                                </div>
                                <Link href={`/kategorie/${article.categorySlug}`} className="text-xs font-bold text-primary uppercase hover:underline">
                                    Mehr aus {article.category} &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Articles Section */}
                <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-12 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold mb-8">Das könnte Sie auch interessieren</h3>
                    <div className="grid gap-6">
                        {ARTICLES
                            .filter(a => a.categorySlug === article.categorySlug && a.id !== article.id)
                            .slice(0, 3)
                            .map(related => (
                                <ArticleCard
                                    key={related.id}
                                    title={related.title}
                                    excerpt={related.excerpt}
                                    category={related.category}
                                    date={related.date}
                                    datePublished={related.datePublished}
                                    image={related.image}
                                    slug={related.slug}
                                />
                            ))
                        }
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function ImpactItem({ icon, title, desc }: { icon: string, title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <div className="bg-primary/10 text-primary p-2 rounded-lg h-fit">
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{desc}</p>
            </div>
        </div>
    );
}
