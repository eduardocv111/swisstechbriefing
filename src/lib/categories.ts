export const CATEGORIES = [
  { slug: "ki", label: "KI" },
  { slug: "startups", label: "Startups" },
  { slug: "regulierung", label: "Regulierung" },
  { slug: "defense-security-tech", label: "Defense & Security Tech" },
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