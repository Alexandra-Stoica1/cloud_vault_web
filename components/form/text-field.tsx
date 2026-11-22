import type { ComponentProps } from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type TextFieldProps = Omit<ComponentProps<typeof Input>, "name"> & {
  name: string
  label: string
  /** Validation message; marks the field as invalid. */
  error?: string
  /** Help text shown when there is no error. */
  hint?: string
}

/** A labelled text input with its validation message, for use in any form. */
export function TextField({
  name,
  label,
  error,
  hint,
  id = name,
  required,
  className,
  ...inputProps
}: TextFieldProps) {
  const messageId = `${id}-message`
  const message = error ?? hint

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>
      <Input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn("h-10 bg-card", className)}
        {...inputProps}
      />
      {error ? (
        <FieldError id={messageId}>{error}</FieldError>
      ) : (
        hint && <FieldDescription id={messageId}>{hint}</FieldDescription>
      )}
    </Field>
  )
}
