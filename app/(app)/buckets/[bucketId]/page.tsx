import { ArrowLeft, FileText } from "lucide-react"
import type { Metadata } from "next"

import { DetailGrid } from "@/components/detail-grid"
import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import { TextLink } from "@/components/text-link"
import { requireUser } from "@/features/auth/server/session"
import { getBucket } from "@/features/buckets/server/queries"
import { BucketAccessBadge } from "@/features/buckets/ui/bucket-access-badge"
import { BucketOwnerActions } from "@/features/buckets/ui/bucket-owner-actions"
import { formatBytes, formatDate } from "@/lib/format"
import { routes } from "@/lib/routes"

type BucketPageProps = { params: Promise<{ bucketId: string }> }

export async function generateMetadata({
  params,
}: BucketPageProps): Promise<Metadata> {
  const bucket = await getBucket((await params).bucketId)
  return { title: bucket.name }
}

export default async function BucketPage({ params }: BucketPageProps) {
  const { bucketId } = await params
  const [user, bucket] = await Promise.all([requireUser(), getBucket(bucketId)])
  const isOwner = bucket.owner.id === user.id

  return (
    <>
      <PageHeader
        eyebrow={
          <TextLink
            href={routes.buckets}
            className="inline-flex items-center gap-1 text-sm"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Buckets
          </TextLink>
        }
        title={bucket.name}
        description={bucket.description}
        actions={isOwner && <BucketOwnerActions bucket={bucket} />}
      />
      <BucketAccessBadge bucket={bucket} currentUserId={user.id} />
      <DetailGrid
        className="mt-4"
        items={[
          { label: "Size", value: formatBytes(bucket.usedBytes) },
          { label: "Owner", value: isOwner ? "You" : bucket.owner.username },
          {
            label: "Members",
            value: bucket.isShared ? bucket.memberCount : "Only you",
          },
          { label: "Created", value: formatDate(bucket.createdAt) },
          { label: "Last updated", value: formatDate(bucket.updatedAt) },
        ]}
      />
      <section aria-labelledby="files-heading" className="mt-8">
        <h2 id="files-heading" className="mb-3 text-lg font-semibold">
          Files
        </h2>
        <div className="rounded-lg border bg-card">
          <EmptyState
            icon={<FileText aria-hidden="true" />}
            title="No files yet"
            description="Uploading files to buckets is coming in a later version."
          />
        </div>
      </section>
    </>
  )
}
