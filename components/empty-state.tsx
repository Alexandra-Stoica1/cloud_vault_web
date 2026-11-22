import type { ReactNode } from "react"

type EmptyStateProps = {
  icon: ReactNode
  title: string
  description: string
  /** Usually the button that creates the first item. */
  action?: ReactNode
}

/** Placeholder for a list or section with nothing to show yet. */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-secondary text-primary [&_svg]:size-6">
        {icon}
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
