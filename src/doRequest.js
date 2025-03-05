const isStandalone = process.env.REACT_APP_STANDALONE === 'true';
const isDevelopment = process.env.NODE_ENV === 'development';
const apiUrl = process.env.REACT_APP_API_URL;

export const doRequest = async (endpoint, options = {}) => {

  // If in development and standalone mode, use local data
  if (isDevelopment && isStandalone) {
    try {
      const response = await fetch('/sample-data.json');
      const data = await response.json();
      // Map endpoints to their corresponding data
      const endpointMap = {
        '/api/transactions': data.transactions,
        '/api/transactions/summary': data.summary
      };


      // Return the data for the requested endpoint
      return {
        data: endpointMap[endpoint] || {},
        status: 200
      };
    } catch (error) {
      console.error('Error loading local data:', error);
      throw new Error('Failed to load local data');
    }
  }

  // Otherwise, make the actual API call
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      data,
      status: response.status
    };
  } catch (error) {
    console.error(`Error making API request to ${endpoint}:`, error);
    throw error;
  }
};
