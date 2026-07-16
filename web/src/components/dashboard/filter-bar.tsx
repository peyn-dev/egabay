import { Calendar, Users } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEnrollmentPeriods, useTribeDistribution } from '@/features/dashboard/hooks/useDashboardData'
import type { DashboardFilters } from '@/features/dashboard/hooks/useDashboardData'

const CONCERN_OPTIONS: { label: string; value: string }[] = [
  { label: 'All Concerns', value: '' },
  { label: 'Academic Concerns', value: 'ACADEMICCONCERNS' },
  { label: 'Career Concerns', value: 'CAREERCONCERNS' },
  { label: 'Concerns w/ Teachers', value: 'CONCERNSWITHTEACHERS' },
  { label: 'Family Matters', value: 'FAMILYMATTERS' },
  { label: 'Financial Matters', value: 'FINANCIALMATTERS' },
  { label: 'Health Concerns', value: 'HEALTHCONCERNS' },
  { label: 'Relationship Concerns', value: 'RELATIONSHIPCONCERNS' },
  { label: 'Self Concerns', value: 'SELFCONCERNS' },
]

interface FilterBarProps {
  filters: DashboardFilters
  onChange: (filters: DashboardFilters) => void
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const { data: periods } = useEnrollmentPeriods()
  const { data: tribes } = useTribeDistribution()

  const years = periods
    ? [...new Set(periods.map((p) => p.acad_year))].sort((a, b) => Number(b) - Number(a))
    : []
  const currentSemesters = periods
    ? periods.filter((p) => p.acad_year === filters.acadYear).map((p) => p.semester)
    : []
  const semesterOrder: Record<string, number> = {
    '1st semester': 1,
    '2nd semester': 2,
    Summer: 3,
  }
  currentSemesters.sort((a, b) => (semesterOrder[a] ?? 9) - (semesterOrder[b] ?? 9))

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Calendar className="size-4 text-zinc-400 shrink-0" />
      <Select
        value={filters.acadYear}
        onValueChange={(ay) => onChange({ ...filters, acadYear: ay })}
      >
        <SelectTrigger className="h-9 w-[120px] text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.semester}
        onValueChange={(sem) => onChange({ ...filters, semester: sem })}
      >
        <SelectTrigger className="h-9 w-[160px] text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currentSemesters.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Users className="size-4 text-zinc-400 shrink-0 ml-1" />
      <Select
        value={filters.tribe ?? ''}
        onValueChange={(tribe) => onChange({ ...filters, tribe: tribe || undefined })}
      >
        <SelectTrigger className="h-9 w-[140px] text-sm">
          <SelectValue placeholder="All Tribes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Tribes</SelectItem>
          {tribes?.map((t) => (
            <SelectItem key={t.tribe} value={t.tribe}>
              {t.tribe}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.concern ?? ''}
        onValueChange={(concern) => onChange({ ...filters, concern: concern || undefined })}
      >
        <SelectTrigger className="h-9 w-[180px] text-sm">
          <SelectValue placeholder="All Concerns" />
        </SelectTrigger>
        <SelectContent>
          {CONCERN_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
