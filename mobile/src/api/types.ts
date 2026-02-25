/**
 * API v1 Contract Types for Mobile App
 */

export interface Source {
    name: string;
    url: string;
}

export interface Author {
    name: string;
    role: string | null;
}

/**
 * Optimized Article Type for Mobile Feed & Detail
 */
export interface MobileArticle {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    imageUrl: string;      // Absolute URL delivered by API
    publishedAt: string;   // ISO 8601
    lastModified?: string;
    author: string | Author;
    webUrl: string;        // For sharing and external links
    contentHtml?: string;  // Only in detail view
    sources?: Source[];    // Only in detail view
}

export interface Category {
    id: string;
    slug: string;
    label: string;
}

/**
 * Standard API Response Structure (Hardenened v1.1)
 */
export interface ApiResponse<T> {
    status: 'success' | 'error';
    version: string;
    requestId: string;
    data: T;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    error?: {
        code: string;
        message: string;
    };
    metadata?: {
        locale: string;
        timestamp: string;
        [key: string]: any;
    };
}

/**
 * Composite Page Responses
 */
export interface HomeResponse {
    featured: MobileArticle | null;
    latest: MobileArticle[];
    categories: Category[];
}
