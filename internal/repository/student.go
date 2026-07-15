package repository

import (
	"database/sql"
	"fmt"
	"strings"
)

type StudentInformation struct {
	IDNumber  int    `json:"id_number"`
	FullName  string `json:"full_name"`
	Course    string `json:"course"`
	YearLevel string `json:"year_level"`
}

type StudentRepository struct {
	db *sql.DB
}

func NewStudentRepository(db *sql.DB) *StudentRepository {
	return &StudentRepository{db: db}
}

type StudentFilter struct {
	Search    string
	College   string
	YearLevel string
	Page      int
	Limit     int
}

type PaginatedStudents struct {
	Data  []StudentInformation `json:"data"`
	Total int                  `json:"total"`
	Page  int                  `json:"page"`
	Limit int                  `json:"limit"`
}

func (r *StudentRepository) GetStudentInformation(filter StudentFilter) (*PaginatedStudents, error) {
	if filter.Page < 1 {
		filter.Page = 1
	}
	if filter.Limit < 1 || filter.Limit > 100 {
		filter.Limit = 10
	}

	joins := "LEFT JOIN STUDENTS s ON s.IDNUMBER = sp.IDNUMBER"
	var where []string
	var args []any

	if filter.College != "" {
		joins += " LEFT JOIN COURSES c ON c.COURSE = s.COURSE LEFT JOIN DEPARTMENTS d ON d.DEPARTMENT = c.DEPARTMENT"
	}

	if filter.Search != "" {
		search := "%" + strings.ToUpper(filter.Search) + "%"
		where = append(where, "(UPPER(COALESCE(s.FULLNAME, '')) LIKE ? OR UPPER(COALESCE(s.COURSE, '')) LIKE ? OR CAST(sp.IDNUMBER AS VARCHAR(20)) LIKE ?)")
		args = append(args, search, search, search)
	}
	if filter.YearLevel != "" {
		where = append(where, "UPPER(TRIM(s.YEARLEVEL)) LIKE ?")
		args = append(args, "%"+strings.ToUpper(filter.YearLevel)+"%")
	}
	if filter.College != "" {
		where = append(where, "UPPER(TRIM(d.COLLEGE)) = ?")
		args = append(args, strings.ToUpper(filter.College))
	}

	whereClause := ""
	if len(where) > 0 {
		whereClause = "WHERE " + strings.Join(where, " AND ")
	}

	var total int
	countQuery := fmt.Sprintf(`
		SELECT COUNT(*)
		FROM STUDENTPROFILES sp
		%s
		%s
	`, joins, whereClause)
	err := r.db.QueryRow(countQuery, args...).Scan(&total)
	if err != nil {
		return nil, fmt.Errorf("count student informations: %w", err)
	}

	offset := (filter.Page - 1) * filter.Limit
	rows, err := r.db.Query(fmt.Sprintf(`
		SELECT sp.IDNUMBER, COALESCE(s.FULLNAME, ''), COALESCE(s.COURSE, ''), COALESCE(s.YEARLEVEL, '')
		FROM STUDENTPROFILES sp
		%s
		%s
		ORDER BY sp.IDNUMBER DESC
		ROWS %d TO %d
	`, joins, whereClause, offset+1, offset+filter.Limit), args...)
	if err != nil {
		return nil, fmt.Errorf("query student informations: %w", err)
	}
	defer rows.Close()

	var result []StudentInformation
	for rows.Next() {
		var sub StudentInformation
		if err := rows.Scan(&sub.IDNumber, &sub.FullName, &sub.Course, &sub.YearLevel); err != nil {
			return nil, fmt.Errorf("scan row: %w", err)
		}
		result = append(result, sub)
	}

	return &PaginatedStudents{
		Data:  result,
		Total: total,
		Page:  filter.Page,
		Limit: filter.Limit,
	}, nil
}
