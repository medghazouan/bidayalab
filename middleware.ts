import { NextRequest, NextResponse } from 'next/server';

/**
 * Set Content-Language header on /fr/* responses for SEO/AEO/GEO.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const locale = pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en';
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-locale', locale);
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set('Content-Language', locale);
  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|assets|.*\\..*).*)'],
};
