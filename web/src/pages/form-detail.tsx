import { ArrowLeft, Download, FileText, Printer } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { useStudentForm } from '@/features/student/hooks/useStudentForm'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function SectionCard({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Card className="overflow-hidden rounded-xl border-zinc-200 shadow-sm">
      <div className="flex items-center bg-primary px-5 py-2.5">
        <span className="text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase">
          {label}
        </span>
      </div>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  )
}

function LabelValue({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-zinc-900">{value || '—'}</p>
    </div>
  )
}

export default function FormDetailPage() {
  const { id } = useParams<{ id: string }>()
  const studentId = Number(id)
  const { data: form, isLoading } = useStudentForm(studentId)

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-zinc-500">Loading form details...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!form) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-zinc-500">Form not found.</p>
        </div>
      </DashboardLayout>
    )
  }

  const p = form.profile
  const avatarFallback = initials(p.full_name)

  return (
    <DashboardLayout>
      {/* Top bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="-ml-2 h-8 gap-1 text-zinc-500" asChild>
            <Link to="/student">
              <ArrowLeft className="size-4" />
              Back to Student Forms
            </Link>
          </Button>
          <Badge variant="outline" className="font-mono text-xs font-medium text-zinc-500">
            {form.form_id}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={() => window.print()}
          >
            <Printer className="size-4" />
            Print Form
          </Button>
          <Button size="sm" className="h-9 gap-1.5">
            <Download className="size-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left column — Profile summary */}
        <div className="w-full shrink-0 lg:w-[320px]">
          <Card className="overflow-hidden rounded-xl border-zinc-200 shadow-sm">
            <CardContent className="p-5">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <Avatar className="size-20 rounded-full ring-2 ring-zinc-100">
                    <AvatarFallback className="bg-zinc-100 text-sm font-bold text-zinc-600">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{p.full_name}</h3>
                <p className="text-sm font-medium text-primary">
                  {p.student_id}
                </p>
                <Badge
                  variant="secondary"
                  className="mt-2 border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700"
                >
                  Verified Submission
                </Badge>
              </div>

              <Separator className="my-4" />

              {/* Academic info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <FileText className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">College</p>
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {p.college || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileText className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Program</p>
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {p.program || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileText className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Year Level</p>
                    <p className="text-sm font-medium text-zinc-900">{p.year_level || '—'}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <FileText className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Email</p>
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {p.email || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileText className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Phone</p>
                    <p className="text-sm font-medium text-zinc-900">{p.phone || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileText className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Address</p>
                    <p className="text-sm font-medium text-zinc-900">{p.address || '—'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — Section cards */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          {/* 1. Student Profile & Background */}
          <SectionCard label="Student Profile & Background">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="Full Name" value={p.full_name} />
              <LabelValue label="Student ID" value={p.student_id} />
              <LabelValue label="Gender" value={p.gender} />
              <LabelValue label="Tribe / Ethno-linguistic Group" value={p.tribe} />
              <LabelValue label="Date of Birth" value={p.date_of_birth} />
              <LabelValue label="Place of Birth" value={p.place_of_birth} />
              <LabelValue label="Civil Status" value={p.civil_status} />
              <LabelValue label="Religious Affiliation" value={p.religious_affiliation} />
              <LabelValue label="Nationality" value={p.nationality} />
            </div>
          </SectionCard>

          {/* 2. Family Background */}
          <SectionCard label="Family Background">
            <div className="grid gap-4 sm:grid-cols-2">
              <LabelValue label="Father's Name" value={form.family.father_name} />
              <LabelValue label="Father's Occupation" value={form.family.father_occupation} />
              <LabelValue label="Mother's Name" value={form.family.mother_name} />
              <LabelValue label="Mother's Occupation" value={form.family.mother_occupation} />
            </div>
            <Separator className="my-4" />
            <div className="grid gap-4 sm:grid-cols-2">
              <LabelValue label="Emergency Contact Person" value={form.family.emergency_contact_person} />
              <LabelValue label="Contact Number" value={form.family.emergency_contact_number} />
            </div>
          </SectionCard>

          {/* 3. Academic Information */}
          <SectionCard label="Academic Information">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="Secondary School Attended" value={form.academic.secondary_school} />
              <LabelValue label="Year Graduated (HS)" value={form.academic.year_graduated_hs} />
              <LabelValue label="Admission Type" value={form.academic.admission_type} />
              <LabelValue label="Current GPA" value={form.academic.current_gpa} />
              <LabelValue label="Current Scholarship" value={form.academic.current_scholarship} />
              <LabelValue label="Units Enrolled" value={form.academic.units_enrolled} />
            </div>
          </SectionCard>

          {/* 4. Extra-Curricular Activities */}
          <SectionCard label="Extra-Curricular Activities">
            <div className="mb-4">
              <p className="mb-2 text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Campus Organizations
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-200/50">
                  Not specified
                </span>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Special Skills / Talents
              </p>
              <p className="text-sm font-medium text-zinc-900">—</p>
            </div>
          </SectionCard>

          {/* 5. Uploaded Files & Attachments */}
          <SectionCard label="Uploaded Files & Attachments">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-zinc-200 px-4 py-6 text-center">
                <FileText className="size-8 text-zinc-300" />
                <p className="text-xs text-zinc-400">No files attached</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </DashboardLayout>
  )
}
