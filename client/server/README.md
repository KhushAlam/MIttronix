# Mock API Server

This is a mock backend server that provides API endpoints for the frontend application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run server:install
   ```

2. **Start the server:**
   ```bash
   npm run server
   ```

The server will run on `http://localhost:3000` and provide the following endpoints:

## Available API Endpoints

### Health Check
- `GET /api/` - Server status

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/this-month` - Get orders from this month
- `GET /api/orders/last-month` - Get orders from last month
- `GET /api/orders/this-year` - Get orders from this year
- `GET /api/orders/by-month?year=2024&month=1` - Get orders by month
- `POST /api/orders` - Create new order

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product

### Categories
- `GET /api/category` - Get all categories

## Running Both Frontend and Backend

To run the complete application:

1. **Terminal 1 - Start Backend:**
   ```bash
   npm run server
   ```

2. **Terminal 2 - Start Frontend:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and will proxy API calls to the backend at `http://localhost:3000`.

## Mock Data

The server includes sample data for:
- 3 sample orders with different statuses
- 2 sample products  
- 3 sample categories

This data is sufficient to test the dashboard functionality and resolve the 500 errors.
