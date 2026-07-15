package repository

import (
	"database/sql"
	"fmt"
)

type FormDetail struct {
	FormID   string      `json:"form_id"`
	Status   string      `json:"status"`
	IDNumber int         `json:"id_number"`
	Profile  ProfileInfo `json:"profile"`
	Family   FamilyInfo  `json:"family"`
	Academic AcademicInfo `json:"academic"`
}

type ProfileInfo struct {
	FullName             string `json:"full_name"`
	StudentID            string `json:"student_id"`
	Gender               string `json:"gender"`
	Tribe                string `json:"tribe"`
	DateOfBirth          string `json:"date_of_birth"`
	PlaceOfBirth         string `json:"place_of_birth"`
	CivilStatus          string `json:"civil_status"`
	ReligiousAffiliation string `json:"religious_affiliation"`
	Nationality          string `json:"nationality"`
	College              string `json:"college"`
	Program              string `json:"program"`
	YearLevel            string `json:"year_level"`
	Email                string `json:"email"`
	Phone                string `json:"phone"`
	Address              string `json:"address"`
}

type FamilyInfo struct {
	FatherName            string `json:"father_name"`
	FatherOccupation      string `json:"father_occupation"`
	MotherName            string `json:"mother_name"`
	MotherOccupation      string `json:"mother_occupation"`
	EmergencyContactPerson string `json:"emergency_contact_person"`
	EmergencyContactNumber string `json:"emergency_contact_number"`
}

type AcademicInfo struct {
	SecondarySchool    string `json:"secondary_school"`
	YearGraduatedHS    string `json:"year_graduated_hs"`
	AdmissionType      string `json:"admission_type"`
	CurrentGPA         string `json:"current_gpa"`
	CurrentScholarship string `json:"current_scholarship"`
	UnitsEnrolled      string `json:"units_enrolled"`
}

type FormRepository struct {
	db *sql.DB
}

func NewFormRepository(db *sql.DB) *FormRepository {
	return &FormRepository{db: db}
}

func (r *FormRepository) GetFormDetail(idNumber int) (*FormDetail, error) {
	query := `
		SELECT
			sp.IDNUMBER,
			COALESCE(s.FULLNAME, ''),
			COALESCE(s.GENDER, ''),
			COALESCE(sp.TRIBE, ''),
			COALESCE(s.COURSE, ''),
			COALESCE(s.YEARLEVEL, ''),
			COALESCE(d.COLLEGE, '')
		FROM STUDENTPROFILES sp
		LEFT JOIN STUDENTS s ON s.IDNUMBER = sp.IDNUMBER
		LEFT JOIN COURSES c ON c.COURSE = s.COURSE
		LEFT JOIN DEPARTMENTS d ON d.DEPARTMENT = c.DEPARTMENT
		WHERE sp.IDNUMBER = ?
	`

	var detail FormDetail
	var fullName, gender, tribe, course, yearLevel, college string

	err := r.db.QueryRow(query, idNumber).Scan(
		&detail.IDNumber,
		&fullName,
		&gender,
		&tribe,
		&course,
		&yearLevel,
		&college,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("form not found: %w", err)
		}
		return nil, fmt.Errorf("query form detail: %w", err)
	}

	detail.FormID = fmt.Sprintf("DSA-%d", idNumber)
	detail.Status = "verified"

	detail.Profile = ProfileInfo{
		FullName:             fullName,
		StudentID:            fmt.Sprintf("%d", idNumber),
		Gender:               gender,
		Tribe:                tribe,
		DateOfBirth:          "",
		PlaceOfBirth:         "",
		CivilStatus:          "",
		ReligiousAffiliation: "",
		Nationality:          "Filipino",
		College:              college,
		Program:              course,
		YearLevel:            yearLevel,
		Email:                "",
		Phone:                "",
		Address:              "",
	}

	detail.Family = FamilyInfo{}
	detail.Academic = AcademicInfo{}

	return &detail, nil
}
