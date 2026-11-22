"use client"

import { LoaderCircle } from "lucide-react"
import type { ComponentProps } from "react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type">

/** Submit button that shows a spinner and blocks double submits while the form is sent. */
export function SubmitButton({
  children,
  className,
  disabled,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      aria-busy={pending}
      className={cn("h-10", className)}
      {...props}
    >
      {pending && (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      )}
      {children}
    </Button>
  )
}
