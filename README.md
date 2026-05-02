# LoanSprint 🚀

A full-stack loan planning application that helps users optimize their loan repayment strategy through prepayment calculations.

## Overview

LoanSprint calculates and compares:
- **Baseline Plan**: Your standard loan repayment schedule
- **Optimized Plan**: Accelerated repayment with extra monthly payments
- **Benefits**: Interest saved and time reduced

## Architecture

### Backend (Go + Gin)
- RESTful API for loan calculations
- Efficient EMI and prepayment simulation
- CORS-enabled for frontend integration

### Frontend (React + Vite)
- Clean, responsive UI
- Real-time loan calculations
- Mobile-friendly design

## Quick Start

### 1. Start Backend

```bash
# Build
go build -o loansprint ./cmd/server

# Run
./loansprint
```

Backend runs on `http://localhost:8080`

### 2. Start Frontend

```bash
cd frontend

# Install dependencies (if npm registry issues, see frontend/README.md)
npm install

# Run dev server
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoint

**POST** `/plan`

**Request:**
```json
{
  "loan": 1000000,
  "interest": 8.5,
  "tenure": 20,
  "target_tenure": 10,  // Optional: target years
  "extra": 5000         // Optional: extra monthly payment
}
```

**Response:**
```json
{
  "emi": 8678,
  "baseline": {
    "months": 240,
    "years": 20.0,
    "interest_paid": 1082720,
    "total_paid": 2082720
  },
  "optimized": {
    "required_extra": 4000,
    "monthly_outflow": 12678,
    "months": 120,
    "years": 10.0,
    "interest_paid": 521360,
    "total_paid": 1521360
  },
  "benefit": {
    "interest_saved": 561360,
    "time_saved_months": 120
  }
}
```

## Project Structure

```
LoanSprint/
├── cmd/
│   └── server/
│       └── main.go              # Server entry point
├── internal/
│   ├── handlers/
│   │   └── loan_handlers.go     # API handlers
│   ├── models/
│   │   └── loan.go              # Data models
│   ├── services/
│   │   └── loan_services.go     # Business logic
│   └── utils/
│       └── math.go              # Utility functions
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoanForm.jsx     # Input form
│   │   │   └── Results.jsx      # Results display
│   │   ├── App.jsx              # Main component
│   │   ├── App.css              # Styles
│   │   ├── api.js               # API integration
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── go.mod
├── go.sum
└── README.md
```

## Features

### Backend
- ✅ EMI calculation with compound interest
- ✅ Loan simulation with prepayment
- ✅ Binary search for optimal extra payment
- ✅ Years rounded to 1 decimal place
- ✅ Monthly outflow calculation
- ✅ Safety checks for edge cases
- ✅ CORS support

### Frontend
- ✅ Clean, card-based UI
- ✅ Two strategy modes (Target Tenure / Extra Payment)
- ✅ Input validation
- ✅ Loading states
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Indian currency formatting (₹)
- ✅ Prominent benefit display

## Usage

1. **Enter Loan Details**
   - Loan amount (₹)
   - Interest rate (%)
   - Tenure (years)

2. **Choose Strategy**
   - **Target Tenure**: Specify when you want to finish
   - **Extra Payment**: Specify monthly extra amount

3. **View Results**
   - Compare baseline vs optimized plans
   - See interest saved and time reduced
   - Make informed decisions

## Technologies

### Backend
- Go 1.21+
- Gin Web Framework
- gin-contrib/cors

### Frontend
- React 18
- Vite
- CSS3 (no UI frameworks)

## Development

### Backend
```bash
# Run tests
go test ./...

# Build
go build -o loansprint ./cmd/server

# Run
./loansprint
```

### Frontend
```bash
cd frontend

# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

## License

MIT

