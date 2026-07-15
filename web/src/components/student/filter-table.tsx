import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { StudentFilters } from '@/features/student/hooks/useStudentData'

interface ActiveFilter {
  key: string
  label: string
  value: string
}

interface FilterTableProps {
  filters: StudentFilters
  onFilterChange: (filters: StudentFilters) => void
  onApply: () => void
}

function buildActiveFilters(filters: StudentFilters): ActiveFilter[] {
  const result: ActiveFilter[] = []
  if (filters.search) result.push({ key: 'search', label: `Search: "${filters.search}"`, value: filters.search })
  if (filters.college) result.push({ key: 'college', label: `College: ${filters.college}`, value: filters.college })
  if (filters.year_level) result.push({ key: 'year_level', label: `Year: ${filters.year_level}`, value: filters.year_level })
  return result
}

export function FilterTable({ filters, onFilterChange, onApply }: FilterTableProps) {
  const activeFilters = buildActiveFilters(filters)

  const removeFilter = (key: string) => {
    onFilterChange({ ...filters, [key]: '' })
  }

  const clearAll = () => {
    onFilterChange({ search: '', college: '', year_level: '' })
  }

  return (
    <div>
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <Input
                placeholder="Search by name, ID, or program..."
                className="h-9 pl-9"
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter') onApply() }}
              />
            </div>

            <Select
              value={filters.college || 'all'}
              onValueChange={(value) => onFilterChange({ ...filters, college: value === 'all' ? '' : value })}
            >
              <SelectTrigger className="h-9 w-full lg:w-[160px]">
                <SelectValue placeholder="College" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                <SelectItem value="College of Computer Studies">College of Computer Studies</SelectItem>
                <SelectItem value="College of Engineering">College of Engineering</SelectItem>
                <SelectItem value="College of Education">College of Education</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.year_level || 'any'}
              onValueChange={(value) => onFilterChange({ ...filters, year_level: value === 'any' ? '' : value })}
            >
              <SelectTrigger className="h-9 w-full lg:w-[140px]">
                <SelectValue placeholder="Year Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Year</SelectItem>
                <SelectItem value="1st">1st Year</SelectItem>
                <SelectItem value="2nd">2nd Year</SelectItem>
                <SelectItem value="3rd">3rd Year</SelectItem>
                <SelectItem value="4th">4th Year</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="h-9 w-full lg:w-[150px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1.5">
              <Button size="sm" className="h-9 whitespace-nowrap" onClick={onApply}>
                Apply Filters
              </Button>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-medium text-zinc-400">Active:</span>
              {activeFilters.map((filter) => (
                <span
                  key={filter.key}
                  className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
                >
                  {filter.label}
                  <button
                    type="button"
                    className="rounded-full text-zinc-400 hover:text-zinc-700"
                    aria-label={`Remove ${filter.label} filter`}
                    onClick={() => removeFilter(filter.key)}
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="text-xs font-medium text-zinc-500 underline underline-offset-2 hover:text-zinc-800"
                onClick={clearAll}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
