import "server-only"

import { serverConfig } from "@/lib/config"

import type { SessionTokens } from "../types"

export const ACCESS_TOKEN_COOKIE = "cv_access_token"
export const REFRESH_TOKEN_COOKIE = "cv_refresh_token"

/**
 * The access cookie expires a little before the token itself, so the proxy refreshes
 * the session before the API would reject the token.
 */
const ACCESS_EXPIRY_MARGIN_SECONDS = 30

type CookieOptions = {
  httpOnly: boolean
  secure: boolean
  sameSite: "lax"
  path: string
  maxAge: number
}

/**
 * Both cookie stores used by Next.js match these shapes: `await cookies()` in Server
 * Actions, and `request.cookies` / `response.cookies` in the proxy.
 */
type CookieReader = { get(name: string): { value: string } | undefined }
type CookieWriter = {
  set(name: string, value: string, options?: CookieOptions): unknown
  delete(name: string): unknown
}

function cookieOptions(maxAge: number): CookieOptions {
  return {
    httpOnly: true, // not readable from JavaScript, so XSS cannot steal the tokens
    secure: serverConfig.cookieSecure,
    sameSite: "lax", // not sent on cross-site POSTs; Server Actions also check the Origin
    path: "/",
    maxAge,
  }
}

export function readSessionTokens(store: CookieReader) {
  return {
    accessToken: store.get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: store.get(REFRESH_TOKEN_COOKIE)?.value,
  }
}

export function setSessionCookies(store: CookieWriter, tokens: SessionTokens) {
  const accessMaxAge = Math.max(
    tokens.expiresIn - ACCESS_EXPIRY_MARGIN_SECONDS,
    1
  )
  store.set(
    ACCESS_TOKEN_COOKIE,
    tokens.accessToken,
    cookieOptions(accessMaxAge)
  )
  store.set(
    REFRESH_TOKEN_COOKIE,
    tokens.refreshToken,
    cookieOptions(serverConfig.refreshTokenMaxAge)
  )
}

export function clearSessionCookies(store: CookieWriter) {
  store.delete(ACCESS_TOKEN_COOKIE)
  store.delete(REFRESH_TOKEN_COOKIE)
}
