import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse } from './types';

/**
 * Mobile Configuration for SwissTech Briefing
 */
const API_CONFIG = {
    baseURL: 'https://swisstechbriefing.ch/api/v1',
    apiKey: 'SwissTech_App_Secret_2026_!#', // Should be in .env in production
    timeout: 15000,
};

/**
 * Optimized API Client for React Native (v1.1)
 */
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_CONFIG.apiKey,
        'Accept': 'application/json',
    },
});

/**
 * Intercept responses to log requestId and handle errors globally
 */
apiClient.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<ApiResponse<any>>) => {
        const errorData = error.response?.data;
        const requestId = errorData?.requestId;

        // Log for mobile analytics/troubleshooting
        console.error(`[API ERROR] ${error.config?.url} | reqId: ${requestId}`, {
            code: errorData?.error?.code || error.code,
            message: errorData?.error?.message || error.message,
        });

        if (error.response?.status === 429) {
            // Handle rate limit (optional toast)
            return Promise.reject({ ...error, message: 'Too many requests. Please slow down.' });
        }

        if (error.response?.status === 401) {
            // Handle unauthorized (invalid x-api-key)
            return Promise.reject({ ...error, message: 'Authentication failed. Please update the app.' });
        }

        return Promise.reject(errorData || error);
    }
);
