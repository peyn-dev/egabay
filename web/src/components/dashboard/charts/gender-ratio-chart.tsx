import { Loader2 } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGenderRatio } from '@/features/dashboard/hooks/useDashboardData'
import type { DashboardFilters } from '@/features/dashboard/hooks/useDashboardData'

const COLORS = ['#3B82F6', '#EC4899', '#A1A1AA']

export function GenderRatioChart({ filters }: { filters?: DashboardFilters }) {
  const { data, isLoading } = useGenderRatio(filters)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-zinc-700">GENDER RATIO</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[220px]">
            <Loader2 className="size-5 animate-spin text-zinc-400" />
          </div>
        ) : data && data.length > 0 ? (
          <>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="label"
                    strokeWidth={0}
                  >
                    {data.map((entry, i) => (
                      <Cell key={entry.label} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 flex-wrap mt-2">
              {data.map((entry, i) => (
                <div key={entry.label} className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-xs text-zinc-500">
                    {entry.label} — {entry.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[220px] text-sm text-zinc-400">No data</div>
        )}
      </CardContent>
    </Card>
  )
}
