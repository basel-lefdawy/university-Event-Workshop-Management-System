# University Event & Workshop Management System (UniEvents)

Full-stack campus event platform: React + Vite frontend, Node.js + Express API, MySQL via Docker, Prisma ORM, and JWT authentication.

## Project structure

```
├── src/                 # React frontend (existing UI)
├── backend/             # Express API + Prisma
│   ├── prisma/          # Schema, migrations, seed
│   └── src/             # Routes, controllers, services, middleware
├── docker-compose.yml   # MySQL + backend containers
└── .env.example         # Environment variable templates
```

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for MySQL)
- npm

## Project setup

### 1. Clone and install dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 2. Environment variables

Copy the example files and adjust if needed:

```bash
cp .env.example .env
cd backend
npm run env:setup   # creates backend/.env from .env.example if missing
cd ..
```

Or manually: `cp backend/.env.example backend/.env`

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Frontend API base (default `http://localhost:3001/api`) |
| `DB_PASSWORD` | MySQL root password |
| `DB_NAME` | Database name (`event_management`) |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Default admin seeded on startup |

## Docker setup

### Start MySQL (and optional full stack)

**MySQL only** (recommended for local frontend + backend dev):

```bash
docker compose up mysql -d
```

**MySQL + backend API** (production-like):

```bash
docker compose up --build -d
```

### Stop containers

```bash
docker compose down
```

### Stop and remove database volume (reset data)

```bash
docker compose down -v
```

### Useful Docker commands

| Command | Purpose |
|---------|---------|
| `docker compose ps` | List running services |
| `docker compose logs mysql` | MySQL logs |
| `docker compose logs backend` | API logs |
| `docker compose restart backend` | Restart API after env changes |

## Running MySQL container

The `mysql` service:

- Image: `mysql:8.0`
- Port: `3306` (host)
- Persistent volume: `mysql_data`
- Health check: `mysqladmin ping`
- Restart policy: `unless-stopped`

Backend connects using the Docker service hostname **`mysql`** (not `localhost`) when running inside Compose.

## Running the backend

### With Docker Compose (API + MySQL)

```bash
docker compose up --build
```

API: [http://localhost:3001/api/health](http://localhost:3001/api/health)

### Locally (MySQL in Docker)

```bash
# Start MySQL first
docker compose up mysql -d

cd backend
npm run env:setup       # ensure backend/.env exists (first time only)
npm run prisma:deploy   # generate client + apply migrations
npm run prisma:seed     # seed events
npm run dev             # start API with hot reload
```

## Prisma migration commands

Run from `backend/`:

```bash
# Generate Prisma client
npm run prisma:generate

# Create migration (development)
npm run prisma:migrate

# Apply migrations (production / Docker)
npm run prisma:deploy

# Seed sample events
npm run prisma:seed

# Full DB setup
npm run db:setup
```

## Running the frontend

```bash
# From project root (ensure backend is running)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Default admin credentials

Created automatically on server startup if the account does not exist:

| Field | Value |
|-------|-------|
| Email | `admin@university.com` |
| Password | `Admin123!` |

Use these on the login page to access `/admin`.

## API endpoints

Base URL: `http://localhost:3001/api`

### Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | No | Service health check |

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Student registration `{ name, email, password }` |
| POST | `/auth/login` | No | Login `{ email, password }` → `{ user, token }` |
| GET | `/auth/me` | Bearer | Current user profile |

### Events

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/events` | No | List all events |
| GET | `/events/:id` | No | Event details |

### Registrations (student)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/registrations/me` | Student/Admin | My registrations |
| GET | `/registrations/event/:eventId` | Student/Admin | My registration for event |
| POST | `/registrations` | Student | Register `{ eventId }` |
| DELETE | `/registrations/:id` | Student/Admin | Cancel registration |

### Registrations (admin)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/registrations/admin/all` | Admin | All registrations |
| GET | `/registrations/admin/stats` | Admin | Dashboard stats |
| PATCH | `/registrations/:id/status` | Admin | `{ status: "ACCEPTED" \| "REJECTED" \| "PENDING" }` |

### Users (admin)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users` | Admin | List users with registration counts |
| DELETE | `/users/:id` | Admin | Delete user (cascades registrations) |

## Troubleshooting

### Docker / MySQL

| Issue | Fix |
|-------|-----|
| `Environment variable not found: DATABASE_URL` | Run `cd backend && npm run env:setup` to create `backend/.env` from the example file. |
| `@prisma/client did not initialize yet` | Run `cd backend && npm run prisma:generate` (included automatically in `prisma:deploy` and `prisma:seed`). |
| `Can't connect to MySQL server` | Wait for health check: `docker compose ps`. Ensure port 3306 is free. |
| `Access denied for user 'root'` | Match `DB_PASSWORD` in `.env`, `backend/.env`, and `docker-compose.yml`. |
| Migrations fail on first start | Run `docker compose logs mysql` and retry `npm run prisma:deploy` in `backend/`. |
| Reset database | `docker compose down -v` then `docker compose up mysql -d` and re-run migrations + seed. |
| Backend can't reach DB in Docker | Use host `mysql` in `DATABASE_URL`, not `localhost`. |
| Backend on host can't reach DB | Use `localhost:3306` in `backend/.env`. |

### Frontend / API

| Issue | Fix |
|-------|-----|
| CORS errors | Set `CORS_ORIGIN=http://localhost:5173` in backend env. |
| 401 on protected routes | Log in again; token stored in `localStorage` under `unievents_auth_token`. |
| Events empty | Run `npm run prisma:seed` in `backend/`. |

## Features implemented

- Student registration & JWT login with persistent session
- Default admin account on startup
- Event catalog from database (seeded from original mock data)
- Student event registration (pending → admin accept/reject)
- My Registrations page with status and cancel
- Admin dashboard: users table, delete with confirmation, registration approvals
- Toast notifications and loading states
- Dockerized MySQL with persistent volume and health checks

## License

MIT (adjust as needed for your institution).
