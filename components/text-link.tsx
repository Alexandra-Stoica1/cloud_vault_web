import Link from "next/link"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/** An inline link in the primary color. */
export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:underline",
        className
      )}
      {...props}
    />
  )
}
