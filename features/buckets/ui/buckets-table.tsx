import { Folder } from "lucide-react"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatBytes, formatDate } from "@/lib/format"
import { routes } from "@/lib/routes"

import type { Bucket } from "../types"
import { BucketAccessBadge } from "./bucket-access-badge"
import { BucketActionsMenu } from "./bucket-actions-menu"

type BucketsTableProps = {
  buckets: Bucket[]
  currentUserId: string
}

/** The user's buckets; less important columns hide on small screens. */
export function BucketsTable({ buckets, currentUserId }: BucketsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="px-4">Name</TableHead>
            <TableHead>Access</TableHead>
            <TableHead className="hidden sm:table-cell">Size</TableHead>
            <TableHead className="hidden md:table-cell">Members</TableHead>
            <TableHead className="hidden lg:table-cell">Updated</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buckets.map((bucket) => (
            <TableRow key={bucket.id}>
              <TableCell className="px-4 py-3">
                <Link
                  href={routes.bucket(bucket.id)}
                  className="flex items-center gap-3 rounded-lg font-medium outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 sm:min-w-48"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Folder aria-hidden="true" className="size-4" />
                  </span>
                  {/* Narrower on phones so the table fits without scrolling. */}
                  <span className="max-w-32 min-w-0 sm:max-w-xs">
                    <span className="block truncate">{bucket.name}</span>
                    {bucket.description && (
                      <span className="block truncate text-xs font-normal text-muted-foreground">
                        {bucket.description}
                      </span>
                    )}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <BucketAccessBadge
                  bucket={bucket}
                  currentUserId={currentUserId}
                />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {formatBytes(bucket.usedBytes)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {bucket.isShared ? bucket.memberCount : "—"}
              </TableCell>
              <TableCell className="hidden text-muted-foreground lg:table-cell">
                {formatDate(bucket.updatedAt)}
              </TableCell>
              <TableCell>
                <BucketActionsMenu
                  bucket={bucket}
                  canManage={bucket.owner.id === currentUserId}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
