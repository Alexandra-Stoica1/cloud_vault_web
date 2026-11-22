import { BrandLogo } from "@/components/brand-logo"

import { NavLinks } from "./nav-links"

/** Fixed sidebar on large screens; smaller screens use MobileNav instead. */
export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r bg-card lg:flex">
      <div className="flex h-16 items-center px-5">
        <BrandLogo />
      </div>
      <div className="flex-1 px-3 py-5">
        <NavLinks />
      </div>
    </aside>
  )
}
