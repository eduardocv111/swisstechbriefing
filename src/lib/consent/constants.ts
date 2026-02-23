import type { ConsentCategories } from './types';

/**
 * Current consent schema version.
 * Bump this when the consent categories or legal requirements change.
 * A version mismatch will automatically re-prompt the user.
 */
export const CONSENT_VERSION = '1.0';

/** Cookie name used to persist consent */
export const CONSENT_COOKIE_NAME = 'stb_consent';

/** Cookie max-age in seconds (13 months ≈ GDPR maximum) */
export const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 395; // ~13 months

/** Default consent state (no optional cookies) */
export const DEFAULT_CATEGORIES: ConsentCategories = {
    necessary: true,
    analytics: false,
    marketing: false,
};

/** "Accept all" state */
export const ACCEPT_ALL_CATEGORIES: ConsentCategories = {
    necessary: true,
    analytics: true,
    marketing: true,
};

/** Category metadata for the preferences UI */
export const CATEGORY_META = [
    {
        key: 'necessary' as const,
        label: 'Notwendig',
        description:
            'Diese Cookies sind für den Betrieb der Website unerlässlich (z.\u00a0B. Sitzungsverwaltung, Sicherheit, Ihre Cookie-Einstellungen).',
        locked: true,
    },
    {
        key: 'analytics' as const,
        label: 'Analytik',
        description:
            'Helfen uns zu verstehen, wie Besucher die Website nutzen, um Inhalte und Nutzererfahrung zu verbessern (z.\u00a0B. Google Analytics).',
        locked: false,
    },
    {
        key: 'marketing' as const,
        label: 'Marketing',
        description:
            'Werden verwendet, um relevante Werbung anzuzeigen und deren Wirksamkeit zu messen (z.\u00a0B. Google Ads, Werbepartner).',
        locked: false,
    },
] as const;
