import "server-only"

import { apiRequestAsUser } from "@/features/auth/server/authorized-request"

import type { CreateBucketValues, UpdateBucketValues } from "../schemas"
import type { Bucket } from "../types"

// Response body of the FastAPI /api/buckets endpoints.
type BucketDto = {
  id: string
  name: string
  description: string | null
  is_shared: boolean
  used_bytes: number
  owner: { id: string; username: string; tier: string }
  member_count: number
  created_at: string
  updated_at: string
}

function toBucket(dto: BucketDto): Bucket {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    isShared: dto.is_shared,
    usedBytes: dto.used_bytes,
    owner: dto.owner,
    memberCount: dto.member_count,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  }
}

const bucketPath = (bucketId: string) =>
  `/api/buckets/${encodeURIComponent(bucketId)}`

/** Typed wrappers around /api/buckets, called as the signed-in user. */
export const bucketsApi = {
  /** Buckets the user owns or is a member of. */
  async list(): Promise<Bucket[]> {
    const dtos = await apiRequestAsUser<BucketDto[]>("/api/buckets")
    return dtos.map(toBucket)
  },

  async get(bucketId: string): Promise<Bucket> {
    return toBucket(await apiRequestAsUser<BucketDto>(bucketPath(bucketId)))
  },

  async create(values: CreateBucketValues): Promise<Bucket> {
    const dto = await apiRequestAsUser<BucketDto>("/api/buckets", {
      method: "POST",
      body: {
        name: values.name,
        description: values.description,
        is_shared: values.isShared,
      },
    })
    return toBucket(dto)
  },

  async update(bucketId: string, values: UpdateBucketValues): Promise<Bucket> {
    const dto = await apiRequestAsUser<BucketDto>(bucketPath(bucketId), {
      method: "PUT",
      body: values,
    })
    return toBucket(dto)
  },

  /** Also deletes the bucket's folders and files. */
  async remove(bucketId: string): Promise<void> {
    await apiRequestAsUser<void>(bucketPath(bucketId), { method: "DELETE" })
  },
}
