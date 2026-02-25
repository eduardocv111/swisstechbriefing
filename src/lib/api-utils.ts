import { NextResponse } from 'next/server';

/**
 * Standard API Response Structure
 */
export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    version: string;
    requestId: string;
    data?: T;
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
    metadata?: any;
}

/**
 * Create a success response
 */
export function successResponse(data: any, metadata: any = {}, pagination?: any) {
    const requestId = Math.random().toString(36).substring(7);
    return NextResponse.json({
        status: 'success',
        version: '1.1',
        requestId,
        data,
        pagination,
        metadata: {
            ...metadata,
            timestamp: new Date().toISOString()
        }
    });
}

/**
 * Create an error response
 */
export function errorResponse(message: string, code = 'INTERNAL_ERROR', status = 500) {
    const requestId = Math.random().toString(36).substring(7);
    return NextResponse.json({
        status: 'error',
        version: '1.1',
        requestId,
        error: {
            code,
            message
        }
    }, { status });
}

/**
 * Basic In-Memory Rate Limiter
 * Note: Reset on server restart. For higher scaling, use Redis.
 */
const rateLimitMap = new Map<string, { count: number, resetAt: number }>();

export function checkRateLimit(ip: string, limit = 100, windowMs = 60000) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
        return true;
    }

    if (record.count >= limit) {
        return false;
    }

    record.count++;
    return true;
}

/**
 * Validate API Key Header
 */
export function validateAuth(request: Request) {
    const apiKey = request.headers.get('x-api-key');
    const isValid = apiKey === process.env.STB_API_KEY;
    return isValid;
}

/**
 * Get client IP
 */
export function getClientIp(request: Request) {
    return request.headers.get('x-forwarded-for') || 'unknown';
}
