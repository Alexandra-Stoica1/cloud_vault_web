import "server-only"

import type { NextRequest, NextResponse } from "next/server"

import { isApiError } from "@/lib/api/errors"

import type { SessionTokens } from "../types"
import { refreshSession } from "./refresh-session"
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  clearSessionCookies,
  readSessionTokens,
  setSessionCookies,
} from "./session-cookies"

export type ProxySession =
  | { authenticated: true; refreshed?: SessionTokens }
  | { authenticated: false; clearCookies: boolean }

/**
 * Decides whether the request belongs to a signed-in user. An expired access cookie is
 * replaced using the refresh token; the new tokens are also written into the request,
 * so the page rendered for this same request already sees them.
 */
export async function resolveSession(
  request: NextRequest
): Promise<ProxySession> {
  const { accessToken, refreshToken } = readSessionTokens(request.cookies)
  if (accessToken) return { authenticated: true }
  if (!refreshToken) return { authenticated: false, clearCookies: false }

  try {
    const tokens = await refreshSession(refreshToken)
    request.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken)
    request.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken)
    return { authenticated: true, refreshed: tokens }
  } catch (error) {
    // 401: the refresh token expired or was revoked, so the cookies are useless.
    // Any other error (e.g. the API is down) keeps them for the next attempt.
    return { authenticated: false, clearCookies: isApiError(error, 401) }
  }
}

/** Sends the refreshed tokens to the browser, or removes the dead session cookies. */
export function applySessionCookies(
  response: NextResponse,
  session: ProxySession
) {
  if (session.authenticated && session.refreshed) {
    setSessionCookies(response.cookies, session.refreshed)
  } else if (!session.authenticated && session.clearCookies) {
    clearSessionCookies(response.cookies)
  }
}
