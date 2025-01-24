# School Payments and Dashboard Application

## Overview
This project is a **full-stack application** that serves as a school payment management system. It provides a **REST API** for managing transactions and a **React-based frontend** for displaying and updating transaction details. The project is built to handle tasks like checking transaction status, managing themes, providing search functionality, and receiving webhook updates.

---

## Features

### Backend
- **Fetch All Transactions**: Retrieve all transaction records with details like `collect_id`, `school_id`, `gateway`, `order_amount`, and `status`.
- **Fetch Transactions by School**: Get transaction details for a specific school using the `school_id`.
- **Transaction Status Check**: Check the current status of a transaction using the `custom_order_id`.
- **Webhook for Status Updates**: Receive real-time transaction status updates and update them in the database.
- **Manual Status Update**: Update transaction statuses manually through a dedicated API.
- **Authentication**: Secured with **JWT** using `passport-jwt`.
- **Database**: Data is stored securely in **MongoDB Atlas**.

### Frontend
- **Dashboard Pages**:
  - **Transactions Overview**: Paginated and searchable transaction list with filters for status and date range.
  - **Transaction Details by School**: Search and view transactions by `school_id`.
  - **Transaction Status Check**: Check and update transaction status in real-time.
- **Search Feature**: Search transactions by `custom_order_id`.
- **Dark and Light Modes**: Toggle between themes for a better user experience.
- **Notification System**: **React-Toastify** is used to display user notifications.
- **Status Update**: Update transaction status directly from the UI in the **Check Status** page.

---

## Tech Stack

### Backend
- **Framework**: Node.js with **Express.js**
- **Database**: MongoDB Atlas
- **Authentication**: Passport-JWT
- **Hosting**: Render
- **Deployed link**: "https://school-payment-and-dashboard-application.onrender.com"

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Material-UI
- **State Management**: Redux Toolkit
- **Notifications**: React-Toastify
- **Hosting**: vercel
- **Deployed link**: "https://school-payment-and-dashboard-application-three.vercel.app"

---

## Installation Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas connection string
- API keys and JWT secret

### Backend Setup
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=<Your MongoDB Atlas URI>
   JWT_SECRET=<Your JWT Secret>
   PORT=8000
   ```
4. Import the sample CSV data into MongoDB.
5. Start the server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Transaction APIs
1. **Fetch All Transactions**  
   `GET /api/transactions`  
   Response:
   ```json
   [
     {
       "collect_id": "12345",
       "school_id": "67890",
       "gateway": "PayPal",
       "order_amount": 1000,
       "transaction_amount": 1100,
       "status": "SUCCESS",
       "custom_order_id": "ORD123"
     }
   ]
   ```

2. **Fetch Transactions by School**  
   `GET /api/transactions/school/:school_id`

3. **Check Transaction Status**  
   `GET /api/transactions/custom-order-id/:custom_order_id`

4. **Webhook for Status Updates**  
   `POST /api/transactions/webhook/status-update`

5. **Manual Status Update**  
   `POST /api/transactions/update-status/:transaction_id`

---

## Extra Features
- **Search Feature**: Quickly search transactions by `collect_id`.
- **Dark/Light Theme**: User-selectable themes for a better visual experience.
- **React-Toastify Notifications**: User feedback and real-time notifications for actions.
- **Secure Authentication**: JWT for securing API endpoints.
- **Webhook Integration**: Automated status updates from external services.

---

## Deployment
- **Backend**: Deployed Render
- **Backend Deployed link**: "https://school-payment-and-dashboard-application.onrender.com"

- **Frontend**: Deployed on Vercel
- **Frontend Deployed link**: "https://school-payment-and-dashboard-application-three.vercel.app"

Hosted App URL: https://school-payment-and-dashboard-application-three.vercel.app
