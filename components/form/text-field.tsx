import type { ComponentProps } from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { FormField } from "./form-field"

type TextFieldProps = Omit<ComponentProps<typeof Input>, "name"> & {
  name: string
  label: string
  error?: string
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
  return (
    <FormField
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
    >
      {(control) => (
        <Input
          name={name}
          required={required}
          className={cn("h-10 bg-card", className)}
          {...control}
          {...inputProps}
        />
      )}
    </FormField>
  )
}
