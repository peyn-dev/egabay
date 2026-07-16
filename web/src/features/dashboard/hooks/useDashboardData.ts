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

export interface ConcernEntry {
  label: string
  count: number
}

export interface CivilStatusEntry {
  status: string
  count: number
}

export interface WorkingStatusEntry {
  status: string
  count: number
}

export interface EnrollmentPeriod {
  acad_year: string
  semester: string
}

export interface DashboardFilters {
  acadYear: string
  semester: string
  tribe?: string
  concern?: string
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.json()
}

function filterQuery(filters?: DashboardFilters): string {
  const ay = filters?.acadYear ?? '2025'
  const sem = filters?.semester ?? '2nd semester'
  const tribe = filters?.tribe
  const concern = filters?.concern
  let q = `?acad_year=${encodeURIComponent(ay)}&semester=${encodeURIComponent(sem)}`
  if (tribe) q += `&tribe=${encodeURIComponent(tribe)}`
  if (concern) q += `&concern=${encodeURIComponent(concern)}`
  return q
}

export function useEnrollmentPeriods() {
  return useQuery({
    queryKey: ['dashboard', 'enrollment-periods'],
    queryFn: () => fetchJson<EnrollmentPeriod[]>('/api/dashboard/enrollment-periods'),
    staleTime: 300_000,
  })
}

export function useDashboardStats(filters?: DashboardFilters) {
  return useQuery({
    queryKey: ['dashboard', 'stats', filters],
    queryFn: () => fetchJson<DashboardStats>(`/api/dashboard/stats${filterQuery(filters)}`),
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

export function useGenderRatio(filters?: DashboardFilters) {
  return useQuery({
    queryKey: ['dashboard', 'gender-ratio', filters],
    queryFn: () => fetchJson<GenderEntry[]>(`/api/dashboard/gender-ratio${filterQuery(filters)}`),
  })
}

export function useTribeDistribution() {
  return useQuery({
    queryKey: ['dashboard', 'tribe-distribution'],
    queryFn: () => fetchJson<TribeEntry[]>('/api/dashboard/tribe-distribution'),
  })
}

export function useTopColleges(limit = 10, filters?: DashboardFilters) {
  return useQuery({
    queryKey: ['dashboard', 'top-colleges', limit, filters],
    queryFn: () => fetchJson<CollegeEntry[]>(`/api/dashboard/top-colleges?limit=${limit}${filters ? `&${filterQuery(filters).slice(1)}` : ''}`),
  })
}

export function useYearLevel(filters?: DashboardFilters) {
  return useQuery({
    queryKey: ['dashboard', 'year-level', filters],
    queryFn: () => fetchJson<YearLevelEntry[]>(`/api/dashboard/year-level${filterQuery(filters)}`),
  })
}

export function useGuidanceConcerns() {
  return useQuery({
    queryKey: ['dashboard', 'guidance-concerns'],
    queryFn: () => fetchJson<ConcernEntry[]>('/api/dashboard/guidance-concerns'),
  })
}

export function useCivilStatus() {
  return useQuery({
    queryKey: ['dashboard', 'civil-status'],
    queryFn: () => fetchJson<CivilStatusEntry[]>('/api/dashboard/civil-status'),
  })
}

export function useCurrentlyWorking() {
  return useQuery({
    queryKey: ['dashboard', 'currently-working'],
    queryFn: () => fetchJson<WorkingStatusEntry[]>('/api/dashboard/currently-working'),
  })
}
