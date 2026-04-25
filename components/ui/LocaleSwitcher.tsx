'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

/**
 * EN \u2194 FR locale switcher displayed in the navbar.
 *
 * Behavior:
 *  - On any /fr/* route the active locale is FR; clicking EN strips the /fr
 *    prefix.
 *  - On any other route the active locale is EN; clicking FR adds the /fr
 *    prefix to the current path.
 *
 * Visual: small pill matching the laboratory-direction CTA palette
 *  (mono caps, lime accent on active locale).
 */
export default function LocaleSwitcher({
  className = '',
}: {
  className?: string;
}) {
  const pathname = usePathname() || '/';

  const { isFr, frHref, enHref } = useMemo(() => {
    const isFr = pathname === '/fr' || pathname.startsWith('/fr/');
    const enPath = isFr ? pathname.replace(/^\/fr/, '') || '/' : pathname;
    const frPath = isFr ? pathname : `/fr${pathname === '/' ? '' : pathname}`;
    return {
      isFr,
      enHref: enPath || '/',
      frHref: frPath || '/fr',
    };
  }, [pathname]);

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={
        'pointer-events-auto inline-flex items-center gap-0 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm px-1 py-1 ' +
        className
      }
    >
      <Link
        href={enHref}
        aria-label="Switch to English"
        aria-current={!isFr ? 'true' : undefined}
        className={
          'relative inline-flex items-center justify-center px-3 py-1 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ' +
          (!isFr
            ? 'bg-[#beff01] text-black'
            : 'text-zinc-300 hover:text-white')
        }
      >
        EN
      </Link>
      <Link
        href={frHref}
        aria-label="Passer en fran\u00e7ais"
        aria-current={isFr ? 'true' : undefined}
        className={
          'relative inline-flex items-center justify-center px-3 py-1 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ' +
          (isFr
            ? 'bg-[#beff01] text-black'
            : 'text-zinc-300 hover:text-white')
        }
      >
        FR
      </Link>
    </div>
  );
}
