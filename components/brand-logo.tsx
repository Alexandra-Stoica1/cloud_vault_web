import { ShieldCheck } from "lucide-react"
import Link from "next/link"

import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"

/** The CloudVault mark and name, linking to the home page. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href={routes.home}
      className={cn(
        "flex items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <ShieldCheck aria-hidden="true" className="size-5" />
      </span>
      <span className="text-lg font-semibold tracking-[-0.02em]">
        CloudVault
      </span>
    </Link>
  )
}
