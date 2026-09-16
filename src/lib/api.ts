const TOKEN_KEY = 'plataforma.token'

export class ApiError extends Error {
  status: number
  details: unknown

  constructor(status: number, message: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
    return
  }
  localStorage.removeItem(TOKEN_KEY)
}

function errorMessage(body: unknown, fallback: string) {
  if (!body || typeof body !== 'object') return fallback
  const payload = body as {
    message?: string
    errors?: Array<{ message?: string }>
  }
  if (payload.message) return payload.message
  if (payload.errors?.[0]?.message) return payload.errors[0].message
  return fallback
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`/api/v1${path}`, { ...options, headers })
  const body: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(response.status, errorMessage(body, 'No se pudo completar la solicitud'), body)
  }

  if (body && typeof body === 'object' && 'data' in body) {
    return (body as { data: T }).data
  }

  return body as T
}
