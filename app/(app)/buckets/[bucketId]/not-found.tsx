import { FolderX } from "lucide-react"
import Link from "next/link"

import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { routes } from "@/lib/routes"

/** Shown when the bucket does not exist or the user has no access to it. */
export default function BucketNotFound() {
  return (
    <div className="rounded-lg border bg-card">
      <EmptyState
        icon={<FolderX aria-hidden="true" />}
        title="Bucket not found"
        description="It may have been deleted, or you no longer have access to it."
        action={
          <Button className="h-10" render={<Link href={routes.buckets} />}>
            Back to buckets
          </Button>
        }
      />
    </div>
  )
}
