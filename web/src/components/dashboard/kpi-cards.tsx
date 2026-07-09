import { FileText, Loader2, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboardData'

const kpis = [
  { label: 'Total Enrolled Students', key: 'total_students' as const, icon: Users, format: true },
  { label: 'DSA Forms Submitted', key: 'forms_submitted' as const, icon: FileText, format: true },
]

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export function KpiCards() {
  const { data, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32 mb-6">
        <Loader2 className="size-6 animate-spin text-zinc-400" />
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 mb-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        const value = data ? data[kpi.key] : 0
        return (
          <Card key={kpi.label} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <p className="text-sm text-zinc-500 font-medium">{kpi.label}</p>
                  <p className="text-2xl font-bold tracking-tight text-zinc-900">
                    {kpi.format ? formatNumber(value) : value}
                  </p>
                </div>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
