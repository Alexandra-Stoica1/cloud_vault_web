"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  apiErrorState,
  fieldErrorsFrom,
  pick,
  readFormValues,
  type FormState,
} from "@/lib/forms"
import { NEXT_PARAM, routes, safeRedirectPath } from "@/lib/routes"

import {
  loginSchema,
  registerSchema,
  type LoginField,
  type RegisterField,
} from "./schemas"
import { authApi } from "./server/auth-api"
import {
  clearSessionCookies,
  readSessionTokens,
  setSessionCookies,
} from "./server/session-cookies"
import type { SessionTokens } from "./types"

const LOGIN_FIELDS = ["email", "password"] as const
const REGISTER_FIELDS = [
  "email",
  "username",
  "password",
  "confirmPassword",
] as const

async function startSession(tokens: SessionTokens) {
  setSessionCookies(await cookies(), tokens)
}

export async function loginAction(
  _previous: FormState<LoginField>,
  formData: FormData
): Promise<FormState<LoginField>> {
  const values = readFormValues(formData, LOGIN_FIELDS)
  const kept = pick(values, ["email"])
  const parsed = loginSchema.safeParse(values)
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error), values: kept }
  }

  try {
    await startSession(await authApi.login(parsed.data))
  } catch (error) {
    return apiErrorState(error, kept)
  }
  // redirect() throws, so it must stay outside the try block.
  redirect(safeRedirectPath(formData.get(NEXT_PARAM)))
}

export async function registerAction(
  _previous: FormState<RegisterField>,
  formData: FormData
): Promise<FormState<RegisterField>> {
  const values = readFormValues(formData, REGISTER_FIELDS)
  const kept = pick(values, ["email", "username"])
  const parsed = registerSchema.safeParse(values)
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error), values: kept }
  }

  try {
    const { email, password } = parsed.data
    await authApi.register(parsed.data)
    // Sign the new user in right away.
    await startSession(await authApi.login({ email, password }))
  } catch (error) {
    return apiErrorState(error, kept)
  }
  redirect(routes.home)
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  const { refreshToken } = readSessionTokens(cookieStore)
  if (refreshToken) {
    // Revoke the refresh token in the API; sign out locally even if that fails.
    await authApi.logout(refreshToken).catch(() => undefined)
  }
  clearSessionCookies(cookieStore)
  redirect(routes.login)
}
