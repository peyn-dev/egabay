import { useQuery } from '@tanstack/react-query'

export interface StudentInformation {
  id_number: number
  full_name: string
  course: string
  year_level: string
}

export interface PaginatedStudents {
  data: StudentInformation[]
  total: number
  page: number
  limit: number
}

export interface StudentFilters {
  search: string
  college: string
  year_level: string
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.json()
}

export function useStudentInformation(filters: StudentFilters, page: number, limit: number) {
  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.college) params.set('college', filters.college)
  if (filters.year_level) params.set('year_level', filters.year_level)
  params.set('page', String(page))
  params.set('limit', String(limit))

  return useQuery({
    queryKey: ['student', 'informations', filters, page, limit],
    queryFn: () => fetchJson<PaginatedStudents>(`/api/student/informations?${params}`),
  })
}
