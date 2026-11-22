"use client"

import { useState } from "react"

import type { Bucket } from "../types"
import { BucketFormDialog } from "./bucket-form-dialog"
import { DeleteBucketDialog } from "./delete-bucket-dialog"

type OpenDialog = "edit" | "delete" | null

/**
 * The edit and delete dialogs of one bucket. Returns the functions that open them and
 * the dialogs to render, so any trigger (a menu item, a button) can reuse them.
 */
export function useBucketDialogs(bucket: Bucket) {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null)

  const toggle = (dialog: Exclude<OpenDialog, null>) => (open: boolean) =>
    setOpenDialog(open ? dialog : null)

  const dialogs = (
    <>
      <BucketFormDialog
        bucket={bucket}
        open={openDialog === "edit"}
        onOpenChange={toggle("edit")}
      />
      <DeleteBucketDialog
        bucket={bucket}
        open={openDialog === "delete"}
        onOpenChange={toggle("delete")}
      />
    </>
  )

  return {
    openEdit: () => setOpenDialog("edit"),
    openDelete: () => setOpenDialog("delete"),
    dialogs,
  }
}
