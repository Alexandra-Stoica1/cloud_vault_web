"use client"

import { CircleAlert } from "lucide-react"
import { useEffect } from "react"

import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"

/**
 * Shown when a page fails unexpectedly, e.g. the CloudVault API is down. It sits at the
 * root so it also covers the signed-in layout, which loads the user from the API.
 */
export default function AppError({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-card">
        <EmptyState
          icon={<CircleAlert aria-hidden="true" />}
          title="Something went wrong"
          description="We couldn't load this page. Please try again in a moment."
          action={
            <Button className="h-10" onClick={retry}>
              Try again
            </Button>
          }
        />
      </div>
    </main>
  )
}
