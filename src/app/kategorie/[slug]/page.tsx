import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCategoryBySlug } from "@/lib/categories";

export const runtime = "nodejs";
export const revalidate = 3600; // 1h ISR

const FALLBACK_IMAGE = "/assets/images/news/default-news.svg";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (!category) return notFound();

  const rows = await prisma.article.findMany({
    where: { category: category.label },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 50,
  });

  return (
    <>
      <Header />
      {/* Si tu CategoryTabs necesita activeCategory, pásale el label */}
      <CategoryTabs activeCategory={category.label} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
            Schwerpunkt: {category.label}
          </h2>
        </div>

        <div className="space-y-4">
          {rows.length > 0 ? (
            rows.map((a) => (
              <ArticleCard
                key={a.id}
                title={a.title}
                excerpt={a.excerpt}
                category={a.category}
                datePublished={a.date.toISOString()}
                image={a.imageUrl && a.imageUrl.trim() ? a.imageUrl : FALLBACK_IMAGE}
                slug={a.slug}
              />
            ))
          ) : (
            <div className="text-slate-500 italic text-sm mb-8">
              Aktuell liegen keine weiteren Meldungen zum Thema {category.label} vor.
              <div className="mt-6">
                <Link href="/" className="text-xs font-bold text-primary uppercase hover:underline">
                  ← Zurück zur Startseite
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}