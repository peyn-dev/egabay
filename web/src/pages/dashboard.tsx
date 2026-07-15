import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { OverviewHeader } from '@/components/dashboard/overview-header'
import { KpiCards } from '@/components/dashboard/kpi-cards'
import { GenderRatioChart } from '@/components/dashboard/charts/gender-ratio-chart'
import { StudentsPerTribeChart } from '@/components/dashboard/charts/students-per-tribe-chart'
import { ByCollegeChart } from '@/components/dashboard/charts/by-college-chart'
import { YearLevelChart } from '@/components/dashboard/charts/year-level-chart'
import { GuidanceConcernsChart } from '@/components/dashboard/charts/guidance-concerns-chart'
import { CivilStatusChart } from '@/components/dashboard/charts/civil-status-chart'
import { WorkingStatusChart } from '@/components/dashboard/charts/working-status-chart'
import { RecentSubmissions } from '@/components/dashboard/recent-submissions'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <OverviewHeader />
      <KpiCards />

      {/* Charts grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <GenderRatioChart />
        <StudentsPerTribeChart />
        <ByCollegeChart />
        <YearLevelChart />
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
