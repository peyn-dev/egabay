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
import { useGuidanceConcerns } from '@/features/dashboard/hooks/useDashboardData'

export function GuidanceConcernsChart() {
  const { data, isLoading } = useGuidanceConcerns()

  const chartData = data?.map((d) => ({
    name: d.label,
    students: d.count,
  }))

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-zinc-700">GUIDANCE CONCERNS</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[260px]">
            <Loader2 className="size-5 animate-spin text-zinc-400" />
          </div>
        ) : chartData && chartData.length > 0 ? (
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" barSize={20} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e5e5' }}
                  width={40}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={false}
                  width={130}
                />
                <Tooltip
                  cursor={{ fill: '#fafafa' }}
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 12 }}
                />
                <Bar dataKey="students" radius={[0, 4, 4, 0]} fill="#7A1716" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[260px] text-sm text-zinc-400">No data</div>
        )}
      </CardContent>
    </Card>
  )
}
