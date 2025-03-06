import { useState, useEffect } from 'react';
import { doRequest } from '../doRequest';

export const useTransactionSummary = (transactions) => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await doRequest('/api/transactions/summary');
      setSummary({
        totalIncome: response.data["data"]["totalIncome"],
        totalExpense: response.data["data"]["totalExpense"]
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch summary. Please try again later.');
      console.error('Error fetching summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary
  };
}; 