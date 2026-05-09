# E-Commerce Platform

This is an e-commerce platform with a backend API (Node.js/Express) and a frontend application (React/Vite).

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have Node.js and npm installed.

### 1. Install Dependencies

You'll need to install the dependencies for both the frontend and the backend.

Open your terminal and run the following commands:

**For the Backend:**
```bash
cd backend
npm install
```

**For the Frontend:**
```bash
cd frontend
npm install
```

### 2. Seed the Database

Before starting the backend server, you should seed the database with initial data.

**From the `backend` directory**, run:
```bash
npm run seed
```

### 3. Run the Development Servers

You need to run the development server for both the frontend and backend simultaneously. It's recommended to open two separate terminal windows or tabs.

**Run Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Run Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

The application should now be running. The frontend Vite server usually runs on `http://localhost:5173/`, and the backend server on `http://localhost:5000/` (or whichever port is defined in your backend configuration/`.env` file).
