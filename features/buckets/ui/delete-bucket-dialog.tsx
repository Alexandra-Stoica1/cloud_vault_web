"use client"

import { ConfirmDialog } from "@/components/confirm-dialog"

import { deleteBucketAction } from "../actions"
import type { Bucket } from "../types"

type DeleteBucketDialogProps = {
  bucket: Pick<Bucket, "id" | "name">
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Confirms the delete; on success the user lands on the bucket list. */
export function DeleteBucketDialog({
  bucket,
  open,
  onOpenChange,
}: DeleteBucketDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete this bucket?"
      description={`"${bucket.name}" and all of its folders and files will be permanently removed.`}
      confirmLabel="Delete bucket"
      onConfirm={() => deleteBucketAction(bucket.id)}
    />
  )
}
