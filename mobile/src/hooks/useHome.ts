import { useQuery } from '@tanstack/react-query';
import { apiService } from '../api/services';
import { HomeResponse, MobileArticle, Category } from '../api/types';

/**
 * Hook for Mobile Home Feed Dashboard (Fase 1.1)
 */
export function useHome(locale: string = 'de-CH') {
    return useQuery({
        queryKey: ['home', locale],
        queryFn: async () => {
            const response = await apiService.getHome(locale);
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 min cache
    });
}

/**
 * Hook for Article Detail Content rendering
 */
export function useArticle(slug: string, locale: string = 'de-CH') {
    return useQuery({
        queryKey: ['article', locale, slug],
        queryFn: async () => {
            const response = await apiService.getArticle(slug, locale);
            return response.data;
        },
        staleTime: 60 * 60 * 1000, // Long-term cache for evergreen content
    });
}

/**
 * Hook for finding related articles in Detail screen
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
 * Hook for categories browsing
 */
export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await apiService.getCategories();
            return response.data;
        },
    });
}
