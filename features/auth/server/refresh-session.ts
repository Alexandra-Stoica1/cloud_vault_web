import "server-only"

import type { SessionTokens } from "../types"
import { authApi } from "./auth-api"

/**
 * The API rotates refresh tokens and treats a reused one as stolen: it revokes every
 * session of the user. Parallel requests from the same browser (e.g. route prefetches)
 * carry the same refresh token, so they must share one refresh call.
 *
 * The result is kept for a few seconds for requests that were already on their way with
 * the old cookie. This works per server process, which is enough for `next start`.
 */
const REUSE_WINDOW_MS = 10_000

const pending = new Map<string, Promise<SessionTokens>>()

export function refreshSession(refreshToken: string): Promise<SessionTokens> {
  const existing = pending.get(refreshToken)
  if (existing) return existing

  const request = authApi.refresh(refreshToken)
  pending.set(refreshToken, request)

  const forget = () =>
    setTimeout(() => pending.delete(refreshToken), REUSE_WINDOW_MS)
  request.then(forget, forget)

  return request
}
