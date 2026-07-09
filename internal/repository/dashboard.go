package repository

import (
	"database/sql"
	"fmt"
)

type DashboardStats struct {
	TotalStudents       int `json:"total_students"`
	FormsSubmitted      int `json:"forms_submitted"`
}

type RecentSubmission struct {
	IDNumber  int    `json:"id_number"`
	FullName  string `json:"full_name"`
	Course    string `json:"course"`
	YearLevel string `json:"year_level"`
}

type GenderEntry struct {
	Label string `json:"label"`
	Count int    `json:"count"`
}

type TribeEntry struct {
	Tribe string `json:"tribe"`
	Count int    `json:"count"`
}

type CollegeEntry struct {
	College string `json:"college"`
	Count   int    `json:"count"`
}

type YearLevelEntry struct {
	Level string `json:"level"`
	Count int    `json:"count"`
}

type DashboardRepository struct {
	db *sql.DB
}

func NewDashboardRepository(db *sql.DB) *DashboardRepository {
	return &DashboardRepository{db: db}
}

// enrolledIDs returns a subquery for distinct students billed in 2nd semester 2025.
// This defines "currently enrolled".
func enrolledIDs() string {
	return "(SELECT DISTINCT IDNUMBER FROM BILLINGACCOUNTS WHERE ACADYEAR = '2025' AND SEMESTER = '2nd semester')"
}

func (r *DashboardRepository) GetStats() (*DashboardStats, error) {
	var stats DashboardStats

	err := r.db.QueryRow(fmt.Sprintf("SELECT COUNT(*) FROM %s", enrolledIDs())).Scan(&stats.TotalStudents)
	if err != nil {
		return nil, fmt.Errorf("count students: %w", err)
	}

	err = r.db.QueryRow("SELECT COUNT(*) FROM STUDENTPROFILES").Scan(&stats.FormsSubmitted)
	if err != nil {
		return nil, fmt.Errorf("count forms: %w", err)
	}

	return &stats, nil
}

func (r *DashboardRepository) GetGenderRatio() ([]GenderEntry, error) {
	rows, err := r.db.Query(fmt.Sprintf(`
		SELECT COALESCE(NULLIF(s.GENDER, ''), 'Unknown'), COUNT(*)
		FROM STUDENTS s
		INNER JOIN %s e ON e.IDNUMBER = s.IDNUMBER
		GROUP BY s.GENDER
		ORDER BY COUNT(*) DESC
	`, enrolledIDs()))
	if err != nil {
		return nil, fmt.Errorf("gender ratio: %w", err)
	}
	defer rows.Close()

	var result []GenderEntry
	for rows.Next() {
		var e GenderEntry
		if err := rows.Scan(&e.Label, &e.Count); err != nil {
			return nil, err
		}
		result = append(result, e)
	}
	return result, nil
}

func (r *DashboardRepository) GetTribeDistribution() ([]TribeEntry, error) {
	rows, err := r.db.Query(`
		SELECT COALESCE(NULLIF(TRIM(TRIBE), ''), 'Unknown'), COUNT(*)
		FROM STUDENTPROFILES
		WHERE TRIBE IS NOT NULL AND TRIM(TRIBE) != ''
		GROUP BY TRIBE
		ORDER BY COUNT(*) DESC
	`)
	if err != nil {
		return nil, fmt.Errorf("tribe distribution: %w", err)
	}
	defer rows.Close()

	var result []TribeEntry
	for rows.Next() {
		var e TribeEntry
		if err := rows.Scan(&e.Tribe, &e.Count); err != nil {
			return nil, err
		}
		result = append(result, e)
	}
	return result, nil
}

func (r *DashboardRepository) GetTopColleges(limit int) ([]CollegeEntry, error) {
	rows, err := r.db.Query(fmt.Sprintf(`
		SELECT COALESCE(NULLIF(d.COLLEGE, ''), 'Unknown'), COUNT(*)
		FROM STUDENTS s
		INNER JOIN %s e ON e.IDNUMBER = s.IDNUMBER
		LEFT JOIN COURSES c ON c.COURSE = s.COURSE
		LEFT JOIN DEPARTMENTS d ON d.DEPARTMENT = c.DEPARTMENT
		GROUP BY d.COLLEGE
		ORDER BY COUNT(*) DESC
	`, enrolledIDs()))
	if err != nil {
		return nil, fmt.Errorf("top colleges: %w", err)
	}
	defer rows.Close()

	var result []CollegeEntry
	for rows.Next() {
		var e CollegeEntry
		if err := rows.Scan(&e.College, &e.Count); err != nil {
			return nil, err
		}
		result = append(result, e)
	}
	if len(result) > limit {
		result = result[:limit]
	}
	return result, nil
}

func (r *DashboardRepository) GetYearLevelDistribution() ([]YearLevelEntry, error) {
	rows, err := r.db.Query(fmt.Sprintf(`
		SELECT
			CASE
				WHEN UPPER(TRIM(s.YEARLEVEL)) LIKE '1ST%%' THEN '1st Year'
				WHEN UPPER(TRIM(s.YEARLEVEL)) LIKE '2ND%%' THEN '2nd Year'
				WHEN UPPER(TRIM(s.YEARLEVEL)) LIKE '3RD%%' THEN '3rd Year'
				WHEN UPPER(TRIM(s.YEARLEVEL)) LIKE '4TH%%' THEN '4th Year'
				WHEN UPPER(TRIM(s.YEARLEVEL)) LIKE '5TH%%' THEN '5th Year'
				ELSE COALESCE(NULLIF(s.YEARLEVEL, ''), 'Unknown')
			END AS level_group,
			COUNT(*)
		FROM STUDENTS s
		INNER JOIN %s e ON e.IDNUMBER = s.IDNUMBER
		GROUP BY level_group
		ORDER BY COUNT(*) DESC
	`, enrolledIDs()))
	if err != nil {
		return nil, fmt.Errorf("year level: %w", err)
	}
	defer rows.Close()

	var result []YearLevelEntry
	for rows.Next() {
		var e YearLevelEntry
		if err := rows.Scan(&e.Level, &e.Count); err != nil {
			return nil, err
		}
		result = append(result, e)
	}
	return result, nil
}

func (r *DashboardRepository) GetRecentSubmissions(limit int) ([]RecentSubmission, error) {
	query := fmt.Sprintf(`
		SELECT FIRST %d
			sp.IDNUMBER,
			COALESCE(s.FULLNAME, ''),
			COALESCE(s.COURSE, ''),
			COALESCE(s.YEARLEVEL, '')
		FROM STUDENTPROFILES sp
		LEFT JOIN STUDENTS s ON s.IDNUMBER = sp.IDNUMBER
		ORDER BY sp.IDNUMBER DESC
	`, limit)

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("query submissions: %w", err)
	}
	defer rows.Close()

	var result []RecentSubmission
	for rows.Next() {
		var sub RecentSubmission
		if err := rows.Scan(&sub.IDNumber, &sub.FullName, &sub.Course, &sub.YearLevel); err != nil {
			return nil, fmt.Errorf("scan row: %w", err)
		}
		result = append(result, sub)
	}

	return result, nil
}
