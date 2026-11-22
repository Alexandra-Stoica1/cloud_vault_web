import type { ComponentProps } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

type CheckboxFieldProps = Omit<ComponentProps<typeof Checkbox>, "name"> & {
  name: string
  label: string
  /** Help text under the label. */
  hint?: string
}

/** A checkbox with its label and help text. The form receives "on" when it is checked. */
export function CheckboxField({
  name,
  label,
  hint,
  id = name,
  ...checkboxProps
}: CheckboxFieldProps) {
  const hintId = `${id}-hint`

  return (
    <Field orientation="horizontal">
      <Checkbox
        id={id}
        name={name}
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
