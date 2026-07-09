.PHONY: init-backend init-frontend run-backend run-frontend build-backend tidy migrate-up migrate-down help

GO ?= go
NPM ?= npm

help:
	@echo "EGABAY development tasks"
	@echo "  make init-backend   - Download Go modules and tidy dependencies"
	@echo "  make init-frontend  - Scaffold Vite 8 + React 19 + Tailwind in ./web"
	@echo "  make run-backend    - Start the Go API server"
	@echo "  make run-frontend   - Start the Vite dev server"
	@echo "  make build-backend  - Build the Go server binary"
	@echo "  make tidy           - Run go mod tidy"
	@echo "  make migrate-up     - Apply Firebird migrations (requires golang-migrate CLI)"
	@echo "  make migrate-down   - Roll back the latest migration"

init-backend:
	$(GO) get github.com/nakagami/firebirdsql
	$(GO) get github.com/golang-jwt/jwt/v5
	$(GO) get golang.org/x/crypto/bcrypt
	$(GO) mod tidy

init-frontend:
	@if [ -f web/package.json ]; then \
		echo "web/package.json already exists; skipping Vite scaffold."; \
	else \
		$(NPM) create vite@latest web -- --template react-ts; \
	fi
	cd web && $(NPM) install
	cd web && $(NPM) install react@^19 react-dom@^19
	cd web && $(NPM) install -D tailwindcss@^4 @tailwindcss/vite@^4
	@echo "Frontend initialized. Configure Tailwind in web/vite.config.ts and web/src/index.css."

run-backend:
	$(GO) run ./cmd/server

run-frontend:
	cd web && $(NPM) run dev

build-backend:
	$(GO) build -o bin/egabay-server ./cmd/server

tidy:
	$(GO) mod tidy

migrate-up:
	migrate -path migrations -database "firebird://$${DB_USER}:$${DB_PASSWORD}@$${DB_HOST}:$${DB_PORT}/$${DB_PATH}?wire_crypt=true" up

migrate-down:
	migrate -path migrations -database "firebird://$${DB_USER}:$${DB_PASSWORD}@$${DB_HOST}:$${DB_PORT}/$${DB_PATH}?wire_crypt=true" down 1
