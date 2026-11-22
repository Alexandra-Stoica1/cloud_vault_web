import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type DetailItem = {
  label: string
  value: ReactNode
}

/** Label / value cards, e.g. an account or bucket summary. */
export function DetailGrid({
  items,
  className,
}: {
  items: DetailItem[]
  className?: string
}) {
  return (
    <dl className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map(({ label, value }) => (
        <div key={label} className="min-w-0 rounded-lg border bg-card p-4">
          <dt className="text-sm text-muted-foreground">{label}</dt>
          <dd className="mt-1 truncate font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
