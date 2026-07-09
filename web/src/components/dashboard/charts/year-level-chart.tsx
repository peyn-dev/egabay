import { Loader2 } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useYearLevel } from '@/features/dashboard/hooks/useDashboardData'

export function YearLevelChart() {
  const { data, isLoading } = useYearLevel()

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-zinc-700">YEAR LEVEL</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[220px]">
            <Loader2 className="size-5 animate-spin text-zinc-400" />
          </div>
        ) : data && data.length > 0 ? (
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" barSize={20} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e5e5' }}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="level"
                  tick={{ fontSize: 11, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: '#fafafa' }}
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 12 }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="#2E7D32" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[220px] text-sm text-zinc-400">No data</div>
        )}
      </CardContent>
    </Card>
  )
}
