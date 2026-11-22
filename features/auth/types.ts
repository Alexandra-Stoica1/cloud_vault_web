/** The signed-in user, as the UI sees it. */
export type User = {
  id: string
  email: string
  username: string
  tier: string
  emailVerified: boolean
  isAdmin: boolean
  referralCode: string
  createdAt: string
}

/** Tokens issued by the API. Kept in HttpOnly cookies, never sent to the browser as data. */
export type SessionTokens = {
  accessToken: string
  refreshToken: string
  /** Access token lifetime in seconds. */
  expiresIn: number
}
