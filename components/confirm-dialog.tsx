"use client"

import { LoaderCircle } from "lucide-react"
import { useState, useTransition } from "react"

import { FormAlert } from "@/components/form/form-alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

/** What onConfirm returns: nothing on success, or the error to show in the dialog. */
export type ConfirmResult = { message?: string } | void

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => Promise<ConfirmResult>
}

/** Asks before a destructive action and keeps the dialog open if it fails. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
}: ConfirmDialogProps) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string>()

  const changeOpen = (next: boolean) => {
    if (pending) return // the action is still running
    setError(undefined)
    onOpenChange(next)
  }

  const confirm = () =>
    startTransition(async () => {
      const result = await onConfirm()
      if (result?.message) setError(result.message)
      else onOpenChange(false)
    })

  return (
    <AlertDialog open={open} onOpenChange={changeOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <FormAlert message={error} />
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={pending}
            onClick={confirm}
          >
            {pending && (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            )}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
