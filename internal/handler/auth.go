package handler

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"egabay/internal/auth"
	"egabay/internal/repository"
)

type AuthHandler struct {
	admins    *repository.AdminRepository
	jwtSecret string
}

func NewAuthHandler(admins *repository.AdminRepository, jwtSecret string) *AuthHandler {
	return &AuthHandler{
		admins:    admins,
		jwtSecret: jwtSecret,
	}
}

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type loginResponse struct {
	Token    string `json:"token"`
	Username string `json:"username"`
	FullName string `json:"full_name"`
	Role     string `json:"role"`
}

type errorResponse struct {
	Error string `json:"error"`
}

// Login authenticates an administrator and returns a bearer JWT token.
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON request body")
		return
	}

	if req.Username == "" || req.Password == "" {
		writeError(w, http.StatusBadRequest, "username and password are required")
		return
	}

	admin, err := h.admins.FindByUsername(r.Context(), req.Username)
	if errors.Is(err, repository.ErrAdminNotFound) {
		writeError(w, http.StatusUnauthorized, "invalid username or password")
		return
	}
	if err != nil {
		log.Printf("auth login lookup error: %v", err)
		writeError(w, http.StatusInternalServerError, "internal server error")
		return
	}

	if err := auth.CheckPassword(admin.PasswordHash, req.Password); err != nil {
		writeError(w, http.StatusUnauthorized, "invalid username or password")
		return
	}

	token, err := auth.GenerateToken(
		h.jwtSecret,
		admin.ID,
		admin.Username,
		admin.FullName,
		admin.Role,
	)
	if err != nil {
		log.Printf("auth token generation error: %v", err)
		writeError(w, http.StatusInternalServerError, "internal server error")
		return
	}

	writeJSON(w, http.StatusOK, loginResponse{
		Token:    token,
		Username: admin.Username,
		FullName: admin.FullName,
		Role:     admin.Role,
	})
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		log.Printf("write json response error: %v", err)
	}
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, errorResponse{Error: message})
}
