import type { ReactNode } from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

/** Accessibility props a form control needs to be linked to its label and message. */
export type FieldControlProps = {
  id: string
  "aria-invalid"?: true
  "aria-describedby"?: string
}

export type FormFieldProps = {
  id: string
  label: string
  /** Validation message; marks the field as invalid. */
  error?: string
  /** Help text shown when there is no error. */
  hint?: string
  required?: boolean
  /** Renders the control with the props that link it to the label and message. */
  children: (control: FieldControlProps) => ReactNode
}

/** Label, control and validation message: the frame shared by every form field. */
export function FormField({
  id,
  label,
  error,
  hint,
  required,
  children,
}: FormFieldProps) {
  const messageId = `${id}-message`
  const hasMessage = Boolean(error ?? hint)

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": hasMessage ? messageId : undefined,
      })}
      {error ? (
        <FieldError id={messageId}>{error}</FieldError>
      ) : (
        hint && <FieldDescription id={messageId}>{hint}</FieldDescription>
      )}
    </Field>
  )
}
