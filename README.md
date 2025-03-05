# Finance Tracker Application

A React-based financial transaction tracking application that allows users to view, filter, and analyze their income and expenses.

## Features

- Transaction dashboard with summary statistics
- Filter transactions by:
  - Text search (description/category)
  - Transaction type (income/expense)
  - Category
  - Date range
- Real-time calculations of:
  - Total Income
  - Total Expenses
  - Net Balance
- Responsive design
- Standalone mode for development/testing

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend API (optional, for production use)

## Project Structure

```
finance-tracker-ui/
├── public/
│   ├── sample-data.json    # Sample data for standalone mode
│   └── index.html
├── src/
│   ├── App.js              # Main application component
│   ├── doRequest.js        # API request handler
│   └── App.css             # Styles
├── .env                    # Production environment variables
├── .env.development        # Development environment variables
└── package.json
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:arun143420/finance-tracker-ui.git
   cd finance-tracker-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - For development with backend:
     ```bash
     # .env.development
     REACT_APP_API_URL=http://localhost:4000
     REACT_APP_STANDALONE=false
     ```
   - For development without backend (standalone mode):
     ```bash
     # .env.development
     REACT_APP_API_URL=http://localhost:4000
     REACT_APP_STANDALONE=true
     ```

4. Start the development server:
   ```bash
   npm start
   ```

## Backend Setup

The application can be used with or without a backend. Here's how to set up the backend:

1. Navigate to the backend directory:
   ```bash
   cd ../finance-tracker-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

The backend should be running on `http://localhost:4000` by default.

## Testing Modes

### 1. Standalone Mode (Development)

This mode uses local data from `public/transactions.json` for testing and development:

1. Set `REACT_APP_STANDALONE=true` in `.env.development`
2. Ensure `public/transactions.json` contains valid sample data
3. Start the application:
   ```bash
   npm start
   ```

The application will load data from the local JSON file instead of making API calls.

### 2. Backend Mode (Production)

This mode connects to the actual backend API:

1. Set `REACT_APP_STANDALONE=false` in `.env`
2. Ensure the backend server is running
3. Start the application:
   ```bash
   npm start
   ```

The application will make API calls to fetch real data.

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| REACT_APP_API_URL | Backend API URL | Yes | http://localhost:4000 |
| REACT_APP_STANDALONE | Enable standalone mode | No | false |

## Sample Data Structure

For standalone mode, ensure your `public/transactions.json` follows this structure:

```json
{
  "transactions": {
    "data": [
      {
        "id": 1,
        "date": "2024-03-01",
        "description": "Salary",
        "category": "Employment",
        "type": "income",
        "amount": 5000.00
      }
    ]
  },
  "summary": {
    "data": {
      "totalIncome": 5000.00,
      "totalExpense": 166.49
    }
  }
}
```

## Troubleshooting

1. **Environment Variables Not Loading**
   - Ensure all environment variables are prefixed with `REACT_APP_`
   - Restart the development server after modifying environment files
   - Check the console for environment variable values

2. **API Connection Issues**
   - Verify the backend server is running
   - Check the API URL in environment variables
   - Ensure CORS is properly configured on the backend

3. **Standalone Mode Issues**
   - Verify `transactions.json` exists in the public folder
   - Check JSON structure matches the expected format
   - Ensure `REACT_APP_STANDALONE=true` is set

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
