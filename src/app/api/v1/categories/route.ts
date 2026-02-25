import { CATEGORIES } from '@/lib/categories';
import { successResponse, errorResponse, validateAuth, checkRateLimit, getClientIp } from '@/lib/api-utils';

/**
 * API v1: Get all categories
 */
export async function GET(request: Request) {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
        return errorResponse('Too Many Requests', 'TOO_MANY_REQUESTS', 429);
    }

    if (!validateAuth(request)) {
        return errorResponse('Unauthorized access', 'UNAUTHORIZED', 401);
    }

    const data = CATEGORIES.map(c => ({
        id: c.slug,
        slug: c.slug,
        label: c.label,
    }));

    return successResponse(data);
}
