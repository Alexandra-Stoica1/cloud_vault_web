import { z } from "zod"

// Same limits as the API (app/schemas/bucket.py).
const name = z
  .string()
  .trim()
  .min(1, "Enter a bucket name")
  .max(255, "Keep the name under 255 characters")

const description = z
  .string()
  .trim()
  .max(500, "Keep the description under 500 characters")
  .transform((value) => value || null) // empty -> no description

export const createBucketSchema = z.object({
  name,
  description,
  isShared: z.boolean(),
})

/** The shared flag cannot change after creation. */
export const updateBucketSchema = z.object({ name, description })

export type CreateBucketValues = z.infer<typeof createBucketSchema>
export type UpdateBucketValues = z.infer<typeof updateBucketSchema>
export type BucketField = keyof CreateBucketValues
