package main

import (
	"loansprint/backend/handlers"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOriginFunc: func(origin string) bool {
			// Allow localhost for development
			if origin == "http://localhost:3000" {
				return true
			}
			// Allow any Vercel deployment
			if len(origin) > 19 && origin[len(origin)-11:] == ".vercel.app" {
				return true
			}
			// Allow any Render deployment
			if len(origin) > 18 && origin[len(origin)-14:] == ".onrender.com" {
				return true
			}
			return false
		},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	r.POST("/plan", handlers.CalculateLoanHandler)

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Use PORT from environment or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}
