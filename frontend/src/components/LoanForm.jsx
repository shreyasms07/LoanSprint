import { useState } from 'react';

const LoanForm = ({ onCalculate, loading }) => {
  const [formData, setFormData] = useState({
    loan: '',
    interest: '',
    tenure: '',
    mode: 'target', // 'target' or 'extra'
    targetTenure: '',
    extra: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleModeChange = (mode) => {
    setFormData(prev => ({
      ...prev,
      mode,
      targetTenure: '',
      extra: '',
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.loan || parseFloat(formData.loan) <= 0) {
      newErrors.loan = 'Please enter a valid loan amount';
    }

    if (!formData.interest || parseFloat(formData.interest) <= 0) {
      newErrors.interest = 'Please enter a valid interest rate';
    }

    if (!formData.tenure || parseFloat(formData.tenure) <= 0) {
      newErrors.tenure = 'Please enter a valid tenure';
    }

    if (formData.mode === 'target') {
      if (!formData.targetTenure || parseFloat(formData.targetTenure) <= 0) {
        newErrors.targetTenure = 'Please enter a valid target tenure';
      } else if (parseFloat(formData.targetTenure) >= parseFloat(formData.tenure)) {
        newErrors.targetTenure = 'Target tenure must be less than original tenure';
      }
    } else {
      if (!formData.extra || parseFloat(formData.extra) <= 0) {
        newErrors.extra = 'Please enter a valid extra payment amount';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const payload = {
      loan: parseFloat(formData.loan),
      interest: parseFloat(formData.interest),
      tenure: parseFloat(formData.tenure),
    };

    if (formData.mode === 'target') {
      payload.target_tenure = parseFloat(formData.targetTenure);
      payload.extra = 0;
    } else {
      payload.extra = parseFloat(formData.extra);
      payload.target_tenure = 0;
    }

    onCalculate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="loan-form">
      <div className="form-group">
        <label htmlFor="loan">Loan Amount (₹)</label>
        <input
          type="number"
          id="loan"
          name="loan"
          value={formData.loan}
          onChange={handleChange}
          placeholder="e.g., 1000000"
          disabled={loading}
        />
        {errors.loan && <span className="error">{errors.loan}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="interest">Interest Rate (%)</label>
        <input
          type="number"
          id="interest"
          name="interest"
          step="0.1"
          value={formData.interest}
          onChange={handleChange}
          placeholder="e.g., 8.5"
          disabled={loading}
        />
        {errors.interest && <span className="error">{errors.interest}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="tenure">Tenure (years)</label>
        <input
          type="number"
          id="tenure"
          name="tenure"
          step="0.5"
          value={formData.tenure}
          onChange={handleChange}
          placeholder="e.g., 20"
          disabled={loading}
        />
        {errors.tenure && <span className="error">{errors.tenure}</span>}
      </div>

      <div className="form-group mode-selection">
        <label>Strategy Mode</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="mode"
              value="target"
              checked={formData.mode === 'target'}
              onChange={() => handleModeChange('target')}
              disabled={loading}
            />
            <span>Target Tenure</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="mode"
              value="extra"
              checked={formData.mode === 'extra'}
              onChange={() => handleModeChange('extra')}
              disabled={loading}
            />
            <span>Extra Monthly Payment</span>
          </label>
        </div>
      </div>

      {formData.mode === 'target' && (
        <div className="form-group conditional-input">
          <label htmlFor="targetTenure">Target Tenure (years)</label>
          <input
            type="number"
            id="targetTenure"
            name="targetTenure"
            step="0.5"
            value={formData.targetTenure}
            onChange={handleChange}
            placeholder="e.g., 10"
            disabled={loading}
          />
          {errors.targetTenure && <span className="error">{errors.targetTenure}</span>}
        </div>
      )}

      {formData.mode === 'extra' && (
        <div className="form-group conditional-input">
          <label htmlFor="extra">Extra Monthly Payment (₹)</label>
          <input
            type="number"
            id="extra"
            name="extra"
            value={formData.extra}
            onChange={handleChange}
            placeholder="e.g., 5000"
            disabled={loading}
          />
          {errors.extra && <span className="error">{errors.extra}</span>}
        </div>
      )}

      <button type="submit" className="calculate-btn" disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate'}
      </button>
    </form>
  );
};

export default LoanForm;

 
