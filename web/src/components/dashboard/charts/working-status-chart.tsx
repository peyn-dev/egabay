import { Loader2 } from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCurrentlyWorking } from '@/features/dashboard/hooks/useDashboardData'

const COLORS = ['#7A1716', '#FFC928']

export function WorkingStatusChart() {
  const { data, isLoading } = useCurrentlyWorking()

  const chartData = data?.map((d) => ({
    name: d.status === 'Yes' ? 'Working' : d.status === 'No' ? 'Not Working' : d.status,
    value: d.count,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-zinc-700">CURRENTLY WORKING</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[220px]">
            <Loader2 className="size-5 animate-spin text-zinc-400" />
          </div>
        ) : chartData && chartData.length > 0 ? (
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 12 }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => (
                    <span className="text-xs text-zinc-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[220px] text-sm text-zinc-400">No data</div>
        )}
      </CardContent>
    </Card>
  )
}
