/** Cookie consent category types for SwissTech Briefing CMP */

export interface ConsentCategories {
    /** Always true — session, auth, consent storage */
    necessary: true;
    /** Analytics (e.g. GA4) — requires explicit opt-in */
    analytics: boolean;
    /** Marketing / ads (e.g. AdSense, GAM) — requires explicit opt-in */
    marketing: boolean;
}

export interface ConsentRecord {
    /** Semantic version of the consent schema */
    version: string;
    /** ISO-8601 timestamp when consent was given/updated */
    timestamp: string;
    /** Per-category consent decisions */
    categories: ConsentCategories;
}

/** Event detail dispatched on consent change */
export interface ConsentEventDetail {
    consent: ConsentRecord;
    source: 'banner' | 'modal' | 'programmatic';
}

/** Consent custom event name */
export const CONSENT_EVENT = 'stb-consent-updated' as const;
