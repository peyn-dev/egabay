import { useState } from 'react'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { FilterTable } from '@/components/student/filter-table'
import { StudentTable } from '@/components/student/student-table'
import { OverviewHeader } from '@/components/student/overview-header'
import type { StudentFilters } from '@/features/student/hooks/useStudentData'

const DEFAULT_LIMIT = 10

export default function StudentPage() {
  const [filters, setFilters] = useState<StudentFilters>({ search: '', college: '', year_level: '' })
  const [appliedFilters, setAppliedFilters] = useState<StudentFilters>(filters)
  const [page, setPage] = useState(1)

  const applyFilters = () => {
    setAppliedFilters(filters)
    setPage(1)
  }

  return (
    <DashboardLayout>
      <OverviewHeader />
      <FilterTable
        filters={filters}
        onFilterChange={(f) => { setFilters(f); setAppliedFilters(f); setPage(1) }}
        onApply={applyFilters}
      />
      <StudentTable
        filters={appliedFilters}
        page={page}
        limit={DEFAULT_LIMIT}
        onPageChange={setPage}
      />
    </DashboardLayout>
  )
}
