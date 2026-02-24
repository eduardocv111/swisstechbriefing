export const locales = ['de-CH', 'fr-CH', 'it-CH', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de-CH';

export const localeNames: Record<Locale, string> = {
    'de-CH': 'DE',
    'fr-CH': 'FR',
    'it-CH': 'IT',
    'en': 'EN',
};
