package config

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// Config holds application settings loaded from environment variables.
type Config struct {
	DBUser     string
	DBPassword string
	DBHost     string
	DBPort     int
	DBPath     string
	ServerPort int
	JWTSecret  string
}

// Load reads configuration from the process environment, optionally priming
// values from a .env file in the project root or current working directory.
func Load() (*Config, error) {
	if err := loadDotEnv(".env"); err != nil && !os.IsNotExist(err) {
		return nil, fmt.Errorf("load .env: %w", err)
	}

	port, err := strconv.Atoi(getEnv("DB_PORT", "3050"))
	if err != nil {
		return nil, fmt.Errorf("invalid DB_PORT: %w", err)
	}

	serverPort, err := strconv.Atoi(getEnv("SERVER_PORT", "8080"))
	if err != nil {
		return nil, fmt.Errorf("invalid SERVER_PORT: %w", err)
	}

	cfg := &Config{
		DBUser:     getEnv("DB_USER", "SYSDBA"),
		DBPassword: getEnv("DB_PASSWORD", ""),
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     port,
		DBPath:     getEnv("DB_PATH", ""),
		ServerPort: serverPort,
		JWTSecret:  getEnv("JWT_SECRET", ""),
	}

	if cfg.DBPath == "" {
		return nil, fmt.Errorf("DB_PATH is required")
	}
	if cfg.JWTSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET is required")
	}

	return cfg, nil
}

func loadDotEnv(filename string) error {
	paths := []string{filename}
	if wd, err := os.Getwd(); err == nil {
		paths = append(paths, filepath.Join(wd, filename))
	}

	var envFile string
	for _, candidate := range paths {
		if _, err := os.Stat(candidate); err == nil {
			envFile = candidate
			break
		}
	}
	if envFile == "" {
		return os.ErrNotExist
	}

	file, err := os.Open(envFile)
	if err != nil {
		return err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		key, value, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}

		key = strings.TrimSpace(key)
		value = strings.TrimSpace(value)
		value = strings.Trim(value, `"'`)

		if _, exists := os.LookupEnv(key); !exists {
			os.Setenv(key, value)
		}
	}

	return scanner.Err()
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok && value != "" {
		return value
	}
	return fallback
}
