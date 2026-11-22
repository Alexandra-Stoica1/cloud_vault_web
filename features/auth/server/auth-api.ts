import "server-only"

import { apiRequest } from "@/lib/api/client"

import type { LoginValues, RegisterValues } from "../schemas"
import type { SessionTokens, User } from "../types"

// Response bodies of the FastAPI /api/auth endpoints.
type UserDto = {
  id: string
  email: string
  username: string
  tier: string
  email_verified: boolean
  is_admin: boolean
  referral_code: string
  created_at: string
}

type TokenDto = {
  access_token: string
  refresh_token: string
  token_type: "bearer"
  expires_in: number
}

function toUser(dto: UserDto): User {
  return {
    id: dto.id,
    email: dto.email,
    username: dto.username,
    tier: dto.tier,
    emailVerified: dto.email_verified,
    isAdmin: dto.is_admin,
    referralCode: dto.referral_code,
    createdAt: dto.created_at,
  }
}

function toTokens(dto: TokenDto): SessionTokens {
  return {
    accessToken: dto.access_token,
    refreshToken: dto.refresh_token,
    expiresIn: dto.expires_in,
  }
}

/** Typed wrappers around the /api/auth endpoints. They throw ApiError on failure. */
export const authApi = {
  async login(credentials: LoginValues): Promise<SessionTokens> {
    const dto = await apiRequest<TokenDto>("/api/auth/login", {
      method: "POST",
      body: credentials,
    })
    return toTokens(dto)
  },

  async register({ email, username, password }: RegisterValues): Promise<User> {
    const dto = await apiRequest<UserDto>("/api/auth/register", {
      method: "POST",
      body: { email, username, password },
    })
    return toUser(dto)
  },

  /** Rotation: the API revokes the old refresh token and returns a new pair. */
  async refresh(refreshToken: string): Promise<SessionTokens> {
    const dto = await apiRequest<TokenDto>("/api/auth/refresh", {
      method: "POST",
      body: { refresh_token: refreshToken },
    })
    return toTokens(dto)
  },

  async logout(refreshToken: string): Promise<void> {
    await apiRequest<void>("/api/auth/logout", {
      method: "POST",
      body: { refresh_token: refreshToken },
    })
  },

  async me(accessToken: string): Promise<User> {
    return toUser(await apiRequest<UserDto>("/api/auth/me", { accessToken }))
  },
}
