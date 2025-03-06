import { useState, useMemo } from 'react';

export const useTransactionFilters = (transactions) => {
  const [filters, setFilters] = useState({
    text: '',
    type: 'all',
    category: 'all',
    dateRange: {
      start: '',
      end: ''
    }
  });

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

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesText = transaction.description.toLowerCase().includes(filters.text.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(filters.text.toLowerCase());
      
      const matchesType = filters.type === 'all' || transaction.type.toLowerCase() === filters.type.toLowerCase();
      
      const matchesCategory = filters.category === 'all' || transaction.category.toLowerCase() === filters.category.toLowerCase();
      
      const transactionDate = new Date(transaction.date);
      const matchesDateRange = (!filters.dateRange.start || transactionDate >= new Date(filters.dateRange.start)) &&
                             (!filters.dateRange.end || transactionDate <= new Date(filters.dateRange.end));

      return matchesText && matchesType && matchesCategory && matchesDateRange;
    });
  }, [transactions, filters]);

  const categories = useMemo(() => {
    return ['all', ...new Set(transactions.map(t => t.category))];
  }, [transactions]);

  return {
    filters,
    updateFilter,
    filteredTransactions,
    categories
  };
}; 