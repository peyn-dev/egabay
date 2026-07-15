export interface StudentFormDetail {
  form_id: string
  status: 'verified' | 'pending' | 'flagged'
  id_number: number
  profile: {
    full_name: string
    student_id: string
    gender: string
    tribe: string
    date_of_birth: string
    place_of_birth: string
    civil_status: string
    religious_affiliation: string
    nationality: string
    college: string
    program: string
    year_level: string
    email: string
    phone: string
    address: string
  }
  family: {
    father_name: string
    father_occupation: string
    mother_name: string
    mother_occupation: string
    emergency_contact_person: string
    emergency_contact_number: string
  }
  academic: {
    secondary_school: string
    year_graduated_hs: string
    admission_type: string
    current_gpa: string
    current_scholarship: string
    units_enrolled: string
  }
}
