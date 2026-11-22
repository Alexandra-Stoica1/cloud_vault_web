"use client"

import { Menu } from "lucide-react"
import { useState } from "react"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { NavLinks } from "./nav-links"

/** Menu button that opens the navigation in a side sheet (small screens only). */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Open navigation"
            className="lg:hidden"
          />
        }
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-60 gap-0 p-0">
        <SheetHeader className="h-16 justify-center px-5">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <BrandLogo />
        </SheetHeader>
        <div className="px-3 py-5">
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
