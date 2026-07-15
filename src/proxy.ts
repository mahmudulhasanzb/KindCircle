import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  const role = session.user.role;

  if (pathname.startsWith('/dashboard/supporter') && role !== 'supporter') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (pathname.startsWith('/dashboard/creator') && role !== 'creator') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
