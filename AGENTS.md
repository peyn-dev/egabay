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
- MSU seal (`/msu-seal.png`) is 2MB, DSA logo (`/dsa-logo.png`) is 2.7MB — NOT embedded as base64 in JS; uses URL paths served by Vite

## Summary

### Dashboard
- Enrollment counted via `BILLINGACCOUNTS` (14,154 distinct IDNUMBERs for 2025 2nd semester)
- Charts: Students Per College (top 5, 2-col span, custom tooltip from `payload.full`), Guidance Concerns (horizontal bar), Civil Status (donut), Currently Working (donut)
- Filters: Academic Year / Semester (from `GetEnrollmentPeriods()`), Tribe (from `useTribeDistribution`), Concern (8 hardcoded options)
- Tribe/concern filters use `EXISTS (SELECT 1 FROM STUDENTPROFILES ...)` clause; only 8 profiles exist → empty results when restricted

### PDF Generator (`web/src/lib/generate-form-pdf.ts`)
- Verbatim HTML copy of akan `inventory_pdf.php` template
- Uses `html2canvas` + `jsPDF` (8.5in × 13in), 2 pages (form + page break)
- Sections: Personal Info (caption row), Health (5 problems w/ specify), Other Information (interest groups, consulted status, 8 guidance concerns), Disclaimer, Parental/Guardian Consent
- Financer checkboxes mapped from numeric codes: `'1'`=Parents → `'6'`=Scholarship
- Seal images referenced by URL (`/msu-seal.png`, `/dsa-logo.png`)
- Wired to "Download PDF" button in `form-detail.tsx`

### Backend Extensions
- `ProfileInfo` struct: 41 fields (health booleans/specify, interest toggles, guidance concerns, psych test records × 3)
- `FamilyInfo` struct: `OtherMaritalStatusReason`
- SQL query: 90+ COALESCE columns from `STUDENTS` + `STUDENTPROFILES`
- TypeScript `StudentFormDetail` schema: matching `profile` + `family` interfaces

### Auth
- `useLogout.ts` hook: clears sessionStorage, invalidates React Query, navigates to `/login`
- `SessionProvider`: 1-hour inactivity timeout with activity listeners
- Login error: catches network/JSON failures, shows "Server is down"

### Style
- `index.css`: `outline: none !important` on `.recharts-surface, .recharts-wrapper *`
- Sidebar: bottom logo SVG removed (now shows nav items only)
