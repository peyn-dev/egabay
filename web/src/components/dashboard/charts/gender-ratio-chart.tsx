import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { name: 'Male', value: 58, color: '#3B82F6' },
  { name: 'Female', value: 42, color: '#EC4899' },
]

export function GenderRatioChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-zinc-700">GENDER RATIO</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span className="text-xs text-zinc-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-1">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-zinc-500">
                {entry.name} — {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
