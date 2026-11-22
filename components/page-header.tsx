import type { ReactNode } from "react"

type PageHeaderProps = {
  title: ReactNode
  description?: ReactNode
  /** Buttons on the right, e.g. "New bucket". */
  actions?: ReactNode
  /** Shown above the title, e.g. a link back to the list. */
  eyebrow?: ReactNode
}

/** Title row at the top of every signed-in page. */
export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <div className="mb-2">{eyebrow}</div>}
        <h1 className="text-2xl font-semibold tracking-[-0.02em] break-words">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </header>
  )
}
