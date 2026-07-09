import { Eye, MoreHorizontal } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const submissions = [
  {
    id: '2020-1-0001',
    name: 'Juan Dela Cruz',
    college: 'CNSM, BS Mathematics',
    year: '3rd Year',
    submitted: '2026-07-05',
    status: 'Approved' as const,
  },
  {
    id: '2020-1-0002',
    name: 'Maria Santos',
    college: 'CBAA, BS Accountancy',
    year: '4th Year',
    submitted: '2026-07-05',
    status: 'Pending' as const,
  },
  {
    id: '2020-1-0003',
    name: 'Jose Rizal',
    college: 'COE, BS Computer Engineering',
    year: '4th Year',
    submitted: '2026-07-04',
    status: 'Approved' as const,
  },
  {
    id: '2020-1-0004',
    name: 'Ana Gonzales',
    college: 'CSSH, BS Psychology',
    year: '2nd Year',
    submitted: '2026-07-04',
    status: 'Reviewed' as const,
  },
  {
    id: '2020-1-0005',
    name: 'Pedro Reyes',
    college: 'CON, BS Nursing',
    year: '1st Year',
    submitted: '2026-07-03',
    status: 'Pending' as const,
  },
]

const statusVariant = {
  Approved: 'bg-emerald-100 text-emerald-700 border-emerald-200' as const,
  Pending: 'bg-amber-100 text-amber-700 border-amber-200' as const,
  Reviewed: 'bg-blue-100 text-blue-700 border-blue-200' as const,
}

export function RecentSubmissions() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">Recent Form Submissions</h3>
          <p className="text-sm text-zinc-500">Latest 5 submissions across all forms</p>
        </div>
        <Button variant="link" size="sm" className="text-primary">
          View All Submissions
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>College / Program</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Submitted On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-mono text-xs text-zinc-600">{row.id}</TableCell>
                <TableCell className="font-medium text-zinc-900">{row.name}</TableCell>
                <TableCell className="text-zinc-600">{row.college}</TableCell>
                <TableCell className="text-zinc-600">{row.year}</TableCell>
                <TableCell className="text-zinc-600">{row.submitted}</TableCell>
                <TableCell>
                  <Badge className={statusVariant[row.status]}>{row.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-0.5">
                    <Button variant="ghost" size="icon" className="size-8 text-zinc-400 hover:text-zinc-600">
                      <Eye className="size-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 text-zinc-400 hover:text-zinc-600">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
