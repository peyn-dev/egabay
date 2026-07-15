# EGABAY — MSU DSA Portal

**Backend:** Go 1.25 (stdlib `net/http` + Go 1.22+ routing patterns like `"POST /auth/login"`)  
**Frontend:** React 19 + Vite 8 + TypeScript 6 + Tailwind 4 + TanStack Query + React Router 8  
**Database:** Firebird 3.x (not PostgreSQL/SQLite)  
**Auth:** JWT (HS256, 8h TTL) in `sessionStorage` key `egabay_token`

## Commands

| Command | What |
|---|---|
| `go run ./cmd/server` | Start backend (port from `SERVER_PORT`, actual `.env` uses 8081) |
| `cd web && npm run dev` | Start frontend dev server (port 5173) |
| `cd web && npm run lint` | Lint frontend with **oxlint** (not ESLint) |
| `cd web && npm run build` | `tsc -b && vite build` (type-check then bundle) |
| `make migrate-up` | Apply Firebird migrations (requires `golang-migrate` CLI with `-tags firebird`) |
| `make migrate-down` | Roll back last migration |
| `make build-backend` | Build Go binary to `bin/egabay-server` |

## Architecture

- **Entrypoints:** `cmd/server/main.go` (Go), `web/src/main.tsx` (React)
- **Config** auto-loads `.env` from CWD via `internal/config/config.go` — `DB_PATH` and `JWT_SECRET` are required
- **Firebird DSN** built in `internal/db/db.go` with `wire_crypt=true&auth_plugin_name=Legacy_Auth`
- **Go backend** uses stdlib `http.NewServeMux` with Go 1.22+ method pattern — no external router
- **CORS middleware** (`withCORS` in `main.go`) allows all origins — any route needs to be registered in `main.go`
- **Vite proxy** forwards `/auth`, `/health`, `/api` → Go backend (actual target: `localhost:8081`)
- **Frontend alias:** `@/` → `web/src/`
- **Migrations:** create `EGABAY_ADMINS` table + seed default admin (`admin_dsa` / `Password123`)
- **Dashboard queries** hardcode the enrollment period (`ACADYEAR = '2025' AND SEMESTER = '2nd semester'` in `internal/repository/dashboard.go`)

## Frontend conventions

- UI components under `web/src/components/ui/` (shadcn-style Radix primitives, `cn()` from `tailwind-merge`+`clsx`)
- Feature modules under `web/src/features/<name>/` — each has `hooks/`, `schemas/`, etc.
- Forms use `react-hook-form` + `zod` resolvers
- Auth token stored in `sessionStorage` (cleared on tab close); no backend JWT validation on dashboard endpoints
- Active nav in sidebar driven by `location.pathname` (see `web/src/components/dashboard/sidebar.tsx`)

## Gotchas

- **No test framework** configured in Go or web
- `init-frontend` in Makefile scaffolds a fresh Vite project — do not run on existing `web/`
- A `.env` file exists locally but is **gitignored** — template in README; actual port is 8081
- All `go` commands must be run from repo root; all `npm` commands from `web/`
- JWT expires after 8h — no refresh mechanism
