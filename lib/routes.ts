export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
} as const

/** Pages for visitors who are not signed in. Signed-in users are sent to the home page. */
export const guestOnlyRoutes: readonly string[] = [
  routes.login,
  routes.register,
]

/** The query parameter that remembers where to go back after signing in. */
export const NEXT_PARAM = "next"

/**
 * Only allow redirects to a path on this site. "//evil.com" and "/\evil.com" are
 * treated by browsers as other domains, so they fall back to the home page.
 */
export function safeRedirectPath(
  value: unknown,
  fallback: string = routes.home
) {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/\\")
  ) {
    return value
  }
  return fallback
}

/** "/login?next=/buckets" for a page that needs a signed-in user. */
export function loginUrl(nextPath?: string) {
  if (!nextPath || nextPath === routes.home) return routes.login
  return `${routes.login}?${NEXT_PARAM}=${encodeURIComponent(nextPath)}`
}
