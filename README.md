# UserTask Fullstack App

A complete CRUD application for managing Users and Tasks, built with a modern stack.

## Tech Stack

### Backend
*   **Node.js** & **Express**
*   **TypeScript**
*   **PostgreSQL** (Database)
*   **TypeORM** (ORM)

### Frontend
*   **React** (Hooks)
*   **Tailwind CSS**
*   **React Hook Form** + **Zod**

### DevOps
*   **Docker** & **Docker Compose**

## Quick Start (Docker)

The easiest way to run the entire application. **No manual configuration needed**, just run:

1.  **Start the app:**
    ```bash
    cd UserTask
    docker compose up --build
    ```

2.  **Seed the database (in a new terminal):**
    Populate the DB with initial cities and test data.
    ```bash
    docker exec -it usertask-server npm run seed
    ```

3.  **Open in browser:**
    Go to [http://localhost:3000](http://localhost:3000)

## Local Development (Without Docker)

If you want to run services locally on your machine.

### Server
1.  Navigate to `UserTask/server`.
2.  Install dependencies: `npm install`.
3.  **Configure Environment:**
    Copy the example file to `.env`:
    ```bash
    cp .env.example .env
    ```
    *If your local Postgres has a password or different user, edit `.env` now.*
4.  Run: `npm run dev`.

### Client
1.  Navigate to `UserTask/client`.
2.  Install dependencies: `npm install`.
3.  **Configure Environment:**
    Copy the example file to `.env`:
    ```bash
    cp .env.example .env
    ```
4.  Run: `npm start`.

## Features
*   **Users:** Create users linked to specific cities.
*   **Tasks:** Create tasks assigned to users with start/end times.
*   **Data Integrity:** Foreign keys and cascading deletes (handled by DB).
*   **Validation:** Robust backend and frontend validation.
