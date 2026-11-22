import { CircleAlert } from "lucide-react"

import { cn } from "@/lib/utils"

/** Form-level error, e.g. wrong credentials. Renders nothing without a message. */
export function FormAlert({
  message,
  className,
}: {
  message?: string
  className?: string
}) {
  if (!message) return null

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive",
        className
      )}
    >
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  )
}
