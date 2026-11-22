import "server-only"

import { serverConfig } from "@/lib/config"

import { ApiError, toApiError } from "./errors"

export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  /** Sent as JSON. */
  body?: unknown
  /** Sent as "Authorization: Bearer <token>". */
  accessToken?: string
}

const UNREACHABLE =
  "The CloudVault service is unavailable. Please try again later."

/**
 * Calls the FastAPI backend from the Next.js server.
 * Returns the parsed JSON body and throws ApiError for any non-2xx response.
 */
export async function apiRequest<T>(
  path: string,
  { method = "GET", body, accessToken }: ApiRequestOptions = {}
): Promise<T> {
  const headers = new Headers({ Accept: "application/json" })
  if (body !== undefined) headers.set("Content-Type", "application/json")
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)

  let response: Response
  try {
    response = await fetch(`${serverConfig.apiUrl}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store", // user-specific data is never cached
    })
  } catch {
    throw new ApiError(503, UNREACHABLE)
  }

  if (!response.ok) throw await toApiError(response)
  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}
