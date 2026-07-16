import { useQuery } from '@tanstack/react-query'

interface YearLevelEntry {
  level: string
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.json()
}

export function useYearLevels() {
  return useQuery({
    queryKey: ['student', 'year-levels'],
    queryFn: () => fetchJson<YearLevelEntry[]>('/api/student/year-levels'),
    staleTime: 5 * 60 * 1000,
  })
}
