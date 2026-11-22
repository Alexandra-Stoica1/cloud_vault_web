import { z } from "zod"

// Same rules as the API (app/schemas/auth.py), so most errors are caught before the request.
const email = z.email("Enter a valid email address").max(255)

const username = z
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters")
  .max(100, "Username must be 100 characters or fewer")
  .regex(/^[A-Za-z0-9_.-]+$/, "Use only letters, digits, _, . or -")

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be 128 characters or fewer")

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password").max(128),
})

export const registerSchema = z
  .object({
    email,
    username,
    password,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
export type LoginField = keyof LoginValues
export type RegisterField = keyof RegisterValues
