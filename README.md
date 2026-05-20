# Task Management App

A full-stack Task Management App with JWT authentication, CRUD operations, and a responsive UI.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | NestJS + MongoDB (Mongoose) |
| Authentication | JWT (passport-jwt) |
| Frontend | React + TypeScript (Vite) |
| API Client | Axios + TanStack Query |
| Styling | Tailwind CSS |

## Project Structure

```
Morae/
├── backend/       # NestJS REST API (port 3001)
└── frontend/      # React + TypeScript app (port 5173)
```

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd backend
cp .env.example .env
# Fill in your values in .env
npm install
npm run start:dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Endpoints

### Auth
| Method | Route | Description |
|---|---|---|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and receive JWT |

### Tasks (requires Authorization header)
| Method | Route | Description |
|---|---|---|
| POST | /tasks | Create a task |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get a single task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Features

- User registration and login with JWT
- Create, edit, delete tasks
- Mark tasks as Completed / Pending
- Filter tasks by status
- Responsive UI with Tailwind CSS
