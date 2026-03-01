/**
 * Simple In-Memory Multi-TTL Cache for Web Research Module
 */
class ResearchCache {
    constructor() {
        this.store = new Map();
    }

    set(key, value, ttlSeconds) {
        const expiresAt = Date.now() + (ttlSeconds * 1000);
        this.store.set(key, { value, expiresAt });
    }

    get(key) {
        const item = this.store.get(key);
        if (!item) return null;
        if (Date.now() > item.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return item.value;
    }

    // Periodically clean up expired entries
    prune() {
        const now = Date.now();
        for (const [key, item] of this.store.entries()) {
            if (now > item.expiresAt) this.store.delete(key);
        }
    }
}

module.exports = new ResearchCache();
// Clean up once an hour
setInterval(() => module.exports.prune(), 3600 * 1000);
