import type { ReactNode } from "react"

import { BrandLogo } from "@/components/brand-logo"

import { MobileNav } from "./mobile-nav"

/** Top bar of the signed-in area. `actions` goes on the right (e.g. the user menu). */
export function AppHeader({ actions }: { actions?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 h-16 border-b bg-card">
      <div className="mx-auto flex h-full max-w-[1100px] items-center gap-2 px-4 sm:px-6">
        <MobileNav />
        {/* On large screens the logo is in the sidebar. */}
        <BrandLogo className="lg:hidden" />
        <div className="ml-auto flex items-center gap-1">{actions}</div>
      </div>
    </header>
  )
}
