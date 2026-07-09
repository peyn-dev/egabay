import { Download, Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function OverviewHeader() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Dashboard Overview</h2>
        <p className="text-sm text-zinc-500 mt-0.5">
          Monitor student form statistics and recent administrative actions.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="size-4" />
          Filter Data
        </Button>
        <Button size="sm" className="h-9">
          <Download className="size-4" />
          Export Report
        </Button>
      </div>
    </div>
  )
}
