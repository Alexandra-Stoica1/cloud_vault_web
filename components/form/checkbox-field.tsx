"use client"

import { useState, type ComponentProps } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

type CheckboxFieldProps = Omit<
  ComponentProps<typeof Checkbox>,
  "name" | "checked" | "onCheckedChange"
> & {
  name: string
  label: string
  /** Help text under the label. */
  hint?: string
}

/**
 * A checkbox with its label and help text. The form receives "on" when it is checked.
 *
 * The checked state lives here, so it survives a failed submit: React resets the form
 * after a Server Action, and Base UI does not allow changing `defaultChecked` later.
 * `defaultChecked` only sets the state when the field mounts.
 */
export function CheckboxField({
  name,
  label,
  hint,
  id = name,
  defaultChecked = false,
  ...checkboxProps
}: CheckboxFieldProps) {
  const [checked, setChecked] = useState(defaultChecked)
  const hintId = `${id}-hint`

  return (
    <Field orientation="horizontal">
      <Checkbox
        id={id}
        name={name}
        checked={checked}
        onCheckedChange={setChecked}
        aria-describedby={hint ? hintId : undefined}
        {...checkboxProps}
      />
      <FieldContent>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {hint && <FieldDescription id={hintId}>{hint}</FieldDescription>}
      </FieldContent>
    </Field>
  )
}
