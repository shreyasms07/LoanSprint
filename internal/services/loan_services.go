package services

import (
	"loansprint/internal/models"
	"math"
)

const (
	maxSimulationMonths = 600
	binarySearchSteps   = 50
)

type simulationResult struct {
	months        int
	interestPaid  float64
	totalPaid     float64
	requiredExtra float64
}

func CalculateLoan(req models.LoanRequest) models.LoanResponse {
	totalMonths := int(math.Round(req.Tenure * 12))
	rate := req.Interest / 12 / 100
	emi := calculateEMI(req.Loan, rate, totalMonths)

	baseline := simulateLoan(req.Loan, rate, emi, 0)

	optimized := simulationResult{}
	requiredExtra := 0.0

	if req.Extra > 0 {
		requiredExtra = req.Extra
		optimized = simulateLoan(req.Loan, rate, emi, req.Extra)
	} else {
		targetMonths := resolveTargetMonths(req.Tenure, req.TargetTenure)
		requiredExtra = findRequiredExtra(req.Loan, rate, emi, targetMonths)
		optimized = simulateLoan(req.Loan, rate, emi, requiredExtra)
	}

	optimized.requiredExtra = requiredExtra

	return models.LoanResponse{
		EMI: int(math.Round(emi)),
		Baseline: models.LoanPlan{
			Months:       baseline.months,
			Years:        roundYears(baseline.months),
			InterestPaid: roundAmount(baseline.interestPaid),
			TotalPaid:    roundAmount(baseline.totalPaid),
		},
		Optimized: models.LoanPlanEx{
			RequiredExtra:  roundAmount(optimized.requiredExtra),
			MonthlyOutflow: int(math.Round(emi)) + roundAmount(optimized.requiredExtra),
			LoanPlan: models.LoanPlan{
				Months:       optimized.months,
				Years:        roundYears(optimized.months),
				InterestPaid: roundAmount(optimized.interestPaid),
				TotalPaid:    roundAmount(optimized.totalPaid),
			},
		},
		Benefit: models.LoanBenefit{
			InterestSaved:   roundAmount(baseline.interestPaid - optimized.interestPaid),
			TimeSavedMonths: baseline.months - optimized.months,
		},
	}
}

func calculateEMI(principal, rate float64, months int) float64 {
	if months <= 0 {
		return 0
	}

	if rate == 0 {
		return principal / float64(months)
	}

	growth := math.Pow(1+rate, float64(months))
	return principal * rate * growth / (growth - 1)
}

func simulateLoan(principal, rate, emi, extra float64) simulationResult {
	balance := principal
	months := 0
	totalInterest := 0.0
	totalPaid := 0.0

	for balance > 0 && months < maxSimulationMonths {
		interestPart := balance * rate
		monthlyPayment := emi + extra

		if monthlyPayment <= interestPart {
			return simulationResult{
				months:       maxSimulationMonths,
				interestPaid: totalInterest,
				totalPaid:    totalPaid,
			}
		}

		principalPart := monthlyPayment - interestPart
		actualPayment := monthlyPayment

		if principalPart >= balance {
			principalPart = balance
			actualPayment = balance + interestPart
		}

		balance -= principalPart
		totalInterest += interestPart
		totalPaid += actualPayment
		months++
	}

	return simulationResult{
		months:       months,
		interestPaid: totalInterest,
		totalPaid:    totalPaid,
	}
}

func resolveTargetMonths(tenureYears, targetTenureYears float64) int {
	if targetTenureYears <= 0 {
		targetTenureYears = tenureYears / 2
	}

	targetMonths := int(math.Round(targetTenureYears * 12))
	if targetMonths < 1 {
		return 1
	}

	return targetMonths
}

func findRequiredExtra(principal, rate, emi float64, targetMonths int) float64 {
	low := 0.0
	high := emi * 2

	for i := 0; i < binarySearchSteps; i++ {
		mid := (low + high) / 2
		result := simulateLoan(principal, rate, emi, mid)

		if result.months > targetMonths {
			low = mid
			continue
		}

		high = mid
	}

	return high
}

func roundAmount(value float64) int {
	return int(math.Round(value))
}

func roundYears(months int) float64 {
	return math.Round((float64(months)/12)*10) / 10
}

// Made with Bob
