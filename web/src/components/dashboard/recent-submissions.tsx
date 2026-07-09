import { Eye, Loader2, MoreHorizontal } from 'lucide-react'

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
import { useRecentSubmissions } from '@/features/dashboard/hooks/useDashboardData'

export function RecentSubmissions() {
  const { data: submissions, isLoading } = useRecentSubmissions()

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">Recent Form Submissions</h3>
          <p className="text-sm text-zinc-500">Latest DSA profile form submissions</p>
        </div>
        <Button variant="link" size="sm" className="text-primary">
          View All Submissions
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="size-6 animate-spin text-zinc-400" />
          </div>
        ) : submissions && submissions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course / Program</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((row) => (
                <TableRow key={row.id_number}>
                  <TableCell className="font-mono text-xs text-zinc-600">{row.id_number}</TableCell>
                  <TableCell className="font-medium text-zinc-900">{row.full_name}</TableCell>
                  <TableCell className="text-zinc-600">{row.course}</TableCell>
                  <TableCell className="text-zinc-600">{row.year_level}</TableCell>
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
        ) : (
          <div className="flex items-center justify-center h-32 text-sm text-zinc-500">
            No submissions yet
          </div>
        )}
      </div>
    </div>
  )
}
