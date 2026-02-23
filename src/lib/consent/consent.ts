import type { ConsentRecord, ConsentCategories } from './types';
import {
    CONSENT_COOKIE_NAME,
    CONSENT_COOKIE_MAX_AGE,
    CONSENT_VERSION,
    DEFAULT_CATEGORIES,
} from './constants';

/* ────────────────────────────── helpers ────────────────────────────── */

function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

/** Read a cookie value by name */
function getCookie(name: string): string | null {
    if (!isBrowser()) return null;
    const match = document.cookie.match(
        new RegExp('(?:^|;\\s*)' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*=\\s*([^;]*)')
    );
    return match ? decodeURIComponent(match[1]) : null;
}

/** Set a first-party cookie */
function setCookie(name: string, value: string, maxAge: number): void {
    if (!isBrowser()) return;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
}

/** Delete a cookie */
function deleteCookie(name: string): void {
    if (!isBrowser()) return;
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax; Secure`;
}

/* ──────────────────────── parse / validate ─────────────────────────── */

function parseConsentRecord(raw: string): ConsentRecord | null {
    try {
        const parsed = JSON.parse(raw);
        if (
            parsed &&
            typeof parsed.version === 'string' &&
            typeof parsed.timestamp === 'string' &&
            parsed.categories &&
            typeof parsed.categories.analytics === 'boolean' &&
            typeof parsed.categories.marketing === 'boolean'
        ) {
            return {
                version: parsed.version,
                timestamp: parsed.timestamp,
                categories: {
                    necessary: true, // always enforced
                    analytics: parsed.categories.analytics,
                    marketing: parsed.categories.marketing,
                },
            };
        }
    } catch {
        /* invalid JSON — treat as no consent */
    }
    return null;
}

/* ─────────────────────── public API ───────────────────────────────── */

/**
 * Read the current consent record from the cookie.
 * Returns `null` if no valid consent exists or version is outdated.
 */
export function getConsent(): ConsentRecord | null {
    const raw = getCookie(CONSENT_COOKIE_NAME);
    if (!raw) return null;

    const record = parseConsentRecord(raw);
    if (!record) return null;

    // Version mismatch → re-prompt
    if (record.version !== CONSENT_VERSION) return null;

    return record;
}

/**
 * Check if a specific category has been consented to.
 * Returns `false` if no consent record exists.
 */
export function hasConsent(category: keyof ConsentCategories): boolean {
    if (category === 'necessary') return true;
    const record = getConsent();
    return record ? record.categories[category] : false;
}

/**
 * Check whether the user has made any consent decision yet.
 */
export function hasConsentDecision(): boolean {
    return getConsent() !== null;
}

/**
 * Save a consent decision. Persists to cookie and fires a custom event.
 */
export function saveConsent(
    categories: ConsentCategories,
    source: 'banner' | 'modal' | 'programmatic' = 'banner'
): ConsentRecord {
    const record: ConsentRecord = {
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        categories: {
            necessary: true,
            analytics: categories.analytics,
            marketing: categories.marketing,
        },
    };

    setCookie(CONSENT_COOKIE_NAME, JSON.stringify(record), CONSENT_COOKIE_MAX_AGE);

    // Dispatch custom event for script loaders to react
    if (isBrowser()) {
        window.dispatchEvent(
            new CustomEvent('stb-consent-updated', { detail: { consent: record, source } })
        );
    }

    return record;
}

/**
 * Revoke all optional consent (keeps necessary).
 */
export function revokeConsent(): void {
    saveConsent(DEFAULT_CATEGORIES, 'programmatic');
}

/**
 * Delete the consent cookie entirely (forces re-prompt).
 */
export function resetConsent(): void {
    deleteCookie(CONSENT_COOKIE_NAME);
}
