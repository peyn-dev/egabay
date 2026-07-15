package main

import (
	"fmt"
	"log"
	"net/http"

	"egabay/internal/config"
	"egabay/internal/db"
	"egabay/internal/handler"
	"egabay/internal/repository"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("load config: %v", err)
	}

	database, err := db.New(cfg)
	if err != nil {
		log.Fatalf("connect database: %v", err)
	}
	defer database.Close()

	adminRepo := repository.NewAdminRepository(database)
	dashboardRepo := repository.NewDashboardRepository(database)
	studentRepo := repository.NewStudentRepository(database)
	formRepo := repository.NewFormRepository(database)
	authHandler := handler.NewAuthHandler(adminRepo, cfg.JWTSecret)
	dashboardHandler := handler.NewDashboardHandler(dashboardRepo)
	studentHandler := handler.NewStudentHandler(studentRepo)
	formHandler := handler.NewFormHandler(formRepo)

	mux := http.NewServeMux()
	mux.HandleFunc("POST /auth/login", authHandler.Login)
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"ok"}`))
	})
	mux.HandleFunc("GET /api/dashboard/stats", dashboardHandler.Stats)
	mux.HandleFunc("GET /api/dashboard/submissions", dashboardHandler.RecentSubmissions)
	mux.HandleFunc("GET /api/dashboard/gender-ratio", dashboardHandler.GenderRatio)
	mux.HandleFunc("GET /api/dashboard/tribe-distribution", dashboardHandler.TribeDistribution)
	mux.HandleFunc("GET /api/dashboard/top-colleges", dashboardHandler.TopColleges)
	mux.HandleFunc("GET /api/dashboard/year-level", dashboardHandler.YearLevel)
	mux.HandleFunc("GET /api/student/informations", studentHandler.StudentInformation)
	mux.HandleFunc("GET /api/student/{id}/form", formHandler.FormDetail)

	addr := fmt.Sprintf(":%d", cfg.ServerPort)
	log.Printf("egabay server listening on %s", addr)
	if err := http.ListenAndServe(addr, withCORS(mux)); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
