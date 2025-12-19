# UserTask Fullstack App

A complete CRUD application for managing Users and Tasks, built with a modern stack.

## Tech Stack

### Backend

- **Node.js** & **Express**
- **TypeScript**
- **PostgreSQL** (Database)
- **TypeORM** (ORM)

### Frontend

- **React** (Hooks)
- **Mantine** (UI)
- **TanStack Query** (server-state)
- **React Hook Form** + **Zod**
- **Vite** (build tool)

### DevOps

- **Docker** & **Docker Compose**

## Quick Start (Docker)

The easiest way to run the entire application. **No manual configuration needed**, just run:

1.  **Start the app:**

    ```bash
    cd UserTask
    # provide JWT secret (do not commit secrets)
    export JWT_SECRET="change_me_locally_please"
    docker compose up --build
    ```

    Alternatively, load env variables from `UserTask/env.example`:

    ```bash
    cd UserTask
    set -a; source env.example; set +a
    docker compose up --build
    ```

2.  **Seed the database (in a new terminal):**
    Populate the DB with initial cities and test data.

    ```bash
    docker exec -it usertask-server npm run seed
    ```

3.  **Open in browser:**
    Go to [http://localhost:3000](http://localhost:3000)

## One-command Local Dev (Server + Client)

From the repository root:

```bash
cd /Users/aleksandrpaleev/Documents/pet_projects/UserTask-fullstack
npm install
npm run dev
```

Environment variables (optional overrides):

```bash
JWT_SECRET="change_me_locally_please" \
VITE_API_URL="http://localhost:5001" \
CORS_ORIGIN="http://localhost:3000" \
npm run dev
```

## Local Development (Without Docker)

If you want to run services locally on your machine.

### Server

1.  Navigate to `UserTask/server`.
2.  Install dependencies: `npm install`.
3.  **Configure Environment:**
    Export required variables (example):
    ```bash
    export JWT_SECRET="change_me_locally_please"
    export CORS_ORIGIN="http://localhost:3000"
    export POSTGRES_HOST="localhost"
    export POSTGRES_PORT="5432"
    export POSTGRES_USER="postgres"
    export POSTGRES_PASSWORD="postgres"
    export POSTGRES_DB="usertask"
    ```
4.  Run: `npm run dev`.

### Client

1.  Navigate to `UserTask/client`.
2.  Install dependencies: `npm install`.
3.  **Configure Environment:**
    Create `.env` if needed and set API base URL:
    ```bash
    VITE_API_URL=http://localhost:5001
    ```
4.  Run: `npm run dev`.

## Features

- **Users:** Create users linked to specific cities.
- **Tasks:** Create tasks assigned to users with start/end times.
- **Data Integrity:** Foreign keys and cascading deletes (handled by DB).
- **Validation:** Robust backend and frontend validation.
