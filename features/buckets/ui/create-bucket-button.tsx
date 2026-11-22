"use client"

import { Plus } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

import { BucketFormDialog } from "./bucket-form-dialog"

/** "New bucket" button that opens the create dialog. */
export function CreateBucketButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className="h-10" onClick={() => setOpen(true)}>
        <Plus aria-hidden="true" />
        New bucket
      </Button>
      <BucketFormDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
