# UserTask Client

Modern React frontend for the UserTask application.

## Tech Stack

*   **React** (Functional Components + Hooks)
*   **Tailwind CSS** (Styling)
*   **React Hook Form** + **Zod** (Form handling & Validation)
*   **Lucide React** (Icons)
*   **Axios** (API requests)

## Prerequisites

*   Node.js (v18+)
*   Backend server running on port 5001

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    The application uses `.env` file for configuration.
    
    Ensure `REACT_APP_API_URL` is set in `.env` (default is `http://localhost:5001`).

3.  **Start the development server:**
    ```bash
    # For Node 17+ (openssl legacy provider required for this webpack version)
    export NODE_OPTIONS=--openssl-legacy-provider
    npm start
    ```

    Or simply:
    ```bash
    npm start
    ```
    *(If you are using an older Node version)*

The app will run at [http://localhost:3000](http://localhost:3000).

## Features

*   **User Management:** Create, view users with city selection.
*   **Task Management:** Create, view, delete tasks assigned to users.
*   **Real-time Updates:** Lists update automatically after actions.
*   **Responsive Design:** Works on desktop and mobile.
