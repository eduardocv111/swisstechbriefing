import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse } from './types';

/**
 * Mobile Configuration for SwissTech Briefing
 */
const API_CONFIG = {
    baseURL: 'https://swisstechbriefing.ch/api/v1',
    apiKey: 'SwissTech_App_Secret_2026_!#',
    timeout: 10000, // Faster timeout for better mobile experience
};

/**
 * Optimized API Client for React Native (Hardened v2.0)
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

        // Detailed debug logging with RequestId
        if (__DEV__) {
            console.error(`[API ERROR] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
                status: error.response?.status,
                requestId,
                code: errorData?.error?.code,
                message: errorData?.error?.message || error.message,
            });
        }

        if (error.response?.status === 429) {
            return Promise.reject({
                ...error,
                message: 'Hui! Too direct! Bitte warte kurz.',
                code: 'RATE_LIMIT'
            });
        }

        if (error.code === 'ECONNABORTED') {
            return Promise.reject({
                ...error,
                message: 'Netzwerk-Timeout. Bitte prüfe deine Verbindung.',
                code: 'TIMEOUT'
            });
        }

        if (error.response?.status === 401) {
            return Promise.reject({
                ...error,
                message: 'Veraltete App-Version. Bitte im App Store aktualisieren.',
                code: 'AUTH_FAILED'
            });
        }

        return Promise.reject(errorData || {
            message: 'Ein unerwarteter Fehler ist aufgetreten.',
            code: 'UNKNOWN'
        });
    }
);
