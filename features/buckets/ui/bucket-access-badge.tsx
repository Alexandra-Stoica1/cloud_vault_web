import { Badge } from "@/components/ui/badge"

import type { Bucket } from "../types"

/** "Personal" or "Shared"; shared buckets owned by someone else say so. */
export function BucketAccessBadge({
  bucket,
  currentUserId,
}: {
  bucket: Pick<Bucket, "isShared" | "owner">
  currentUserId: string
}) {
  if (!bucket.isShared) return <Badge variant="outline">Personal</Badge>
  if (bucket.owner.id !== currentUserId) {
    return <Badge variant="secondary">Shared with you</Badge>
  }
  return <Badge variant="secondary">Shared</Badge>
}
