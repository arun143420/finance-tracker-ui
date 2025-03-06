import React from 'react';
import { useTransactions } from './hooks/useTransactions';
import { useTransactionSummary } from './hooks/useTransactionSummary';
import { useTransactionFilters } from './hooks/useTransactionFilters';
import './App.css';
import { useEnvironment } from './hooks/useEnvironment';

function App() {
  const { transactions, loading: transactionsLoading, error: transactionsError } = useTransactions();
  const { summary, loading: summaryLoading, error: summaryError } = useTransactionSummary();
  const { filters, updateFilter, filteredTransactions, categories } = useTransactionFilters(transactions);
  const { showIndicator, isStandalone, envFile } = useEnvironment();


  if (transactionsLoading || summaryLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (transactionsError || summaryError) {
    return <div className="error">{transactionsError || summaryError}</div>;
  }

  return (
    <div className="container">
      {showIndicator && (
        <div className="env-indicator">
          <span className="env-label">Environment:</span>
          <span className={`env-value ${isStandalone ? 'standalone' : 'api'}`}>
            {isStandalone ? 'Standalone Mode' : 'API Mode'}
          </span>
          <span className="env-file">({envFile})</span>
        </div>
      )}
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