import type { ComponentProps } from "react"

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { FormField } from "./form-field"

type TextareaFieldProps = Omit<ComponentProps<typeof Textarea>, "name"> & {
  name: string
  label: string
  error?: string
  hint?: string
}

/** A labelled multi-line text input with its validation message. */
export function TextareaField({
  name,
  label,
  error,
  hint,
  id = name,
  required,
  className,
  rows = 3,
  ...textareaProps
}: TextareaFieldProps) {
  return (
    <FormField
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
    >
      {(control) => (
        <Textarea
          name={name}
          required={required}
          rows={rows}
          className={cn("bg-card", className)}
          {...control}
          {...textareaProps}
        />
      )}
    </FormField>
  )
}
