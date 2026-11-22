import { Skeleton } from "@/components/ui/skeleton"

/** Placeholder rows shown while the buckets load. */
export function BucketsTableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading buckets"
      className="divide-y rounded-lg border bg-card"
    >
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="flex items-center gap-4 px-4 py-4">
          <Skeleton className="size-8" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="hidden h-4 w-20 sm:block" />
          <Skeleton className="hidden h-4 w-16 md:block" />
          <Skeleton className="size-6" />
        </div>
      ))}
    </div>
  )
}
