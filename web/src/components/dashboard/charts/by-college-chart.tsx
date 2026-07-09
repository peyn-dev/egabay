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
import { useTopColleges } from '@/features/dashboard/hooks/useDashboardData'

export function ByCollegeChart() {
  const { data, isLoading } = useTopColleges(10)

  const chartData = data?.map((d) => ({
    name: d.college.length > 20 ? d.college.slice(0, 20) + '\u2026' : d.college,
    full: d.college,
    students: d.count,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-zinc-700">STUDENTS PER COLLEGE</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[220px]">
            <Loader2 className="size-5 animate-spin text-zinc-400" />
          </div>
        ) : chartData && chartData.length > 0 ? (
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={36} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e5e5' }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: '#fafafa' }}
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 12 }}
                />
                <Bar dataKey="students" radius={[4, 4, 0, 0]} fill="#FFC928" />
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
