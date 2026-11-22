import "server-only"

const DEFAULT_REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 // 7 days, as in the API

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined || value === "") return fallback
  return value.toLowerCase() === "true"
}

/** Server-side settings, read from the environment (.env.local). */
export const serverConfig = {
  /** FastAPI base URL, without a trailing slash. */
  apiUrl: (process.env.API_URL ?? "http://127.0.0.1:8000").replace(/\/+$/, ""),
  /** Refresh token cookie lifetime in seconds. */
  refreshTokenMaxAge:
    Number(process.env.REFRESH_TOKEN_MAX_AGE) || DEFAULT_REFRESH_TOKEN_MAX_AGE,
  /** Session cookies are sent over HTTPS only. */
  cookieSecure: parseBoolean(
    process.env.COOKIE_SECURE,
    process.env.NODE_ENV === "production"
  ),
} as const
