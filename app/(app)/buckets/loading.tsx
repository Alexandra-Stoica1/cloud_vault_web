import { PageHeader } from "@/components/page-header"
import { BucketsTableSkeleton } from "@/features/buckets/ui/buckets-table-skeleton"

export default function BucketsLoading() {
  return (
    <>
      <PageHeader
        title="Buckets"
        description="Organize files and control who can access them."
      />
      <BucketsTableSkeleton />
    </>
  )
}
