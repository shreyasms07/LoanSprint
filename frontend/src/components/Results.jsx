import { formatCurrency, formatNumber } from '../api';

const Results = ({ data }) => {
  if (!data) return null;

  return (
    <div className="results-container">
      <div className="results-grid">
        {/* Baseline Section */}
        <div className="result-card baseline">
          <div className="card-header">
            <h3>🔴 Baseline</h3>
            <p className="card-subtitle">Without Prepayment</p>
          </div>
          <div className="card-body">
            <div className="result-item">
              <span className="label">EMI</span>
              <span className="value">{formatCurrency(data.emi)}</span>
            </div>
            <div className="result-item">
              <span className="label">Duration</span>
              <span className="value">{data.baseline.years} years</span>
            </div>
            <div className="result-item">
              <span className="label">Interest Paid</span>
              <span className="value">{formatCurrency(data.baseline.interest_paid)}</span>
            </div>
            <div className="result-item total">
              <span className="label">Total Paid</span>
              <span className="value">{formatCurrency(data.baseline.total_paid)}</span>
            </div>
          </div>
        </div>

        {/* Optimized Section */}
        <div className="result-card optimized">
          <div className="card-header">
            <h3>🟢 Optimized</h3>
            <p className="card-subtitle">With Strategy</p>
          </div>
          <div className="card-body">
            <div className="result-item highlight">
              <span className="label">Required Extra</span>
              <span className="value">{formatCurrency(data.optimized.required_extra)}</span>
            </div>
            <div className="result-item highlight">
              <span className="label">Monthly Outflow</span>
              <span className="value">{formatCurrency(data.optimized.monthly_outflow)}</span>
            </div>
            <div className="result-item">
              <span className="label">New Duration</span>
              <span className="value">{data.optimized.years} years</span>
            </div>
            <div className="result-item">
              <span className="label">Interest Paid</span>
              <span className="value">{formatCurrency(data.optimized.interest_paid)}</span>
            </div>
            <div className="result-item total">
              <span className="label">Total Paid</span>
              <span className="value">{formatCurrency(data.optimized.total_paid)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefit Section - Full Width */}
      <div className="benefit-card">
        <div className="benefit-header">
          <h3>💥 Your Benefit</h3>
          <p className="benefit-subtitle">See what you'll save</p>
        </div>
        <div className="benefit-body">
          <div className="benefit-item">
            <div className="benefit-icon">💰</div>
            <div className="benefit-content">
              <span className="benefit-label">Interest Saved</span>
              <span className="benefit-value">{formatCurrency(data.benefit.interest_saved)}</span>
            </div>
          </div>
          <div className="benefit-divider"></div>
          <div className="benefit-item">
            <div className="benefit-icon">⏱️</div>
            <div className="benefit-content">
              <span className="benefit-label">Time Saved</span>
              <span className="benefit-value">{data.benefit.time_saved_months} months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

// Made with Bob
