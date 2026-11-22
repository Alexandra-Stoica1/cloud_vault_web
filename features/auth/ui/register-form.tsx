"use client"

import { useActionState } from "react"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import type { FormState } from "@/lib/forms"

import { registerAction } from "../actions"
import type { RegisterField } from "../schemas"

const initialState: FormState<RegisterField> = {}

/** Sign-up form. A successful registration signs the user in. */
export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState)
  const errors = state.fieldErrors ?? {}

  return (
    <form action={formAction} noValidate className="space-y-4">
      <TextField
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        defaultValue={state.values?.email}
        error={errors.email}
      />
      <TextField
        name="username"
        label="Username"
        autoComplete="username"
        hint="Letters, digits, _, . and -"
        required
        defaultValue={state.values?.username}
        error={errors.username}
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        autoComplete="new-password"
        hint="At least 8 characters"
        required
        error={errors.password}
      />
      <TextField
        name="confirmPassword"
        type="password"
        label="Confirm password"
        autoComplete="new-password"
        required
        error={errors.confirmPassword}
      />
      <FormAlert message={state.message} />
      <SubmitButton className="w-full">Create account</SubmitButton>
    </form>
  )
}
