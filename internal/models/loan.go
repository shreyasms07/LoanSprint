package models

type LoanRequest struct {
	Loan         float64 `json:"loan"`
	Interest     float64 `json:"interest"`
	Tenure       float64 `json:"tenure"`
	TargetTenure float64 `json:"target_tenure"`
	Extra        float64 `json:"extra"`
}

type LoanPlan struct {
	Months       int     `json:"months"`
	Years        float64 `json:"years"`
	InterestPaid int     `json:"interest_paid"`
	TotalPaid    int     `json:"total_paid"`
}

type LoanBenefit struct {
	InterestSaved   int `json:"interest_saved"`
	TimeSavedMonths int `json:"time_saved_months"`
}

type LoanResponse struct {
	EMI       int         `json:"emi"`
	Baseline  LoanPlan    `json:"baseline"`
	Optimized LoanPlanEx  `json:"optimized"`
	Benefit   LoanBenefit `json:"benefit"`
}

type LoanPlanEx struct {
	RequiredExtra  int `json:"required_extra"`
	MonthlyOutflow int `json:"monthly_outflow"`
	LoanPlan
}

// Made with Bob
