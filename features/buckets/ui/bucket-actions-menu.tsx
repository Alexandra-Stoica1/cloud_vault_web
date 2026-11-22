"use client"

import { FolderOpen, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { routes } from "@/lib/routes"

import type { Bucket } from "../types"
import { useBucketDialogs } from "./use-bucket-dialogs"

type BucketActionsMenuProps = {
  bucket: Bucket
  /** Only the owner can edit or delete a bucket. */
  canManage: boolean
}

/** The "…" menu of a bucket row: open, edit and delete. */
export function BucketActionsMenu({
  bucket,
  canManage,
}: BucketActionsMenuProps) {
  const { openEdit, openDelete, dialogs } = useBucketDialogs(bucket)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Actions for ${bucket.name}`}
            />
          }
        >
          <MoreHorizontal aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href={routes.bucket(bucket.id)} />}>
            <FolderOpen aria-hidden="true" />
            Open
          </DropdownMenuItem>
          {canManage && (
            <>
              <DropdownMenuItem onClick={openEdit}>
                <Pencil aria-hidden="true" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={openDelete}>
                <Trash2 aria-hidden="true" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {canManage && dialogs}
    </>
  )
}
