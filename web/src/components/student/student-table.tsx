import { ChevronLeft, ChevronRight, Eye, Loader2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router'

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
import { useStudentInformation, type StudentFilters } from '@/features/student/hooks/useStudentData'

interface StudentTableProps {
  filters: StudentFilters
  page: number
  limit: number
  onPageChange: (page: number) => void
}

export function StudentTable({ filters, page, limit, onPageChange }: StudentTableProps) {
  const navigate = useNavigate()
  const { data: result, isLoading } = useStudentInformation(filters, page, limit)

  const totalPages = result ? Math.ceil(result.total / result.limit) : 1

  return (
    <div>
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden mt-5">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="size-6 animate-spin text-zinc-400" />
          </div>
        ) : result && result.data.length > 0 ? (
          <>
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
                {result.data.map((row) => (
                  <TableRow key={row.id_number}>
                    <TableCell className="font-mono text-xs text-zinc-600">{row.id_number}</TableCell>
                    <TableCell className="font-medium text-zinc-900">{row.full_name}</TableCell>
                    <TableCell className="text-zinc-600">{row.course}</TableCell>
                    <TableCell className="text-zinc-600">{row.year_level}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-zinc-400 hover:text-zinc-600"
                          onClick={() => navigate(`/student/${row.id_number}`)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 text-zinc-400 hover:text-zinc-600">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/student/${row.id_number}`)}>View Details</DropdownMenuItem>
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

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3">
              <p className="text-sm text-zinc-500">
                Page {result.page} of {totalPages}
                <span className="ml-1">({result.total} total)</span>
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={page <= 1}
                  onClick={() => onPageChange(page - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'outline'}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={page >= totalPages}
                  onClick={() => onPageChange(page + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-32 text-sm text-zinc-500">
            No Students submitted yet
          </div>
        )}
      </div>
    </div>
  )
}
