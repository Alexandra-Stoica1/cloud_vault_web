"use client"

import { useActionState } from "react"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import type { FormState } from "@/lib/forms"
import { NEXT_PARAM } from "@/lib/routes"

import { loginAction } from "../actions"
import type { LoginField } from "../schemas"

const initialState: FormState<LoginField> = {}

/** Email and password form. `next` is the page to open after signing in. */
export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState(loginAction, initialState)
  const errors = state.fieldErrors ?? {}

  return (
    <form action={formAction} noValidate className="space-y-5">
      {next && <input type="hidden" name={NEXT_PARAM} value={next} />}
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
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        required
        error={errors.password}
      />
      <FormAlert message={state.message} />
      <SubmitButton className="w-full">Sign in</SubmitButton>
    </form>
  )
}
