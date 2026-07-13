import { FileUp, FileDown, Printer } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function OverviewHeader() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Submitted DSA Forms</h2>
        <p className="text-sm text-zinc-500 mt-0.5">
          Review and manage student admission and scholarship applications.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <FileUp className="size-4" />
          Export CSV
        </Button>
        <Button variant="outline" size="sm" className="h-9">
          <FileDown className="size-4" />
          Batch PDF
        </Button>
        <Button size="sm" className="h-9">
          <Printer className="size-4" />
          Print Queue
        </Button>
      </div>
    </div>
  )
}
