/**
 * Lightweight client-side i18n.
 *
 * The app has two locales: `en` (default, paths under `/`) and `fr` (paths
 * under `/fr/`). Components import `useLocale()` to detect the current
 * locale from the URL pathname and `t()` to pick the right copy.
 *
 * Usage:
 *   const lang = useLocale();
 *   <p>{t(lang, copy.headline)}</p>
 *
 * Where `copy.headline = { en: 'Outcomes...', fr: 'Resultats...' }`.
 */
'use client';

import { usePathname } from 'next/navigation';

export type Locale = 'en' | 'fr';

export function useLocale(): Locale {
  const pathname = usePathname() || '/';
  return pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en';
}

export function t<T = string>(lang: Locale, dict: { en: T; fr: T }): T {
  return dict[lang];
}

/**
 * Build a locale-aware href. Pass the EN path and the helper prefixes /fr
 * when the current locale is FR. Used to keep internal links inside the
 * same locale tree.
 */
export function localeHref(lang: Locale, enHref: string): string {
  if (lang === 'en') return enHref;
  if (enHref === '/') return '/fr';
  if (enHref.startsWith('/fr')) return enHref;
  if (enHref.startsWith('http')) return enHref;
  return `/fr${enHref}`;
}
