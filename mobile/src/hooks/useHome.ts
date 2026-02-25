import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiService } from '../api/services';
import { MobileArticle } from '../api/types';

/**
 * Standard stale times
 */
const STALE_TIME = {
    HOME: 5 * 60 * 1000,
    ARTICLE: 60 * 60 * 1000,
    CATEGORIES: 24 * 60 * 60 * 1000,
};

/**
 * Get the Home Dashboard
 */
export function useHome(locale: string = 'de-CH') {
    return useQuery({
        queryKey: ['home', locale],
        queryFn: async () => {
            const response = await apiService.getHome(locale);
            return response.data;
        },
        staleTime: STALE_TIME.HOME,
    });
}

/**
 * Get Article Detail
 */
export function useArticle(slug: string, locale: string = 'de-CH') {
    return useQuery({
        queryKey: ['article', locale, slug],
        queryFn: async () => {
            const response = await apiService.getArticle(slug, locale);
            return response.data;
        },
        staleTime: STALE_TIME.ARTICLE,
        enabled: !!slug,
    });
}

/**
 * Get Related Articles
 */
export function useRelated(slug: string, locale: string = 'de-CH') {
    return useQuery({
        queryKey: ['related', locale, slug],
        queryFn: async () => {
            const response = await apiService.getRelated(slug, locale);
            return response.data;
        },
        enabled: !!slug,
    });
}

/**
 * Get all available categories
 */
export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await apiService.getCategories();
            return response.data;
        },
        staleTime: STALE_TIME.CATEGORIES,
    });
}

/**
 * INFINITE QUERY: Category Articles (with pagination)
 */
export function useCategoryArticles(slug: string, locale: string = 'de-CH', limit: number = 20) {
    return useInfiniteQuery({
        queryKey: ['category-articles', slug, locale],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await apiService.getCategoryArticles(slug, locale, pageParam as number, limit);
            return response;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.pagination?.hasNextPage) {
                return lastPage.pagination.page + 1;
            }
            return undefined;
        },
        enabled: !!slug,
    });
}

/**
 * INFINITE QUERY: Search (with pagination)
 */
export function useSearch(query: string, locale: string = 'de-CH', limit: number = 20) {
    return useInfiniteQuery({
        queryKey: ['search', query, locale],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await apiService.search(query, locale, pageParam as number, limit);
            return response;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.pagination?.hasNextPage) {
                return lastPage.pagination.page + 1;
            }
            return undefined;
        },
        enabled: query.trim().length >= 2,
    });
}
