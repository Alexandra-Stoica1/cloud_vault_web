"use client"

import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import type { Bucket } from "../types"
import { useBucketDialogs } from "./use-bucket-dialogs"

/** Edit and Delete buttons of the bucket page (shown to the owner only). */
export function BucketOwnerActions({ bucket }: { bucket: Bucket }) {
  const { openEdit, openDelete, dialogs } = useBucketDialogs(bucket)

  return (
    <>
      <Button variant="outline" className="h-10" onClick={openEdit}>
        <Pencil aria-hidden="true" />
        Edit
      </Button>
      <Button variant="destructive" className="h-10" onClick={openDelete}>
        <Trash2 aria-hidden="true" />
        Delete
      </Button>
      {dialogs}
    </>
  )
}
