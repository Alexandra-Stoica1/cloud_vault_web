"use client"

import { ChevronDown, LogOut } from "lucide-react"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { logoutAction } from "../actions"
import type { User } from "../types"

/** Account menu in the header: who is signed in, and sign out. */
export function UserMenu({ user }: { user: Pick<User, "username" | "email"> }) {
  const [signingOut, startSignOut] = useTransition()
  const initial = user.username.charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="h-10 gap-2 px-2" />}
      >
        <span
          aria-hidden="true"
          className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary"
        >
          {initial}
        </span>
        <span className="hidden max-w-40 truncate sm:inline">
          {user.username}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 text-muted-foreground"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="block truncate font-medium text-foreground">
              {user.username}
            </span>
            <span className="block truncate font-normal">{user.email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={signingOut}
          onClick={() => startSignOut(() => logoutAction())}
        >
          <LogOut aria-hidden="true" />
          {signingOut ? "Signing out…" : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
