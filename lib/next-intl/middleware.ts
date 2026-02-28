import {NextRequest, NextResponse} from 'next/server';

export default function createMiddleware({
  locales,
  defaultLocale
}: {
  locales: readonly string[];
  defaultLocale: string;
}) {
  return function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

    if (hasLocale || pathname.startsWith('/_next') || pathname.includes('.')) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  };
}
