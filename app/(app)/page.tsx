import type { Metadata } from "next"

import { DetailGrid } from "@/components/detail-grid"
import { PageHeader } from "@/components/page-header"
import { requireUser } from "@/features/auth/server/session"
import { formatDate } from "@/lib/format"

export const metadata: Metadata = { title: "Home" }

export default async function HomePage() {
  const user = await requireUser()

  return (
    <>
      <PageHeader
        title={`Welcome, ${user.username}`}
        description="Your account at a glance."
      />
      <DetailGrid
        items={[
          {
            label: "Plan",
            value: <span className="capitalize">{user.tier}</span>,
          },
          {
            label: "Email",
            value: user.emailVerified ? "Verified" : "Not verified",
          },
          { label: "Member since", value: formatDate(user.createdAt) },
        ]}
      />
    </>
  )
}
