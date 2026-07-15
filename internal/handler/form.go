package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"egabay/internal/repository"
)

type FormHandler struct {
	repo *repository.FormRepository
}

func NewFormHandler(repo *repository.FormRepository) *FormHandler {
	return &FormHandler{repo: repo}
}

func (h *FormHandler) FormDetail(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, `{"error":"invalid student id"}`, http.StatusBadRequest)
		return
	}

	detail, err := h.repo.GetFormDetail(id)
	if err != nil {
		log.Printf("form detail error: %v", err)
		http.Error(w, `{"error":"failed to fetch form detail"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(detail)
}
