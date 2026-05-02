import { useState } from 'react';
import LoanForm from './components/LoanForm';
import Results from './components/Results';
import { calculateLoan } from './api';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await calculateLoan(formData);
      setResults(data);
    } catch (err) {
      setError('Failed to calculate loan. Please check your inputs and try again.');
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>LoanSprint 🚀</h1>
        <p className="subtitle">Finish your loan faster</p>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="input-section">
            <LoanForm onCalculate={handleCalculate} loading={loading} />
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </div>

          {results && (
            <div className="output-section">
              <Results data={results} />
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Make informed decisions about your loan prepayment strategy</p>
      </footer>
    </div>
  );
}

export default App;

// Made with Bob
