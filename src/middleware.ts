import { decodeJwt, jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import RBAC from './rbac/rbac';
import { TTokenPayload } from './types/users';
import Utils from './utils/utils';
import { TMasterData } from './types/types';

function checkEndpointAccess(path: string, masterData: TMasterData) {
  const rbac = new RBAC(masterData);

  const hasAccess = rbac.checkEndpointPermission(path);

  return hasAccess;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env.ACCESS_TOKEN_KEY ?? '');

  if (
    req.nextUrl.pathname.startsWith('/api') &&
    !['signup', 'signin', 'health', 'notAuth'].some((path) =>
      req.nextUrl.pathname.includes(path)
    )
  ) {
    return Response.redirect(new URL('/api/notAuth', req.url));
  }

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

    const roles = rid as TTokenPayload['rid'];

    const masterData = await Utils.callRestAPI({
      url: `${process.env.BASE_URL}/api/master-data?roles=${roles.join(',')}`,
      headers: {
        cache: 'force-cache'
      }
    });

    const hasAccess = checkEndpointAccess(
      req.nextUrl.pathname,
      masterData.data
    );

    console.log('hasAccess', hasAccess);

    if (
      !req.nextUrl.pathname.startsWith('/notAuth') &&
      !hasAccess &&
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
