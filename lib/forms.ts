import type { z } from "zod"

import { isApiError } from "@/lib/api/errors"

/** State returned by a Server Action to its form (useActionState). */
export type FormState<Field extends string> = {
  /** True after a successful submit, e.g. to close the dialog holding the form. */
  success?: boolean
  /** Message shown above the submit button. */
  message?: string
  /** Field name -> validation message. */
  fieldErrors?: Partial<Record<Field, string>>
  /** Submitted values, so the form keeps them after an error (passwords excluded). */
  values?: Partial<Record<Field, string>>
}

/** Turns an API error into form state; unexpected errors go to the error boundary. */
export function apiErrorState<Field extends string>(
  error: unknown,
  values?: Partial<Record<Field, string>>
): FormState<Field> {
  if (!isApiError(error)) throw error
  return {
    message: error.message,
    fieldErrors: error.fieldErrors as Partial<Record<Field, string>>,
    values,
  }
}

/** Reads the given text fields from a submitted form ("" when a field is missing). */
export function readFormValues<Field extends string>(
  formData: FormData,
  fields: readonly Field[]
): Record<Field, string> {
  const values = {} as Record<Field, string>
  for (const field of fields) {
    const value = formData.get(field)
    values[field] = typeof value === "string" ? value : ""
  }
  return values
}

/** The first validation message of each field, e.g. { email: "Enter a valid email address" }. */
export function fieldErrorsFrom<Field extends string>(
  error: z.ZodError
): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {}
  for (const issue of error.issues) {
    const field = issue.path[0] as Field | undefined
    if (field !== undefined && !errors[field]) errors[field] = issue.message
  }
  return errors
}

/** Copies only the listed fields, e.g. to send the values back without the passwords. */
export function pick<Field extends string>(
  values: Record<string, string>,
  fields: readonly Field[]
): Partial<Record<Field, string>> {
  const picked: Partial<Record<Field, string>> = {}
  for (const field of fields) picked[field] = values[field]
  return picked
}
