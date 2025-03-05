import React, { useState, useEffect } from 'react';
import './App.css';
import { doRequest } from './doRequest';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0
  });
  const [filters, setFilters] = useState({
    text: '',
    type: 'all',
    category: 'all',
    dateRange: {
      start: '',
      end: ''
    }
  });
  const [uiState, setUiState] = useState({
    loading: true,
    error: null
  });

  useEffect(() => {
    fetchTransactions();
    fetchSummary();

  }, []);



  const fetchTransactions = async () => {
    try {
      setUiState(prev => ({ ...prev, loading: true }));
      const response = await doRequest(`/api/transactions`);
      setTransactions(response.data["data"]);
      setUiState(prev => ({ ...prev, error: null }));
    } catch (err) {
      setUiState(prev => ({
        ...prev,
        error: 'Failed to fetch transactions. Please try again later.'
      }));
      console.error('Error fetching transactions:', err);
    } finally {
      setUiState(prev => ({ ...prev, loading: false }));
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await doRequest('/api/transactions/summary')
      setSummary({
        totalIncome: response.data["data"]["totalIncome"],
        totalExpense: response.data["data"]["totalExpense"]
      });
    } catch (err) {
      setUiState(prev => ({
        ...prev,
        error: 'Failed to fetch summary. Please try again later.'
      }));
      console.error('Error fetching summary:', err);
    }
  };

  const updateFilter = (filterType, value) => {
    if (filterType === 'startDate' || filterType === 'endDate') {
      setFilters(prev => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          [filterType === 'startDate' ? 'start' : 'end']: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesText = transaction.description.toLowerCase().includes(filters.text.toLowerCase()) ||
      transaction.category.toLowerCase().includes(filters.text.toLowerCase());

    const matchesType = filters.type === 'all' || transaction.type.toLowerCase() === filters.type.toLowerCase();

    const matchesCategory = filters.category === 'all' || transaction.category.toLowerCase() === filters.category.toLowerCase();

    const transactionDate = new Date(transaction.date);
    const matchesDateRange = (!filters.dateRange.start || transactionDate >= new Date(filters.dateRange.start)) &&
      (!filters.dateRange.end || transactionDate <= new Date(filters.dateRange.end));

    return matchesText && matchesType && matchesCategory && matchesDateRange;
  });

  // Get unique categories for the filter dropdown
  const categories = ['all', ...new Set(transactions.map(t => t.category))];

  if (uiState.loading) {
    return <div className="loading">Loading...</div>;
  }

  if (uiState.error) {
    return <div className="error">{uiState.error}</div>;
  }

  return (
    <div className="container">
      <h1>Transaction Dashboard</h1>

      <div className="filter-section">
        <div className="filter-row">
          <input
            type="text"
            placeholder="Filter by description or category..."
            value={filters.text}
            onChange={(e) => updateFilter('text', e.target.value)}
            className="filter-input"
          />
          <select
            value={filters.type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-row">
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => updateFilter('startDate', e.target.value)}
            className="filter-date"
          />
          <span>to</span>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => updateFilter('endDate', e.target.value)}
            className="filter-date"
          />
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <h3>Total Income</h3>
          <p>${summary.totalIncome}</p>
        </div>
        <div className="summary-card">
          <h3>Total Expense</h3>
          <p>${summary.totalExpense}</p>
        </div>
        <div className="summary-card">
          <h3>Net Balance</h3>
          <p>${summary.totalIncome - summary.totalExpense}</p>
        </div>
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.type}</td>
              <td className={transaction.type === 'income' ? 'income' : 'expense'}>
                ${transaction.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
