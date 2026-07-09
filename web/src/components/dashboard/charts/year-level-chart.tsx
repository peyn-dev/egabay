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

const data = [
  { year: '1st Year', students: 2450 },
  { year: '2nd Year', students: 2180 },
  { year: '3rd Year', students: 1920 },
  { year: '4th Year', students: 1810 },
]

export function YearLevelChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-zinc-700">YEAR LEVEL</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              barSize={28}
              barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#71717a' }}
                tickLine={false}
                axisLine={{ stroke: '#e5e5e5' }}
              />
              <YAxis
                type="category"
                dataKey="year"
                tick={{ fontSize: 11, fill: '#71717a' }}
                tickLine={false}
                axisLine={false}
                width={70}
              />
              <Tooltip
                cursor={{ fill: '#fafafa' }}
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e5e5e5',
                  fontSize: 12,
                }}
              />
              <Bar dataKey="students" radius={[0, 4, 4, 0]} fill="#2E7D32" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
