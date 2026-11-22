"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import {
  apiErrorState,
  fieldErrorsFrom,
  readFormValues,
  type FormState,
} from "@/lib/forms"
import { routes } from "@/lib/routes"

import {
  createBucketSchema,
  updateBucketSchema,
  type BucketField,
} from "./schemas"
import { bucketsApi } from "./server/buckets-api"

export type BucketFormState = FormState<BucketField>

const TEXT_FIELDS = ["name", "description"] as const

/** The form's checkbox sends "on" when checked and nothing otherwise. */
const isChecked = (formData: FormData, field: string) =>
  formData.get(field) === "on"

export async function createBucketAction(
  _previous: BucketFormState,
  formData: FormData
): Promise<BucketFormState> {
  const values = readFormValues(formData, TEXT_FIELDS)
  const isShared = isChecked(formData, "isShared")
  // Sent back after an error so the form keeps the checkbox state too.
  const kept = { ...values, isShared: isShared ? "on" : "" }
  const parsed = createBucketSchema.safeParse({ ...values, isShared })
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error), values: kept }
  }

  try {
    await bucketsApi.create(parsed.data)
  } catch (error) {
    // e.g. 409 duplicate name, 400 shared bucket limit of the tier
    return apiErrorState(error, kept)
  }
  revalidatePath(routes.buckets)
  return { success: true }
}

/** Bound to a bucket id in the form: updateBucketAction.bind(null, bucket.id). */
export async function updateBucketAction(
  bucketId: string,
  _previous: BucketFormState,
  formData: FormData
): Promise<BucketFormState> {
  const values = readFormValues(formData, TEXT_FIELDS)
  const parsed = updateBucketSchema.safeParse(values)
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error), values }
  }

  try {
    await bucketsApi.update(bucketId, parsed.data)
  } catch (error) {
    // e.g. 409 duplicate name, 403 not the owner
    return apiErrorState(error, values)
  }
  revalidatePath(routes.buckets)
  revalidatePath(routes.bucket(bucketId))
  return { success: true }
}

/** Deletes the bucket and returns to the bucket list. */
export async function deleteBucketAction(
  bucketId: string
): Promise<FormState<never>> {
  try {
    await bucketsApi.remove(bucketId)
  } catch (error) {
    return apiErrorState(error)
  }
  revalidatePath(routes.buckets)
  redirect(routes.buckets)
}
