package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
)

var ErrAdminNotFound = errors.New("admin not found")

// Admin represents a row from EGABAY_ADMINS.
type Admin struct {
	ID           string
	Username     string
	PasswordHash string
	FullName     string
	Role         string
}

// AdminRepository provides data access for administrator accounts.
type AdminRepository struct {
	db *sql.DB
}

func NewAdminRepository(db *sql.DB) *AdminRepository {
	return &AdminRepository{db: db}
}

// FindByUsername returns an administrator matching the given username.
func (r *AdminRepository) FindByUsername(ctx context.Context, username string) (*Admin, error) {
	const query = `
		SELECT ADMIN_ID, USERNAME, PASSWORD_HASH, FULL_NAME, ROLE
		FROM EGABAY_ADMINS
		WHERE USERNAME = ?
	`

	row := r.db.QueryRowContext(ctx, query, username)

	var admin Admin
	err := row.Scan(
		&admin.ID,
		&admin.Username,
		&admin.PasswordHash,
		&admin.FullName,
		&admin.Role,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrAdminNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("query admin by username: %w", err)
	}

	return &admin, nil
}
