"use client"

import { useCallback } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import type { Bucket } from "../types"
import { BucketForm } from "./bucket-form"

type BucketFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The bucket to edit; without it the dialog creates a new bucket. */
  bucket?: Bucket
}

/**
 * Dialog with the bucket form. The form is mounted only while the dialog is open,
 * so every opening starts with fresh values and no old errors.
 */
export function BucketFormDialog({
  open,
  onOpenChange,
  bucket,
}: BucketFormDialogProps) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {bucket ? "Edit bucket" : "Create a bucket"}
          </DialogTitle>
          <DialogDescription>
            Buckets keep related files and folders together.
          </DialogDescription>
        </DialogHeader>
        <BucketForm
          bucket={bucket}
          onSuccess={close}
          secondaryAction={
            <DialogClose render={<Button variant="outline" className="h-10" />}>
              Cancel
            </DialogClose>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
