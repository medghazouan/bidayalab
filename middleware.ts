import { NextRequest, NextResponse } from 'next/server';

/**
 * Set Content-Language header on /fr/* responses for SEO/AEO/GEO.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    res.headers.set('Content-Language', 'fr');
  } else {
    res.headers.set('Content-Language', 'en');
  }
  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|assets|.*\\..*).*)'],
};
