import type { ReactNode } from "react"

import { AppHeader } from "@/components/app/app-header"
import { requireUser } from "@/features/auth/server/session"
import { UserMenu } from "@/features/auth/ui/user-menu"

/** Layout of every page that needs a signed-in user. */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireUser()

  return (
    <div className="min-h-svh">
      <AppHeader
        actions={
          <UserMenu user={{ username: user.username, email: user.email }} />
        }
      />
      <main className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  )
}
