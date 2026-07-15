package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"egabay/internal/repository"
)

type StudentHandler struct {
	repo *repository.StudentRepository
}

func NewStudentHandler(repo *repository.StudentRepository) *StudentHandler {
	return &StudentHandler{repo: repo}
}

func (h *StudentHandler) StudentInformation(w http.ResponseWriter, r *http.Request) {
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))

	filter := repository.StudentFilter{
		Search:    r.URL.Query().Get("search"),
		College:   r.URL.Query().Get("college"),
		YearLevel: r.URL.Query().Get("year_level"),
		Page:      page,
		Limit:     limit,
	}

	students, err := h.repo.GetStudentInformation(filter)
	if err != nil {
		log.Printf("student information error: %v", err)
		http.Error(w, `{"error":"failed to fetch student information"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(students)
}
