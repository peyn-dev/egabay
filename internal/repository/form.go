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
	OtherTribe           string `json:"other_tribe"`
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
	Height               string `json:"height"`
	Weight               string `json:"weight"`
	PresentAddressType   string `json:"present_address_type"`
	IsCurrentlyWorking   string `json:"is_currently_working"`
	LastName             string `json:"last_name"`
	FirstName            string `json:"first_name"`
	MiddleName           string `json:"middle_name"`
	GPA                  string `json:"gpa"`
	HomeTownAddress      string `json:"home_town_address"`
	VisionProblem        string `json:"vision_problem"`
	SpeechProblem        string `json:"speech_problem"`
	HearingProblem       string `json:"hearing_problem"`
	HealthProblem        string `json:"health_problem"`
	DisabilityProblem    string `json:"disability_problem"`
	VisionSpecify        string `json:"vision_specify"`
	SpeechSpecify        string `json:"speech_specify"`
	HearingSpecify       string `json:"hearing_specify"`
	HealthSpecify        string `json:"health_specify"`
	DisabilitySpecify    string `json:"disability_specify"`
	DiagnosedBefore      string `json:"diagnosed_before"`
	DiagnosedSpecify     string `json:"diagnosed_specify"`
	PsychTestBefore      string `json:"psych_test_before"`
	Date1                string `json:"date1"`
	Test1                string `json:"test1"`
	Score1               string `json:"score1"`
	Rank1                string `json:"rank1"`
	Date2                string `json:"date2"`
	Test2                string `json:"test2"`
	Score2               string `json:"score2"`
	Rank2                string `json:"rank2"`
	Date3                string `json:"date3"`
	Test3                string `json:"test3"`
	Score3               string `json:"score3"`
	Rank3                string `json:"rank3"`
	Sports               string `json:"sports"`
	Science              string `json:"science"`
	CivicAwareness       string `json:"civic_awareness"`
	Arts                 string `json:"arts"`
	SocialStudies        string `json:"social_studies"`
	Religious            string `json:"religious"`
	OthersInterests      string `json:"others_interests"`
	ConsultedStatus      string `json:"consulted_status"`
	ReasonForConsultation string `json:"reason_for_consultation"`
	FamilyMatters        string `json:"family_matters"`
	CareerConcerns       string `json:"career_concerns"`
	RelationshipConcerns string `json:"relationship_concerns"`
	SelfConcerns         string `json:"self_concerns"`
	ConcernWithTeachers  string `json:"concern_with_teachers"`
	FinancialMatters     string `json:"financial_matters"`
	AcademicConcerns     string `json:"academic_concerns"`
	HealthConcerns       string `json:"health_concerns"`
	OtherGuidanceConcern string `json:"other_guidance_concern"`
}

type FamilyInfo struct {
	FatherName             string `json:"father_name"`
	FatherAge              string `json:"father_age"`
	FatherEducationalAttainment string `json:"father_educational_attainment"`
	FatherLivingStatus     string `json:"father_living_status"`
	FatherOccupation       string `json:"father_occupation"`
	MotherName             string `json:"mother_name"`
	MotherAge              string `json:"mother_age"`
	MotherEducationalAttainment string `json:"mother_educational_attainment"`
	MotherLivingStatus     string `json:"mother_living_status"`
	MotherOccupation       string `json:"mother_occupation"`
	GuardianName           string `json:"guardian_name"`
	GuardianAge            string `json:"guardian_age"`
	GuardianEducationalAttainment string `json:"guardian_educational_attainment"`
	GuardianOccupation     string `json:"guardian_occupation"`
	ParentsMaritalStatus   string `json:"parents_marital_status"`
	NumberOfChildren       string `json:"number_of_children"`
	NumberOfBrothers       string `json:"number_of_brothers"`
	NumberOfSisters        string `json:"number_of_sisters"`
	EmergencyContactPerson string `json:"emergency_contact_person"`
	EmergencyContactPersonAddress string `json:"emergency_contact_person_address"`
	EmergencyContactNumber string `json:"emergency_contact_number"`
	Relationship           string `json:"relationship"`
	OtherMaritalStatusReason string `json:"other_marital_status_reason"`
}

type AcademicInfo struct {
	ElementarySchoolName   string `json:"elementary_school_name"`
	ElementaryAddress      string `json:"elementary_address"`
	ElementaryYearGraduated string `json:"elementary_year_graduated"`
	ElementarySchoolType   string `json:"elementary_school_type"`
	JuniorHighSchoolName   string `json:"junior_high_school_name"`
	JuniorHighAddress      string `json:"junior_high_address"`
	JuniorYearGraduated    string `json:"junior_year_graduated"`
	JuniorHighSchoolType   string `json:"junior_high_school_type"`
	SeniorHighSchoolName   string `json:"senior_high_school_name"`
	SeniorHighAddress      string `json:"senior_high_address"`
	SeniorYearGraduated    string `json:"senior_year_graduated"`
	SeniorHighSchoolType   string `json:"senior_high_school_type"`
	VocationalCourseName   string `json:"vocational_course_name"`
	VocationalAddress      string `json:"vocational_address"`
	VocationalYearGraduated string `json:"vocational_year_graduated"`
	VocationalType         string `json:"vocational_type"`
	CollegeSchoolName      string `json:"college_school_name"`
	CollegeAddress         string `json:"college_address"`
	CollegeYearGraduated   string `json:"college_year_graduated"`
	CollegeType            string `json:"college_type"`
	HonorsReceived         string `json:"honors_received"`
	NatureOfSchooling      string `json:"nature_of_schooling"`
	ReasonForStopping      string `json:"reason_for_stopping"`
	Financers              string `json:"financers"`
	OtherFinancer          string `json:"other_financer"`
	IsCurrentlyWorking     string `json:"is_currently_working"`
	EmployerName           string `json:"employer_name"`
	EmployerAddress        string `json:"employer_address"`
}

type FormRepository struct {
	db *sql.DB
}

func NewFormRepository(db *sql.DB) *FormRepository {
	return &FormRepository{db: db}
}

func (repo *FormRepository) GetFormDetail(idNumber int) (*FormDetail, error) {
	query := `
		SELECT
			r.IDNUMBER,
			COALESCE(s.FULLNAME, ''),
			COALESCE(s.GENDER, ''),
			COALESCE(r.TRIBE, ''),
			COALESCE(r.OTHERTRIBE, ''),
			COALESCE(s.COURSE, ''),
			COALESCE(s.YEARLEVEL, ''),
			COALESCE(d.COLLEGE, ''),
			COALESCE(r.PRESENTADDRESS, ''),
			COALESCE(r.PRESENTADDRESSTYPE, ''),
			COALESCE(r.ISCURRENTLYWORKING, ''),
			COALESCE(r.HEIGHT, ''),
			COALESCE(r.WEIGHT, ''),
			COALESCE(r.CIVILSTATUS, ''),
			COALESCE(r.CONTACTPERSON, ''),
			COALESCE(r.CONTACTPERSONADDRESS, ''),
			COALESCE(r.CONTACTNUMBER, ''),
			COALESCE(r.RELATIONSHIP, ''),
			COALESCE(r.FATHERFULLNAME, ''),
			COALESCE(r.FATHERAGE, ''),
			COALESCE(r.FATHEREDUCATIONALATTAINMENT, ''),
			COALESCE(r.FATHERLIVINGSTATUS, ''),
			COALESCE(r.OCCUPATION, ''),
			COALESCE(r.MOTHERFULLNAME, ''),
			COALESCE(r.MOTHERAGE, ''),
			COALESCE(r.MOTHEREDUCATIONALATTAINMENT, ''),
			COALESCE(r.MOTHERLIVINGSTATUS, ''),
			COALESCE(r.MOTHEROCCUPATION, ''),
			COALESCE(r.GUARDIANFULLNAME, ''),
			COALESCE(r.GUARDIANAGE, ''),
			COALESCE(r.EDUCATIONALATTAINMENT, ''),
			COALESCE(r.GUARDIANOCCUPATION, ''),
			COALESCE(r.PARENTSMARITALSTATUS, ''),
			COALESCE(r.NUMOFCHILDREN, ''),
			COALESCE(r.NUMOFBROTHERS, ''),
			COALESCE(r.NUMOFSISTERS, ''),
			COALESCE(r.ELEMENTARYSCHOOLNAME, ''),
			COALESCE(r.ELEMENTARYADDRESS, ''),
			COALESCE(r.ELEMYEARGRADUATED, ''),
			COALESCE(r.ELEMENTARYSCHOOLTYPE, ''),
			COALESCE(r.JUNIORHIGHSCHOOLNAME, ''),
			COALESCE(r.JUNIORHIGHADDRESS, ''),
			COALESCE(r.JUNIORYEARGRADUATED, ''),
			COALESCE(r.JUNIORHIGHSCHOOLTYPE, ''),
			COALESCE(r.SENIORHIGHSCHOOLNAME, ''),
			COALESCE(r.SENIORHIGHADDRESS, ''),
			COALESCE(r.SENIORYEARGRADUATED, ''),
			COALESCE(r.SENIORHIGHSCHOOLTYPE, ''),
			COALESCE(r.VOCATIONALCOURSENAME, ''),
			COALESCE(r.VOCATIONALADDRESS, ''),
			COALESCE(r.VOCATIONALYEARGRADUATED, ''),
			COALESCE(r.VOCATIONALTYPE, ''),
			COALESCE(r.COLLEGESCHOOLNAME, ''),
			COALESCE(r.COLLEGEADDRESS, ''),
			COALESCE(r.COLLEGEYEARGRADUATED, ''),
			COALESCE(r.COLLEGETYPE, ''),
			COALESCE(r.HONORSRECEIVED, ''),
			COALESCE(r.NATUREOFSCHOOLING, ''),
			COALESCE(r.REASONFORSTOPPING, ''),
			COALESCE(r.FINANCERS, ''),
			COALESCE(r.OTHERFINANCER, ''),
			COALESCE(r.EMPLOYERNAME, ''),
			COALESCE(r.EMPLOYERADDRESS, ''),
			COALESCE(s.LASTNAME, ''),
			COALESCE(s.FIRSTNAME, ''),
			COALESCE(s.MIDDLENAME, ''),
			COALESCE(s.BIRTHDAY, ''),
			COALESCE(s.BIRTHPLACE, ''),
			COALESCE(s.EMAILADDRESS, ''),
			COALESCE(s.MOBILENUMBER, ''),
			COALESCE(s.GPA, ''),
			COALESCE(s.RELIGION, ''),
			COALESCE(r.HOMETOWNADDRESS, ''),
			COALESCE(r.OTHERMARITALSTATUSREASON, ''),
			COALESCE(r.PROBLEMVISION, ''),
			COALESCE(r.PROBLEMSPEECH, ''),
			COALESCE(r.PROBLEMHEARING, ''),
			COALESCE(r.PROBLEMHEALTH, ''),
			COALESCE(r.PROBLEMDISABILITY, ''),
			COALESCE(r.VISIONSPECIFY, ''),
			COALESCE(r.SPEECHSPECIFY, ''),
			COALESCE(r.HEARINGSPECIFY, ''),
			COALESCE(r.HEALTHSPECIFY, ''),
			COALESCE(r.DISABILITYSPECIFY, ''),
			COALESCE(r.DIAGNOSEDBEFORE, ''),
			COALESCE(r.DIAGNOSEDSPECIFY, ''),
			COALESCE(r.PSYCHTESTBEFORE, ''),
			COALESCE(r.DATE1, ''),
			COALESCE(r.TEST1, ''),
			COALESCE(r.SCORE1, ''),
			COALESCE(r.RANK1, ''),
			COALESCE(r.DATE2, ''),
			COALESCE(r.TEST2, ''),
			COALESCE(r.SCORE2, ''),
			COALESCE(r.RANK2, ''),
			COALESCE(r.DATE3, ''),
			COALESCE(r.TEST3, ''),
			COALESCE(r.SCORE3, ''),
			COALESCE(r.RANK3, ''),
			COALESCE(r.SPORTS, ''),
			COALESCE(r.SCIENCE, ''),
			COALESCE(r.CIVICAWARENESS, ''),
			COALESCE(r.ARTS, ''),
			COALESCE(r.SOCIALSTUDIES, ''),
			COALESCE(r.OTHERSINTERESTS, ''),
			COALESCE(r.CONSULTEDSTATUS, ''),
			COALESCE(r.REASONFORCONSULTATION, ''),
			COALESCE(r.FAMILYMATTERS, ''),
			COALESCE(r.CAREERCONCERNS, ''),
			COALESCE(r.RELATIONSHIPCONCERNS, ''),
			COALESCE(r.SELFCONCERNS, ''),
			COALESCE(r.CONCERNWITHTEACHERS, ''),
			COALESCE(r.FINANCIALMATTERS, ''),
			COALESCE(r.ACADEMICCONCERNS, ''),
			COALESCE(r.HEALTHCONCERNS, ''),
			COALESCE(r.OTHERGUIDANCECONCERN, ''),
			COALESCE(r.RELIGIOUS, '')
		FROM STUDENTPROFILES r
		LEFT JOIN STUDENTS s ON s.IDNUMBER = r.IDNUMBER
		LEFT JOIN COURSES c ON c.COURSE = s.COURSE
		LEFT JOIN DEPARTMENTS d ON d.DEPARTMENT = c.DEPARTMENT
		WHERE r.IDNUMBER = ?
	`

	type row struct {
		idNumber                      int
		fullName, gender, tribe, otherTribe, course, yearLevel, college string
		presentAddress, presentAddressType, isCurrentlyWorking         string
		height, weight, civilStatus                                    string
		contactPerson, contactPersonAddress, contactNumber, relationship string
		fatherName, fatherAge, fatherEduc, fatherLiving, fatherOcc      string
		motherName, motherAge, motherEduc, motherLiving, motherOcc      string
		guardianName, guardianAge, guardianEduc, guardianOcc            string
		parentsMaritalStatus, numChildren, numBrothers, numSisters      string
		elemSchool, elemAddr, elemYear, elemType                        string
		jhSchool, jhAddr, jhYear, jhType                                string
		shSchool, shAddr, shYear, shType                                 string
		vocaCourse, vocaAddr, vocaYear, vocaType                        string
		collegeSchool, collegeAddr, collegeYear, collegeType             string
		honors, natureOfSchooling, reasonForStopping                     string
		financers, otherFinancer, employerName, employerAddress          string
		lastName, firstName, middleName                                  string
		birthday, birthplace, emailAddress, mobileNumber, gpa, religion  string
		homeTownAddress, otherMaritalStatusReason                        string
		problemVision, problemSpeech, problemHearing, problemHealth, problemDisability string
		visionSpecify, speechSpecify, hearingSpecify, healthSpecify, disabilitySpecify  string
		diagnosedBefore, diagnosedSpecify, psychTestBefore               string
		date1, test1, score1, rank1                                      string
		date2, test2, score2, rank2                                      string
		date3, test3, score3, rank3                                      string
		sports, science, civicAwareness, arts, socialStudies, religious, othersInterests string
		consultedStatus, reasonForConsultation                           string
		familyMatters, careerConcerns, relationshipConcerns, selfConcerns         string
		concernWithTeachers, financialMatters, academicConcerns, healthConcerns   string
		otherGuidanceConcern                                              string
	}

	var data row

	err := repo.db.QueryRow(query, idNumber).Scan(
		&data.idNumber,
		&data.fullName, &data.gender, &data.tribe, &data.otherTribe,
		&data.course, &data.yearLevel, &data.college,
		&data.presentAddress, &data.presentAddressType, &data.isCurrentlyWorking,
		&data.height, &data.weight, &data.civilStatus,
		&data.contactPerson, &data.contactPersonAddress, &data.contactNumber, &data.relationship,
		&data.fatherName, &data.fatherAge, &data.fatherEduc, &data.fatherLiving, &data.fatherOcc,
		&data.motherName, &data.motherAge, &data.motherEduc, &data.motherLiving, &data.motherOcc,
		&data.guardianName, &data.guardianAge, &data.guardianEduc, &data.guardianOcc,
		&data.parentsMaritalStatus, &data.numChildren, &data.numBrothers, &data.numSisters,
		&data.elemSchool, &data.elemAddr, &data.elemYear, &data.elemType,
		&data.jhSchool, &data.jhAddr, &data.jhYear, &data.jhType,
		&data.shSchool, &data.shAddr, &data.shYear, &data.shType,
		&data.vocaCourse, &data.vocaAddr, &data.vocaYear, &data.vocaType,
		&data.collegeSchool, &data.collegeAddr, &data.collegeYear, &data.collegeType,
		&data.honors, &data.natureOfSchooling, &data.reasonForStopping,
		&data.financers, &data.otherFinancer,
		&data.employerName, &data.employerAddress,
		&data.lastName, &data.firstName, &data.middleName,
		&data.birthday, &data.birthplace, &data.emailAddress, &data.mobileNumber,
		&data.gpa, &data.religion,
		&data.homeTownAddress, &data.otherMaritalStatusReason,
		&data.problemVision, &data.problemSpeech, &data.problemHearing, &data.problemHealth, &data.problemDisability,
		&data.visionSpecify, &data.speechSpecify, &data.hearingSpecify, &data.healthSpecify, &data.disabilitySpecify,
		&data.diagnosedBefore, &data.diagnosedSpecify, &data.psychTestBefore,
		&data.date1, &data.test1, &data.score1, &data.rank1,
		&data.date2, &data.test2, &data.score2, &data.rank2,
		&data.date3, &data.test3, &data.score3, &data.rank3,
		&data.sports, &data.science, &data.civicAwareness, &data.arts, &data.socialStudies, &data.othersInterests,
		&data.consultedStatus, &data.reasonForConsultation,
		&data.familyMatters, &data.careerConcerns, &data.relationshipConcerns, &data.selfConcerns,
		&data.concernWithTeachers, &data.financialMatters, &data.academicConcerns, &data.healthConcerns,
		&data.otherGuidanceConcern,
		&data.religious,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("form not found: %w", err)
		}
		return nil, fmt.Errorf("query form detail: %w", err)
	}

	return &FormDetail{
		FormID:   fmt.Sprintf("DSA-%d", idNumber),
		Status:   "verified",
		IDNumber: data.idNumber,
		Profile: ProfileInfo{
			FullName:           data.fullName,
			StudentID:          fmt.Sprintf("%d", data.idNumber),
			Gender:             data.gender,
			Tribe:              data.tribe,
			OtherTribe:         data.otherTribe,
			DateOfBirth:        data.birthday,
			PlaceOfBirth:       data.birthplace,
			CivilStatus:        data.civilStatus,
			ReligiousAffiliation: data.religion,
			Nationality:        "Filipino",
			College:            data.college,
			Program:            data.course,
			YearLevel:          data.yearLevel,
			Email:              data.emailAddress,
			Phone:              data.mobileNumber,
			Address:            data.presentAddress,
			Height:             data.height,
			Weight:             data.weight,
			PresentAddressType: data.presentAddressType,
			IsCurrentlyWorking: data.isCurrentlyWorking,
			LastName:           data.lastName,
			FirstName:          data.firstName,
			MiddleName:         data.middleName,
			GPA:                data.gpa,
			HomeTownAddress:    data.homeTownAddress,
			VisionProblem:      data.problemVision,
			SpeechProblem:      data.problemSpeech,
			HearingProblem:     data.problemHearing,
			HealthProblem:      data.problemHealth,
			DisabilityProblem:  data.problemDisability,
			VisionSpecify:      data.visionSpecify,
			SpeechSpecify:      data.speechSpecify,
			HearingSpecify:     data.hearingSpecify,
			HealthSpecify:      data.healthSpecify,
			DisabilitySpecify:  data.disabilitySpecify,
			DiagnosedBefore:    data.diagnosedBefore,
			DiagnosedSpecify:   data.diagnosedSpecify,
			PsychTestBefore:    data.psychTestBefore,
			Date1:              data.date1,
			Test1:              data.test1,
			Score1:             data.score1,
			Rank1:              data.rank1,
			Date2:              data.date2,
			Test2:              data.test2,
			Score2:             data.score2,
			Rank2:              data.rank2,
			Date3:              data.date3,
			Test3:              data.test3,
			Score3:             data.score3,
			Rank3:              data.rank3,
			Sports:             data.sports,
			Science:            data.science,
			CivicAwareness:     data.civicAwareness,
			Arts:               data.arts,
			SocialStudies:      data.socialStudies,
			Religious:          data.religious,
			OthersInterests:    data.othersInterests,
			ConsultedStatus:    data.consultedStatus,
			ReasonForConsultation: data.reasonForConsultation,
			FamilyMatters:      data.familyMatters,
			CareerConcerns:     data.careerConcerns,
			RelationshipConcerns: data.relationshipConcerns,
			SelfConcerns:       data.selfConcerns,
			ConcernWithTeachers: data.concernWithTeachers,
			FinancialMatters:   data.financialMatters,
			AcademicConcerns:   data.academicConcerns,
			HealthConcerns:     data.healthConcerns,
			OtherGuidanceConcern: data.otherGuidanceConcern,
		},
		Family: FamilyInfo{
			FatherName:             data.fatherName,
			FatherAge:              data.fatherAge,
			FatherEducationalAttainment: data.fatherEduc,
			FatherLivingStatus:     data.fatherLiving,
			FatherOccupation:       data.fatherOcc,
			MotherName:             data.motherName,
			MotherAge:              data.motherAge,
			MotherEducationalAttainment: data.motherEduc,
			MotherLivingStatus:     data.motherLiving,
			MotherOccupation:       data.motherOcc,
			GuardianName:           data.guardianName,
			GuardianAge:            data.guardianAge,
			GuardianEducationalAttainment: data.guardianEduc,
			GuardianOccupation:     data.guardianOcc,
			ParentsMaritalStatus:   data.parentsMaritalStatus,
			NumberOfChildren:       data.numChildren,
			NumberOfBrothers:       data.numBrothers,
			NumberOfSisters:        data.numSisters,
			EmergencyContactPerson: data.contactPerson,
			EmergencyContactPersonAddress: data.contactPersonAddress,
			EmergencyContactNumber: data.contactNumber,
			Relationship:           data.relationship,
			OtherMaritalStatusReason: data.otherMaritalStatusReason,
		},
		Academic: AcademicInfo{
			ElementarySchoolName:    data.elemSchool,
			ElementaryAddress:       data.elemAddr,
			ElementaryYearGraduated: data.elemYear,
			ElementarySchoolType:    data.elemType,
			JuniorHighSchoolName:    data.jhSchool,
			JuniorHighAddress:       data.jhAddr,
			JuniorYearGraduated:     data.jhYear,
			JuniorHighSchoolType:    data.jhType,
			SeniorHighSchoolName:    data.shSchool,
			SeniorHighAddress:       data.shAddr,
			SeniorYearGraduated:     data.shYear,
			SeniorHighSchoolType:    data.shType,
			VocationalCourseName:    data.vocaCourse,
			VocationalAddress:       data.vocaAddr,
			VocationalYearGraduated: data.vocaYear,
			VocationalType:          data.vocaType,
			CollegeSchoolName:       data.collegeSchool,
			CollegeAddress:          data.collegeAddr,
			CollegeYearGraduated:    data.collegeYear,
			CollegeType:             data.collegeType,
			HonorsReceived:          data.honors,
			NatureOfSchooling:       data.natureOfSchooling,
			ReasonForStopping:       data.reasonForStopping,
			Financers:               data.financers,
			OtherFinancer:           data.otherFinancer,
			IsCurrentlyWorking:      data.isCurrentlyWorking,
			EmployerName:            data.employerName,
			EmployerAddress:         data.employerAddress,
		},
	}, nil
}
