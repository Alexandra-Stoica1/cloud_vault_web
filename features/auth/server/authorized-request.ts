import "server-only"

import { redirect } from "next/navigation"

import { apiRequest, type ApiRequestOptions } from "@/lib/api/client"
import { isApiError } from "@/lib/api/errors"
import { routes } from "@/lib/routes"

import { getAccessToken } from "./session"

/**
 * Calls the API as the signed-in user. Without a session, or when the API rejects the
 * token (401), the user is sent to the login page. Use it for every protected endpoint.
 */
export async function apiRequestAsUser<T>(
  path: string,
  options: Omit<ApiRequestOptions, "accessToken"> = {}
): Promise<T> {
  const accessToken = await getAccessToken()
  if (!accessToken) redirect(routes.login)

  try {
    return await apiRequest<T>(path, { ...options, accessToken })
  } catch (error) {
    if (isApiError(error, 401)) redirect(routes.login)
    throw error
  }
}
