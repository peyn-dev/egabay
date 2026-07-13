import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { OverviewHeader } from '@/components/student/overview-header'
import { FilterTable } from '@/components/student/filter-table'

export default function StudentPage() {
  return (
    <DashboardLayout>
      <OverviewHeader />
        <FilterTable />
    </DashboardLayout>
  )
}

