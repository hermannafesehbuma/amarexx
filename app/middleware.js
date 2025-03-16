import { NextResponse } from 'next/server';

export function middleware(request) {
  // Bypass Next.js cache by adding a query param
  request.nextUrl.searchParams.set('_vercel_no_cache', '1');

  return NextResponse.rewrite(request.nextUrl);
}

// Apply the middleware to all routes
export const config = {
  matcher: '/:path*',
};
