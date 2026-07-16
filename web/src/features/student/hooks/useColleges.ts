import { useQuery } from '@tanstack/react-query'

interface CollegeEntry {
  college: string
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.json()
}

export function useColleges() {
  return useQuery({
    queryKey: ['student', 'colleges'],
    queryFn: () => fetchJson<CollegeEntry[]>('/api/student/colleges'),
    staleTime: 5 * 60 * 1000,
  })
}
