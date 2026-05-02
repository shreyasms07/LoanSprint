package handlers

import (
	"net/http"

	"loansprint/backend/models"
	"loansprint/backend/services"

	"github.com/gin-gonic/gin"
)

func CalculateLoanHandler(c *gin.Context) {
	var req models.LoanRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid input",
		})
		return
	}

	result := services.CalculateLoan(req)

	c.JSON(http.StatusOK, result)
}
