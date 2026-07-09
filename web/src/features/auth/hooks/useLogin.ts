import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  loginRequest,
  LoginError,
  type LoginFormValues,
  type LoginResponse,
} from '@/features/auth/schemas/login.schema'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation<LoginResponse, LoginError, LoginFormValues>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      sessionStorage.setItem('egabay_token', data.token)
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
}
