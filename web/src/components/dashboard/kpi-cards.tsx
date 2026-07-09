import { CheckCircle, Clock, FileText, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const kpis = [
  {
    label: 'Total Enrolled Students',
    value: '8,360',
    change: '+2.5%',
    positive: true,
    icon: Users,
  },
  {
    label: 'DSA Forms Submitted',
    value: '5,124',
    change: '+12%',
    positive: true,
    icon: FileText,
  },
  {
    label: 'Pending Reviews',
    value: '23',
    change: '-3%',
    positive: true,
    icon: Clock,
  },
  {
    label: 'Approved Today',
    value: '47',
    change: '+8%',
    positive: true,
    icon: CheckCircle,
  },
]

export function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.label} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <p className="text-sm text-zinc-500 font-medium">{kpi.label}</p>
                  <p className="text-2xl font-bold tracking-tight text-zinc-900">{kpi.value}</p>
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                      kpi.positive ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {kpi.change} vs last month
                  </span>
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
