import { MetadataRoute } from 'next';
import { ARTICLES, CATEGORIES } from '@/lib/data/mock';
import { SITE_CONFIG } from '@/lib/seo/site';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_CONFIG.url;

    // Home page
    const home = {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    };

    // Category pages
    const categories = CATEGORIES.map((cat) => ({
        url: `${baseUrl}${cat.href}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Article pages
    const articles = ARTICLES.map((art) => ({
        url: `${baseUrl}/artikel/${art.slug}`,
        lastModified: new Date(art.datePublished),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [home, ...categories, ...articles];
}
