import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Devuelve la ruta equivalente en el otro idioma manteniendo el mismo slug.
 * Ejemplos:
 *   / -> /en
 *   /en -> /
 *   /servicios/landing-pages -> /en/servicios/landing-pages
 *   /en/servicios/landing-pages -> /servicios/landing-pages
 */
export function getAlternatePath(pathname: string, targetLang: Lang): string {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  const isEn = cleanPath.startsWith('/en');

  if (targetLang === 'en') {
    if (isEn) return cleanPath;
    return cleanPath === '/' ? '/en' : `/en${cleanPath}`;
  } else {
    if (!isEn) return cleanPath;
    const withoutEn = cleanPath.replace(/^\/en/, '');
    return withoutEn === '' ? '/' : withoutEn;
  }
}
