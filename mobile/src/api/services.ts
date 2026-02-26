import { apiClient } from './client';
import { ApiResponse, HomeResponse, MobileArticle, Category } from './types';

/**
 * Mobile Service Layer (Connects to SwissTech Briefing v1.1)
 */
export const apiService = {
    /**
     * 1. GET /home
     * Fetches featured, latest and categories for the main screen.
     */
    getHome: (locale: string = 'de-CH') =>
        apiClient.get<HomeResponse>(`/home?locale=${locale}`),

    /**
     * 2. GET /articles/latest
     * Paginated list of latest articles.
     */
    getLatest: (locale: string = 'de-CH', limit: number = 20) =>
        apiClient.get<MobileArticle[]>(`/articles/latest?locale=${locale}&limit=${limit}`),

    /**
     * 3. GET /articles/[slug]
     * Deep dive into a single article.
     */
    getArticle: (slug: string, locale: string = 'de-CH') =>
        apiClient.get<MobileArticle>(`/articles/${slug}?locale=${locale}`),

    /**
     * 4. GET /articles/related
     * Get 3 related articles based on category.
     */
    getRelated: (slug: string, locale: string = 'de-CH', limit: number = 3) =>
        apiClient.get<MobileArticle[]>(`/articles/related?slug=${slug}&locale=${locale}&limit=${limit}`),

    /**
     * 5. GET /categories
     * List of main editorial categories.
     */
    getCategories: () =>
        apiClient.get<Category[]>('/categories'),

    /**
     * 6. GET /categories/[slug]/articles
     * Filtering by category with pagination.
     */
    getCategoryArticles: (slug: string, locale: string = 'de-CH', page: number = 1, limit: number = 20) =>
        apiClient.get<MobileArticle[]>(
            `/categories/${slug}/articles?locale=${locale}&page=${page}&limit=${limit}`
        ),

    /**
     * 7. GET /search
     * Global search engine.
     */
    search: (query: string, locale: string = 'de-CH', page: number = 1, limit: number = 20) =>
        apiClient.get<MobileArticle[]>(
            `/search?q=${encodeURIComponent(query)}&locale=${locale}&page=${page}&limit=${limit}`
        ),
};
