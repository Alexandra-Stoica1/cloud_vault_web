"use client"

import { useActionState, useEffect } from "react"

import { CheckboxField } from "@/components/form/checkbox-field"
import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { TextareaField } from "@/components/form/textarea-field"

import {
  createBucketAction,
  updateBucketAction,
  type BucketFormState,
} from "../actions"
import type { Bucket } from "../types"

type BucketFormProps = {
  /** The bucket to edit; without it the form creates a new bucket. */
  bucket?: Bucket
  /** Called after a successful save, e.g. to close the dialog. */
  onSuccess: () => void
  /** Rendered next to the submit button, e.g. a Cancel button. */
  secondaryAction?: React.ReactNode
}

const initialState: BucketFormState = {}

/** Create or edit form; the fields start with the bucket's current values. */
export function BucketForm({
  bucket,
  onSuccess,
  secondaryAction,
}: BucketFormProps) {
  const action = bucket
    ? updateBucketAction.bind(null, bucket.id)
    : createBucketAction
  const [state, formAction] = useActionState(action, initialState)
  const errors = state.fieldErrors ?? {}
  const values = state.values

  useEffect(() => {
    if (state.success) onSuccess()
  }, [state, onSuccess])

  return (
    <form action={formAction} noValidate className="space-y-5">
      <TextField
        name="name"
        label="Name"
        required
        autoFocus
        maxLength={255}
        defaultValue={values?.name ?? bucket?.name}
        error={errors.name}
      />
      <TextareaField
        name="description"
        label="Description"
        hint="Optional context for people with access."
        maxLength={500}
        defaultValue={values?.description ?? bucket?.description ?? ""}
        error={errors.description}
      />
      {!bucket && (
        <CheckboxField
          name="isShared"
          label="Shared bucket"
          hint="Shared buckets can have members. Your plan limits how many you can create."
          defaultChecked={values?.isShared === "on"}
        />
      )}
      <FormAlert message={state.message} />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {secondaryAction}
        <SubmitButton>{bucket ? "Save changes" : "Create bucket"}</SubmitButton>
      </div>
    </form>
  )
}
