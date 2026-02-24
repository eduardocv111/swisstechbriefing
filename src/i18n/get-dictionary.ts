import 'server-only';
import type { Locale } from './config';

const dictionaries = {
    'de-CH': () => import('./dictionaries/de-CH.json').then((module) => module.default),
    'fr-CH': () => import('./dictionaries/fr-CH.json').then((module) => module.default),
    'it-CH': () => import('./dictionaries/it-CH.json').then((module) => module.default),
    'en': () => import('./dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    const dictionaryLoader = dictionaries[locale] || dictionaries['de-CH'];
    return dictionaryLoader();
};
