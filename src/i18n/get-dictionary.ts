import 'server-only';
import type { Locale } from './config';
import { normalizeLocale } from '@/lib/i18n';

const dictionaries = {
    'de-CH': () => import('./dictionaries/de-CH.json').then((module) => module.default),
    'fr-CH': () => import('./dictionaries/fr-CH.json').then((module) => module.default),
    'it-CH': () => import('./dictionaries/it-CH.json').then((module) => module.default),
    'en': () => import('./dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    const normLocale = normalizeLocale(locale);
    const dictionaryLoader = dictionaries[normLocale] || dictionaries['de-CH'];
    return dictionaryLoader();
};
