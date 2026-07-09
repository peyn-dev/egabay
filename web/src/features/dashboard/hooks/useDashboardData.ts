import { useQuery } from '@tanstack/react-query'

export interface DashboardStats {
  total_students: number
  forms_submitted: number
}

export interface RecentSubmission {
  id_number: number
  full_name: string
  course: string
  year_level: string
}

export interface GenderEntry {
  label: string
  count: number
}

export interface TribeEntry {
  tribe: string
  count: number
}

export interface CollegeEntry {
  college: string
  count: number
}

export interface YearLevelEntry {
  level: string
  count: number
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.json()
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => fetchJson<DashboardStats>('/api/dashboard/stats'),
    refetchInterval: 30_000,
  })
}

export function useRecentSubmissions() {
  return useQuery({
    queryKey: ['dashboard', 'submissions'],
    queryFn: () => fetchJson<RecentSubmission[]>('/api/dashboard/submissions'),
    refetchInterval: 30_000,
  })
}

export function useGenderRatio() {
  return useQuery({
    queryKey: ['dashboard', 'gender-ratio'],
    queryFn: () => fetchJson<GenderEntry[]>('/api/dashboard/gender-ratio'),
  })
}

export function useTribeDistribution() {
  return useQuery({
    queryKey: ['dashboard', 'tribe-distribution'],
    queryFn: () => fetchJson<TribeEntry[]>('/api/dashboard/tribe-distribution'),
  })
}

export function useTopColleges(limit = 10) {
  return useQuery({
    queryKey: ['dashboard', 'top-colleges', limit],
    queryFn: () => fetchJson<CollegeEntry[]>(`/api/dashboard/top-colleges?limit=${limit}`),
  })
}

export function useYearLevel() {
  return useQuery({
    queryKey: ['dashboard', 'year-level'],
    queryFn: () => fetchJson<YearLevelEntry[]>('/api/dashboard/year-level'),
  })
}
