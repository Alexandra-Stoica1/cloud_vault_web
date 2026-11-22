import "server-only"

import { notFound } from "next/navigation"
import { cache } from "react"

import { isApiError } from "@/lib/api/errors"

import type { Bucket } from "../types"
import { bucketsApi } from "./buckets-api"

/** Buckets the signed-in user owns or is a member of; fetched once per request. */
export const getBuckets = cache((): Promise<Bucket[]> => bucketsApi.list())

/**
 * One bucket. A bucket that does not exist, is not visible to the user (the API answers
 * 404 for both) or has a malformed id (422) shows the not-found page.
 */
export const getBucket = cache(async (bucketId: string): Promise<Bucket> => {
  try {
    return await bucketsApi.get(bucketId)
  } catch (error) {
    if (isApiError(error, 404) || isApiError(error, 422)) notFound()
    throw error
  }
})
