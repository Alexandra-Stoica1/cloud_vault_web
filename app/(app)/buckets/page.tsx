import { Folder } from "lucide-react"
import type { Metadata } from "next"

import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import { requireUser } from "@/features/auth/server/session"
import { getBuckets } from "@/features/buckets/server/queries"
import { BucketsTable } from "@/features/buckets/ui/buckets-table"
import { CreateBucketButton } from "@/features/buckets/ui/create-bucket-button"

export const metadata: Metadata = { title: "Buckets" }

export default async function BucketsPage() {
  const [user, buckets] = await Promise.all([requireUser(), getBuckets()])
  const hasBuckets = buckets.length > 0

  return (
    <>
      <PageHeader
        title="Buckets"
        description="Organize files and control who can access them."
        actions={hasBuckets && <CreateBucketButton />}
      />
      {hasBuckets ? (
        <BucketsTable buckets={buckets} currentUserId={user.id} />
      ) : (
        <div className="rounded-lg border bg-card">
          <EmptyState
            icon={<Folder aria-hidden="true" />}
            title="No buckets yet"
            description="Create your first bucket to start organizing files."
            action={<CreateBucketButton />}
          />
        </div>
      )}
    </>
  )
}
