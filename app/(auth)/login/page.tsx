import type { Metadata } from "next"

import { TextLink } from "@/components/text-link"
import { AuthCard } from "@/features/auth/ui/auth-card"
import { LoginForm } from "@/features/auth/ui/login-form"
import { NEXT_PARAM, routes, safeRedirectPath } from "@/lib/routes"

export const metadata: Metadata = { title: "Sign in" }

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const next = (await searchParams)[NEXT_PARAM]

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to access your files and storage."
      footer={
        <>
          New to CloudVault?{" "}
          <TextLink href={routes.register}>Create an account</TextLink>
        </>
      }
    >
      <LoginForm next={safeRedirectPath(next)} />
    </AuthCard>
  )
}
