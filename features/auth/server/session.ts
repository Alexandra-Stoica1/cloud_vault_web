import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

import { isApiError } from "@/lib/api/errors"
import { loginUrl } from "@/lib/routes"

import type { User } from "../types"
import { authApi } from "./auth-api"
import { readSessionTokens } from "./session-cookies"

/**
 * Data access layer for the session. The proxy has already refreshed an expired
 * session, so here the access token cookie is either valid or missing.
 */

/** The access token of the current request, for calls to the API. */
export const getAccessToken = cache(async (): Promise<string | null> => {
  return readSessionTokens(await cookies()).accessToken ?? null
})

/** The signed-in user, or null. Called once per request thanks to React's cache(). */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const accessToken = await getAccessToken()
  if (!accessToken) return null
  try {
    return await authApi.me(accessToken)
  } catch (error) {
    if (isApiError(error, 401)) return null // revoked, or the user was deleted
    throw error
  }
})

/** The signed-in user; redirects to the login page when there is none. */
export async function requireUser(nextPath?: string): Promise<User> {
  const user = await getCurrentUser()
  if (!user) redirect(loginUrl(nextPath))
  return user
}
