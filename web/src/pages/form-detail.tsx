import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Download,
  FileText,
  GraduationCap,
  Home,
  MapPin,
  Printer,
  Ruler,
} from 'lucide-react'
import { Link, useParams } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { useStudentForm } from '@/features/student/hooks/useStudentForm'
import { generateFormPdf } from '@/lib/generate-form-pdf'

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
  const f = form.family
  const a = form.academic
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
          <Button size="sm" className="h-9 gap-1.5" onClick={() => generateFormPdf(form)}>
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
                <p className="text-sm font-medium text-primary">{p.student_id}</p>
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
                  <Building2 className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">College</p>
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {p.college || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <BookOpen className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Program</p>
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {p.program || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Year Level</p>
                    <p className="text-sm font-medium text-zinc-900">{p.year_level || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Ruler className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Height / Weight</p>
                    <p className="text-sm font-medium text-zinc-900">
                      {p.height || '—'} / {p.weight || '—'}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <MapPin className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Address</p>
                    <p className="text-sm font-medium text-zinc-900">{p.address || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Home className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Address Type</p>
                    <p className="text-sm font-medium text-zinc-900">{p.present_address_type || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <BriefcaseBusiness className="size-4 shrink-0 text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-400">Currently Working</p>
                    <p className="text-sm font-medium text-zinc-900">{p.is_currently_working || '—'}</p>
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
              <LabelValue label="Tribe" value={p.tribe} />
              <LabelValue label="Other Tribe" value={p.other_tribe} />
              <LabelValue label="Civil Status" value={p.civil_status} />
              <LabelValue label="Nationality" value={p.nationality} />
              <LabelValue label="Height" value={p.height} />
              <LabelValue label="Weight" value={p.weight} />
            </div>
          </SectionCard>

          {/* 2. Family Background */}
          <SectionCard label="Family Background">
            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Father</p>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="Father's Name" value={f.father_name} />
              <LabelValue label="Father's Occupation" value={f.father_occupation} />
              <LabelValue label="Age" value={f.father_age} />
              <LabelValue label="Educational Attainment" value={f.father_educational_attainment} />
              <LabelValue label="Living Status" value={f.father_living_status} />
            </div>

            <Separator className="mb-4" />

            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Mother</p>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="Mother's Name" value={f.mother_name} />
              <LabelValue label="Mother's Occupation" value={f.mother_occupation} />
              <LabelValue label="Age" value={f.mother_age} />
              <LabelValue label="Educational Attainment" value={f.mother_educational_attainment} />
              <LabelValue label="Living Status" value={f.mother_living_status} />
            </div>

            <Separator className="mb-4" />

            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Guardian</p>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="Guardian's Name" value={f.guardian_name} />
              <LabelValue label="Guardian's Occupation" value={f.guardian_occupation} />
              <LabelValue label="Guardian's Age" value={f.guardian_age} />
              <LabelValue label="Educational Attainment" value={f.guardian_educational_attainment} />
            </div>

            <Separator className="mb-4" />

            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Family Details</p>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="Parents' Marital Status" value={f.parents_marital_status} />
              <LabelValue label="No. of Children" value={f.number_of_children} />
              <LabelValue label="No. of Brothers" value={f.number_of_brothers} />
              <LabelValue label="No. of Sisters" value={f.number_of_sisters} />
            </div>

            <Separator className="mb-4" />

            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Emergency Contact</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <LabelValue label="Contact Person" value={f.emergency_contact_person} />
              <LabelValue label="Address" value={f.emergency_contact_person_address} />
              <LabelValue label="Contact Number" value={f.emergency_contact_number} />
              <LabelValue label="Relationship" value={f.relationship} />
            </div>
          </SectionCard>

          {/* 3. Academic Information */}
          <SectionCard label="Academic Information">
            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Elementary</p>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="School Name" value={a.elementary_school_name} />
              <LabelValue label="Address" value={a.elementary_address} />
              <LabelValue label="Year Graduated" value={a.elementary_year_graduated} />
              <LabelValue label="School Type" value={a.elementary_school_type} />
            </div>

            <Separator className="mb-4" />

            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Junior High School</p>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="School Name" value={a.junior_high_school_name} />
              <LabelValue label="Address" value={a.junior_high_address} />
              <LabelValue label="Year Graduated" value={a.junior_year_graduated} />
              <LabelValue label="School Type" value={a.junior_high_school_type} />
            </div>

            <Separator className="mb-4" />

            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Senior High School</p>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="School Name" value={a.senior_high_school_name} />
              <LabelValue label="Address" value={a.senior_high_address} />
              <LabelValue label="Year Graduated" value={a.senior_year_graduated} />
              <LabelValue label="School Type" value={a.senior_high_school_type} />
            </div>

            <Separator className="mb-4" />

            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Vocational</p>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="Course Name" value={a.vocational_course_name} />
              <LabelValue label="Address" value={a.vocational_address} />
              <LabelValue label="Year Graduated" value={a.vocational_year_graduated} />
              <LabelValue label="Type" value={a.vocational_type} />
            </div>

            <Separator className="mb-4" />

            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">College</p>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="School Name" value={a.college_school_name} />
              <LabelValue label="Address" value={a.college_address} />
              <LabelValue label="Year Graduated" value={a.college_year_graduated} />
              <LabelValue label="Type" value={a.college_type} />
            </div>

            <Separator className="mb-4" />

            <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Additional Info</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <LabelValue label="Honors Received" value={a.honors_received} />
              <LabelValue label="Nature of Schooling" value={a.nature_of_schooling} />
              <LabelValue label="Reason for Stopping" value={a.reason_for_stopping} />
              <LabelValue label="Financers" value={a.financers} />
              <LabelValue label="Other Financer" value={a.other_financer} />
              <LabelValue label="Is Currently Working" value={a.is_currently_working} />
              <LabelValue label="Employer Name" value={a.employer_name} />
              <LabelValue label="Employer Address" value={a.employer_address} />
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
