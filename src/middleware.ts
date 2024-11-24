import { decodeJwt, jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { RBAC } from './rbac/rbac';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env.ACCESS_TOKEN_KEY ?? '');

  if (!['/signin', '/signup'].includes(req.nextUrl.pathname) && !token) {
    return Response.redirect(new URL('/signin', req.url));
  }

  const isTokenValid = await jwtVerify(
    token?.value ?? '',
    new TextEncoder().encode(process.env.JWT_SECRET)
  ).catch(() => false);

  if (['/signin', '/signup'].includes(req.nextUrl.pathname) && isTokenValid) {
    return Response.redirect(new URL('/', req.url));
  }

  if (token) {
    const rid = decodeJwt(token?.value ?? '').rid;

    if (
      !req.nextUrl.pathname.startsWith('/notAuth') &&
      !RBAC[rid as number].includes('ALL') &&
      !RBAC[rid as number].includes(req.nextUrl.pathname) &&
      isTokenValid
    ) {
      return Response.redirect(new URL('/notAuth', req.url));
    }
  }
}

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
};
