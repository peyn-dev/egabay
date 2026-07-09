import { useQuery } from '@tanstack/react-query'

function getToken(): string | null {
  return sessionStorage.getItem('egabay_token')
}

function decodePayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

function isTokenExpired(token: string): boolean {
  const payload = decodePayload(token)
  if (!payload || typeof payload.exp !== 'number') return true
  return Date.now() >= payload.exp * 1000
}

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const token = getToken()
      if (!token || isTokenExpired(token)) {
        return { isAuthenticated: false }
      }
      return { isAuthenticated: true }
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  })

  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    isLoading,
    token: getToken(),
  }
}
