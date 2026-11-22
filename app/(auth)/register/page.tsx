import type { Metadata } from "next"

import { TextLink } from "@/components/text-link"
import { AuthCard } from "@/features/auth/ui/auth-card"
import { RegisterForm } from "@/features/auth/ui/register-form"
import { routes } from "@/lib/routes"

export const metadata: Metadata = { title: "Create account" }

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Start with 5 GB of secure storage for free."
      footer={
        <>
          Already have an account?{" "}
          <TextLink href={routes.login}>Sign in</TextLink>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  )
}
