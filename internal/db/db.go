package db

import (
	"database/sql"
	"fmt"
	"net/url"
	"strings"

	"egabay/internal/config"

	_ "github.com/nakagami/firebirdsql"
)

func New(cfg *config.Config) (*sql.DB, error) {
	dsn, err := buildDSN(cfg)
	if err != nil {
		return nil, fmt.Errorf("build firebird dsn: %w", err)
	}

	db, err := sql.Open("firebirdsql", dsn)
	if err != nil {
		return nil, fmt.Errorf("open firebird connection: %w", err)
	}

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("ping firebird database: %w", err)
	}

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)

	return db, nil
}

func buildDSN(cfg *config.Config) (string, error) {
	user := url.QueryEscape(cfg.DBUser)
	password := url.QueryEscape(cfg.DBPassword)
	dbPath := normalizeDBPath(cfg.DBPath)
	hostPort := fmt.Sprintf("%s:%d", cfg.DBHost, cfg.DBPort)

	dsn := fmt.Sprintf(
		"%s:%s@%s/%s?wire_crypt=true&auth_plugin_name=Legacy_Auth",
		user, password, hostPort, dbPath,
	)
	return dsn, nil
}

func normalizeDBPath(path string) string {
	path = strings.TrimSpace(path)
	path = strings.ReplaceAll(path, `\\`, `\`)
	return path
}
