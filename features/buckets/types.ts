export type BucketOwner = {
  id: string
  username: string
  tier: string
}

export type Bucket = {
  id: string
  name: string
  description: string | null
  /** Shared buckets have members; personal ones count toward the owner's quota. */
  isShared: boolean
  usedBytes: number
  owner: BucketOwner
  memberCount: number
  createdAt: string
  updatedAt: string
}
