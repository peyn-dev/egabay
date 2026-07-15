import { useQuery } from '@tanstack/react-query'

import type { StudentFormDetail } from '../schemas/form-detail.schema'

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.json()
}

export function useStudentForm(id: number) {
  return useQuery({
    queryKey: ['student', 'form', id],
    queryFn: () => fetchJson<StudentFormDetail>(`/api/student/${id}/form`),
    enabled: !!id,
  })
}
