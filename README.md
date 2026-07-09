# eGABAY | MSU Division of Student Affairs Portal

REST API (Go) + React dashboard for managing student profiles, counseling records, and guidance services at Mindanao State University.

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| [Go](https://go.dev/dl/) | 1.25+ | Backend server |
| [Node.js](https://nodejs.org/) | 20+ | Frontend dev server |
| [npm](https://www.npmjs.com/) | 10+ | Frontend package manager |
| [golang-migrate](https://github.com/golang-migrate/migrate) | latest (Firebird driver) | Database migrations |
| Firebird | 3.x | Database server |

### Install golang-migrate with Firebird support

```bash
go install -tags firebird github.com/golang-migrate/migrate/v4/cmd/migrate@latest
```

Verify it works:

```bash
migrate -version
```

## Environment Variables

Copy or create a `.env` file in the project root:

```env
DB_USER=SYSDBA
DB_PASSWORD=12345678
DB_HOST=localhost
DB_PORT=3050
DB_PATH=D:\Backup\SIDB_LOCAL.FDB
SERVER_PORT=8080
JWT_SECRET=egabay_dsa_local_secret_key_2026
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `DB_USER` | No | `SYSDBA` | Firebird username |
| `DB_PASSWORD` | No | *(empty)* | Firebird password |
| `DB_HOST` | No | `localhost` | Firebird server host |
| `DB_PORT` | No | `3050` | Firebird server port |
| `DB_PATH` | **Yes** | — | Full path to `.FDB` file on server |
| `SERVER_PORT` | No | `8080` | HTTP listen port |
| `JWT_SECRET` | **Yes** | — | Secret key for JWT tokens |

## Quick Start

### 1. Initialize backend

```bash
go mod tidy
```

### 2. Apply database migrations

Firebird must be running and the database file at `DB_PATH` must already exist.

```bash
migrate -path migrations -database "firebird://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_PATH}?wire_crypt=true" up
```

Or with explicit values:

```bash
migrate -path migrations -database "firebird://SYSDBA:12345678@localhost:3050/D:\Backup\SIDB_LOCAL.FDB?wire_crypt=true" up
```

This creates the `EGABAY_ADMINS` table and seeds the default admin account.

### 3. Initialize frontend

```bash
cd web
npm install
```

### 4. Start the backend

```bash
go run ./cmd/server
```

Server listens on `http://localhost:8080`.

### 5. Start the frontend (separate terminal)

```bash
cd web
npm run dev
```

Frontend dev server runs on `http://localhost:5173`. The Vite proxy forwards `/auth` and `/health` requests to the Go backend at `localhost:8080`.

## Default Credentials

| Field | Value |
|---|---|
| **Username** | `admin_dsa` |
| **Password** | `Password123` |

## Project Structure

```
EGABAY/
├── api/
│   └── openapi.yaml          # API specification
├── cmd/
│   └── server/
│       └── main.go            # Go server entry point
├── internal/
│   ├── config/
│   │   └── config.go          # Environment config loader
│   ├── db/
│   │   └── db.go              # Firebird connection
│   ├── handler/
│   │   └── auth.go            # HTTP handlers
│   └── repository/
│       └── admin.go           # Database queries
├── migrations/
│   ├── 000001_create_egabay_admins.up.sql
│   ├── 000001_create_egabay_admins.down.sql
│   ├── 000002_seed_admin.up.sql
│   └── 000002_seed_admin.down.sql
├── web/                       # React frontend (Vite + React 19)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/            # shadcn-style components
│   │   │   └── dashboard/     # Dashboard layout & widgets
│   │   ├── pages/
│   │   │   ├── login.tsx      # Login page
│   │   │   └── dashboard.tsx  # Dashboard page
│   │   ├── features/
│   │   ├── hooks/
│   │   └── lib/
│   └── vite.config.ts
├── .env                       # Environment variables
├── go.mod
├── Makefile
└── README.md
```

## Scripts (Makefile)

```bash
make run-backend     # Start Go API server (go run ./cmd/server)
make run-frontend    # Start Vite dev server (cd web && npm run dev)
make build-backend   # Build Go binary to bin/egabay-server
make migrate-up      # Apply all pending migrations
make migrate-down    # Roll back the latest migration
make tidy            # go mod tidy
```

## API Documentation

See [`api/openapi.yaml`](api/openapi.yaml) for the full API spec.

### Available Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/auth/login` | Authenticate admin and receive JWT |
| `GET` | `/health` | Health check |
