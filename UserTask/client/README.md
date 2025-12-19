# UserTask Client

Modern React frontend for the UserTask application.

## Tech Stack

- **React** (Functional Components + Hooks)
- **Mantine** (UI)
- **TanStack Query** (server-state)
- **React Hook Form** + **Zod** (Form handling & Validation)
- **Axios** (API requests)
- **Vite** (Build tool)

## Prerequisites

- Node.js (v20+ recommended for Vite 7)
- Backend server running on port 5001

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Environment Setup:**
    The application uses `.env` file for configuration.

    Ensure `VITE_API_URL` is set in `.env` (default fallback is `http://localhost:5001`).

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The app will run at [http://localhost:3000](http://localhost:3000).

## Features

- **User Management:** Create, view users with city selection.
- **Task Management:** Create, view, delete tasks assigned to users.
- **Real-time Updates:** Lists update automatically after actions.
- **Responsive Design:** Works on desktop and mobile.
