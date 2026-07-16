import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { OverviewHeader } from '@/components/dashboard/overview-header'
import { FilterBar } from '@/components/dashboard/filter-bar'
import { KpiCards } from '@/components/dashboard/kpi-cards'
import { GenderRatioChart } from '@/components/dashboard/charts/gender-ratio-chart'
import { StudentsPerTribeChart } from '@/components/dashboard/charts/students-per-tribe-chart'
import { ByCollegeChart } from '@/components/dashboard/charts/by-college-chart'
import { YearLevelChart } from '@/components/dashboard/charts/year-level-chart'
import { GuidanceConcernsChart } from '@/components/dashboard/charts/guidance-concerns-chart'
import { CivilStatusChart } from '@/components/dashboard/charts/civil-status-chart'
import { WorkingStatusChart } from '@/components/dashboard/charts/working-status-chart'
import { RecentSubmissions } from '@/components/dashboard/recent-submissions'
import type { DashboardFilters } from '@/features/dashboard/hooks/useDashboardData'

export default function DashboardPage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    acadYear: '2025',
    semester: '2nd semester',
  })

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <OverviewHeader />
        <FilterBar filters={filters} onChange={setFilters} />
      </div>
      <KpiCards filters={filters} />

      {/* Charts grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <GenderRatioChart filters={filters} />
        <StudentsPerTribeChart />
        <ByCollegeChart filters={filters} />
        <YearLevelChart filters={filters} />
      </div>

      {/* Second row — DSA-specific insights */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <GuidanceConcernsChart />
        <CivilStatusChart />
        <WorkingStatusChart />
      </div>

      {/* Recent submissions table */}
      <RecentSubmissions />
    </DashboardLayout>
  )
}
