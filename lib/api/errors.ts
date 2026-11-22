/** Field name -> first validation message, e.g. { email: "value is not a valid email" }. */
export type FieldErrors = Record<string, string>

/** An error response from the CloudVault API (or the API being unreachable). */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly fieldErrors: FieldErrors = {}
  ) {
    super(message)
    this.name = "ApiError"
  }
}

type ValidationIssue = { loc?: (string | number)[]; msg?: string }

/**
 * FastAPI returns { detail: "message" } for business errors and
 * { detail: [{ loc, msg }] } for request validation errors (422).
 */
export async function toApiError(response: Response): Promise<ApiError> {
  const body = await response.json().catch(() => null)
  const detail: unknown = body?.detail

  if (typeof detail === "string") {
    return new ApiError(response.status, detail)
  }
  if (Array.isArray(detail)) {
    const fieldErrors: FieldErrors = {}
    for (const issue of detail as ValidationIssue[]) {
      const field = issue.loc?.at(-1)
      if (typeof field === "string" && issue.msg && !fieldErrors[field]) {
        fieldErrors[field] = issue.msg
      }
    }
    return new ApiError(
      response.status,
      "Please correct the highlighted fields.",
      fieldErrors
    )
  }
  return new ApiError(
    response.status,
    "Something went wrong. Please try again."
  )
}

export function isApiError(error: unknown, status?: number): error is ApiError {
  return (
    error instanceof ApiError &&
    (status === undefined || error.status === status)
  )
}
