import { Skeleton } from "@/components/ui/skeleton"

export default function BucketLoading() {
  return (
    <div aria-busy="true" aria-label="Loading bucket">
      <Skeleton className="mb-3 h-4 w-20" />
      <Skeleton className="h-8 w-64" />
      <Skeleton className="mt-2 mb-6 h-4 w-80 max-w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-20" />
        ))}
      </div>
    </div>
  )
}
