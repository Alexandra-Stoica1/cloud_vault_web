import type { ReactNode } from "react"

import { BrandLogo } from "@/components/brand-logo"

type AuthCardProps = {
  title: string
  description: string
  children: ReactNode
  /** Shown under the card, e.g. a link to the other auth page. */
  footer?: ReactNode
}

/** Centered card used by the sign-in and sign-up pages. */
export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <BrandLogo className="mx-auto mb-8 w-fit" />
        <section className="rounded-lg border bg-card p-6 text-card-foreground sm:p-8">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-[-0.02em]">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </header>
          {children}
          {footer && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {footer}
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
