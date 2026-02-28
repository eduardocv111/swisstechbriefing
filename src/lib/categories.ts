export const CATEGORIES = [
  { slug: "ki", label: "KI" },
  { slug: "startups", label: "Startups" },
  { slug: "regulierung", label: "Regulierung" },
  { slug: "defense-security-tech", label: "Defense & Security Tech" },
  { slug: "analyse-insights", label: "Analyse & Insights" },
  { slug: "podcast", label: "Podcasts" },
  { slug: "space-tech", label: "Space & Discovery" },
] as const;

export type Category = (typeof CATEGORIES)[number];

// 🔹 Obtener categoría por slug (para /kategorie/[slug])
export function getCategoryBySlug(slug: string) {
  return (
    CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) ?? null
  );
}

// 🔹 Obtener categoría por label exacto (para validación en publish)
export function getCategoryByLabel(label: string) {
  return (
    CATEGORIES.find(
      (c) => c.label.toLowerCase() === label.toLowerCase()
    ) ?? null
  );
}

// 🔹 Obtener slug desde label (útil para ArticleCard links)
export function getSlugFromCategory(label: string) {
  return getCategoryByLabel(label)?.slug ?? null;
}

// 🔹 Validar si una categoría es oficial
export function isValidCategory(label: string): boolean {
  return getCategoryByLabel(label) !== null;
}

/**
 * 🔹 Traducir label de categoría usando el diccionario
 */
export function getTranslatedCategoryLabel(label: string, dict: any): string {
  if (!dict || !dict.categories) return label;

  const key = label.toLowerCase();
  if (key.includes('ki') || key.includes('ai')) return dict.categories.ki;
  if (key.includes('startup')) return dict.categories.startups;
  if (key.includes('regulierung') || key.includes('regulation')) return dict.categories.regulation;
  if (key.includes('defense') || key.includes('security')) return dict.categories.defense;
  if (key.includes('analyse') || key.includes('insights')) return dict.categories.analyse;
  if (key.includes('podcast')) return dict.categories.podcasts;
  if (key.includes('space') || key.includes('discovery') || key.includes('mars')) return dict.categories.space;

  return label;
}