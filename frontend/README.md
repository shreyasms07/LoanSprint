# LoanSprint Frontend

A clean, responsive React application for loan planning and prepayment strategy calculation.

## Features

- 🚀 Calculate loan EMI and prepayment strategies
- 📊 Compare baseline vs optimized loan plans
- 💰 See interest savings and time saved
- 📱 Fully responsive design
- ⚡ Real-time calculations via backend API

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

## Installation

1. Install dependencies:
```bash
npm install
```

**Note:** An `.npmrc` file is already configured to use the public npm registry. If you still encounter issues, you can manually set it:
```bash
npm config set registry https://registry.npmjs.org/
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── LoanForm.jsx      # Input form with validation
│   │   └── Results.jsx        # Results display
│   ├── App.jsx                # Main app component
│   ├── App.css                # Styles
│   ├── api.js                 # API integration
│   └── main.jsx               # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## API Integration

The frontend communicates with the backend API at `/plan` endpoint:

**Request:**
```json
{
  "loan": 1000000,
  "interest": 8.5,
  "tenure": 20,
  "target_tenure": 10,  // OR
  "extra": 5000
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

## Usage

1. Enter loan details (amount, interest rate, tenure)
2. Choose strategy mode:
   - **Target Tenure**: Specify when you want to finish the loan
   - **Extra Payment**: Specify how much extra you can pay monthly
3. Click "Calculate" to see results
4. Review three sections:
   - 🔴 **Baseline**: Your current loan plan
   - 🟢 **Optimized**: Your improved plan with prepayment
   - 💥 **Benefit**: What you'll save

## Technologies

- React 18
- Vite
- CSS3 (no external UI libraries)
- Fetch API for backend communication

## Notes

- All monetary values are in Indian Rupees (₹)
- Numbers are formatted with Indian locale (lakhs/crores)
- Form includes validation for all inputs
- Responsive design works on mobile, tablet, and desktop