export { type ConsentRecord, type ConsentCategories, type ConsentEventDetail, CONSENT_EVENT } from './types';
export {
    CONSENT_VERSION,
    CONSENT_COOKIE_NAME,
    DEFAULT_CATEGORIES,
    ACCEPT_ALL_CATEGORIES,
    CATEGORY_META,
} from './constants';
export {
    getConsent,
    hasConsent,
    hasConsentDecision,
    saveConsent,
    revokeConsent,
    resetConsent,
} from './consent';
