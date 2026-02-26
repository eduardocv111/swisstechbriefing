/**
 * Mobile Configuration for SwissTech Briefing
 */
const API_CONFIG = {
    baseURL: 'https://swisstechbriefing.ch/api/v1',
    apiKey: 'SwissTech_App_Secret_2026_!#',
    timeout: 10000,
};

import { ApiResponse } from './types';

/**
 * Native Fetch-based API Client for React Native (Hardened v2.1)
 * Replaces Axios to avoid Metro bundler resolution issues with Node-specific modules.
 */
export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_CONFIG.apiKey,
            'Accept': 'application/json',
            ...options.headers,
        },
        signal: controller.signal
    };

    try {
        const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, config);
        clearTimeout(id);

        const data = await response.json();

        if (!response.ok) {
            // Detailed debug logging in dev
            if (__DEV__) {
                console.error(`[API ERROR] ${options.method || 'GET'} ${endpoint}`, {
                    status: response.status,
                    message: data?.error?.message || response.statusText,
                });
            }

            if (response.status === 429) {
                throw { message: 'Hui! Too direct! Bitte warte kurz.', code: 'RATE_LIMIT' };
            }

            if (response.status === 401) {
                throw { message: 'Veraltete App-Version. Bitte im App Store actualizarisieren.', code: 'AUTH_FAILED' };
            }

            throw data?.error || { message: 'Ein unerwarteter Fehler ist aufgetreten.', code: 'UNKNOWN' };
        }

        return data; // Return the full ApiResponse structure
    } catch (error: any) {
        clearTimeout(id);

        if (error.name === 'AbortError') {
            throw { message: 'Netzwerk-Timeout. Bitte prüfe deine Verbindung.', code: 'TIMEOUT' };
        }

        throw error;
    }
}

// Mocking the axios interface for compatibility if needed elsewhere
export const apiClient = {
    get: <T>(url: string, config?: any) => apiRequest<T>(url, { ...config, method: 'GET' }),
    post: <T>(url: string, data?: any, config?: any) =>
        apiRequest<T>(url, { ...config, method: 'POST', body: JSON.stringify(data) }),
};
