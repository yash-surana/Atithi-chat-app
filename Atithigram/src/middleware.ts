import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// **Security-conscious note:**
console.warn(
  'X-Frame-Options header set to "allowall". This can introduce security risks. Ensure you trust the embedding context before using this setting.'
);

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  // Allow embedding from any domain (use with caution)
  return NextResponse.next().headers.set('X-Frame-Options', 'ALLOWALL');
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
};
