package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"egabay/internal/repository"
)

type DashboardHandler struct {
	repo *repository.DashboardRepository
}

func NewDashboardHandler(repo *repository.DashboardRepository) *DashboardHandler {
	return &DashboardHandler{repo: repo}
}

func filterParams(r *http.Request) (string, string, string, string) {
	ay := r.URL.Query().Get("acad_year")
	sem := r.URL.Query().Get("semester")
	tribe := r.URL.Query().Get("tribe")
	concern := r.URL.Query().Get("concern")
	if ay == "" {
		ay = "2025"
	}
	if sem == "" {
		sem = "2nd semester"
	}
	return ay, sem, tribe, concern
}

func (h *DashboardHandler) EnrollmentPeriods(w http.ResponseWriter, r *http.Request) {
	data, err := h.repo.GetEnrollmentPeriods()
	if err != nil {
		log.Printf("enrollment periods error: %v", err)
		http.Error(w, `{"error":"failed to fetch enrollment periods"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func (h *DashboardHandler) Stats(w http.ResponseWriter, r *http.Request) {
	ay, sem, tribe, concern := filterParams(r)
	stats, err := h.repo.GetStats(ay, sem, tribe, concern)
	if err != nil {
		log.Printf("dashboard stats error: %v", err)
		http.Error(w, `{"error":"failed to fetch dashboard stats"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}

func (h *DashboardHandler) RecentSubmissions(w http.ResponseWriter, r *http.Request) {
	submissions, err := h.repo.GetRecentSubmissions(5)
	if err != nil {
		log.Printf("dashboard submissions error: %v", err)
		http.Error(w, `{"error":"failed to fetch submissions"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(submissions)
}

func (h *DashboardHandler) GenderRatio(w http.ResponseWriter, r *http.Request) {
	ay, sem, tribe, concern := filterParams(r)
	data, err := h.repo.GetGenderRatio(ay, sem, tribe, concern)
	if err != nil {
		log.Printf("gender ratio error: %v", err)
		http.Error(w, `{"error":"failed to fetch gender ratio"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func (h *DashboardHandler) TribeDistribution(w http.ResponseWriter, r *http.Request) {
	data, err := h.repo.GetTribeDistribution()
	if err != nil {
		log.Printf("tribe distribution error: %v", err)
		http.Error(w, `{"error":"failed to fetch tribe distribution"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func (h *DashboardHandler) TopColleges(w http.ResponseWriter, r *http.Request) {
	ay, sem, tribe, concern := filterParams(r)
	limitStr := r.URL.Query().Get("limit")
	limit := 10
	if limitStr != "" {
		if v, err := strconv.Atoi(limitStr); err == nil && v > 0 {
			limit = v
		}
	}

	data, err := h.repo.GetTopColleges(limit, ay, sem, tribe, concern)
	if err != nil {
		log.Printf("top colleges error: %v", err)
		http.Error(w, `{"error":"failed to fetch top colleges"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func (h *DashboardHandler) YearLevel(w http.ResponseWriter, r *http.Request) {
	ay, sem, tribe, concern := filterParams(r)
	data, err := h.repo.GetYearLevelDistribution(ay, sem, tribe, concern)
	if err != nil {
		log.Printf("year level error: %v", err)
		http.Error(w, `{"error":"failed to fetch year level"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func (h *DashboardHandler) GuidanceConcerns(w http.ResponseWriter, r *http.Request) {
	data, err := h.repo.GetGuidanceConcerns()
	if err != nil {
		log.Printf("guidance concerns error: %v", err)
		http.Error(w, `{"error":"failed to fetch guidance concerns"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func (h *DashboardHandler) CivilStatus(w http.ResponseWriter, r *http.Request) {
	data, err := h.repo.GetCivilStatusDistribution()
	if err != nil {
		log.Printf("civil status error: %v", err)
		http.Error(w, `{"error":"failed to fetch civil status"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func (h *DashboardHandler) CurrentlyWorking(w http.ResponseWriter, r *http.Request) {
	data, err := h.repo.GetCurrentlyWorkingDistribution()
	if err != nil {
		log.Printf("currently working error: %v", err)
		http.Error(w, `{"error":"failed to fetch currently working"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
