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
  { college: 'CNSM', students: 2150 },
  { college: 'CBAA', students: 1840 },
  { college: 'COE', students: 1520 },
  { college: 'CSSH', students: 1280 },
  { college: 'CON', students: 1050 },
]

export function ByCollegeChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-zinc-700">BY COLLEGE (TOP 5)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={36} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="college"
                tick={{ fontSize: 11, fill: '#71717a' }}
                tickLine={false}
                axisLine={{ stroke: '#e5e5e5' }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#71717a' }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                cursor={{ fill: '#fafafa' }}
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e5e5e5',
                  fontSize: 12,
                }}
              />
              <Bar dataKey="students" radius={[4, 4, 0, 0]} fill="#FFC928" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
