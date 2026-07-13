import { Search, MoreVertical, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ActiveFilter {
  key: string
  label: string
}

const activeFilters: ActiveFilter[] = [
  { key: 'tribe', label: 'Tribe: Maranao' },
  { key: 'semester', label: 'Semester: First 2023-24' },
]

export function FilterTable() {
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
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-full lg:w-[160px]">
                <SelectValue placeholder="College" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                <SelectItem value="ccs">College of Computer Studies</SelectItem>
                <SelectItem value="coe">College of Engineering</SelectItem>
                <SelectItem value="ced">College of Education</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="any">
              <SelectTrigger className="h-9 w-full lg:w-[140px]">
                <SelectValue placeholder="Year Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Year</SelectItem>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
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
              <Button size="sm" className="h-9 whitespace-nowrap">
                Apply Filters
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-zinc-400 hover:text-zinc-600"
              >
                <MoreVertical className="size-4" />
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
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="text-xs font-medium text-zinc-500 underline underline-offset-2 hover:text-zinc-800"
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