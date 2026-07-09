import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export type LoginResponse = {
  token: string
  username: string
  full_name: string
  role: string
}

export class LoginError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LoginError'
  }
}

export async function loginRequest(
  values: LoginFormValues,
): Promise<LoginResponse> {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })

  const payload = (await response.json()) as LoginResponse & {
    error?: string
  }

  if (!response.ok) {
    throw new LoginError(payload.error ?? 'Unable to sign in. Please try again.')
  }

  return payload
}
