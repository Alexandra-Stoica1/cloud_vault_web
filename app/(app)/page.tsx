import type { Metadata } from "next"

import { requireUser } from "@/features/auth/server/session"

export const metadata: Metadata = { title: "Home" }

const dateFormat = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

export default async function HomePage() {
  const user = await requireUser()

  const details = [
    { label: "Plan", value: user.tier },
    { label: "Email", value: user.emailVerified ? "Verified" : "Not verified" },
    {
      label: "Member since",
      value: dateFormat.format(new Date(user.createdAt)),
    },
  ]

  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">
        Welcome, {user.username}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your account at a glance.
      </p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {details.map(({ label, value }) => (
          <div key={label} className="rounded-lg border bg-card p-4">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="mt-1 font-medium capitalize">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
