import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logout = useCallback(() => {
    sessionStorage.removeItem('egabay_token')
    queryClient.invalidateQueries({ queryKey: ['auth'] })
    queryClient.clear()
    navigate('/login', { replace: true })
  }, [navigate, queryClient])

  return logout
}
