import { Gauge, HardDrive, type LucideIcon } from "lucide-react"

import { routes } from "@/lib/routes"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

/** Main navigation of the signed-in area, shared by the sidebar and the mobile menu. */
export const navigation: NavItem[] = [
  { label: "Home", href: routes.home, icon: Gauge },
  { label: "Buckets", href: routes.buckets, icon: HardDrive },
]

/** The home link is active only on "/", the others also on their sub-pages. */
export function isActive(href: string, pathname: string) {
  if (href === routes.home) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}
