import { NextResponse, type NextRequest } from "next/server"

import {
  applySessionCookies,
  resolveSession,
} from "@/features/auth/server/proxy-session"
import { guestOnlyRoutes, loginUrl, routes } from "@/lib/routes"

/**
 * Runs before every page: keeps the session fresh and sends visitors to the right place.
 * Pages and Server Actions still check the session themselves (see requireUser).
 */
export async function proxy(request: NextRequest) {
  const session = await resolveSession(request)
  const { pathname, search } = request.nextUrl
  const isGuestRoute = guestOnlyRoutes.includes(pathname)

  let response: NextResponse
  if (!session.authenticated && !isGuestRoute) {
    response = NextResponse.redirect(
      new URL(loginUrl(pathname + search), request.url)
    )
  } else if (session.authenticated && isGuestRoute) {
    response = NextResponse.redirect(new URL(routes.home, request.url))
  } else {
    // Forward the request headers, which carry the refreshed cookies, to the page.
    response = NextResponse.next({ request: { headers: request.headers } })
  }

  applySessionCookies(response, session)
  return response
}

export const config = {
  // Everything except Next.js assets and files from public/.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
