# CollabBoard

A resume-ready MERN real-time team collaboration platform.

## What it solves
Teams can create projects and tasks, assign work, comment, and see task changes live without refreshing the browser.

## Stack
React + Vite, Node.js + Express, MongoDB + Mongoose, Socket.IO, JWT, bcrypt, Zod, Docker Compose.

## Architecture
Browser -> REST API / Socket.IO -> Express middleware -> routes/services -> MongoDB

A task update is saved first, then the API emits `task:updated` to the project room. Other connected browsers update immediately.

## Run
1. Copy `backend/.env.example` to `backend/.env`.
2. `docker compose up --build`
3. Open http://localhost:5173

Without Docker, start MongoDB locally, then run `npm install && npm run dev` in `backend` and `npm install && npm run dev` in `frontend`.

## Study order
1. `docs/LEARNING_GUIDE.md`
2. `docs/HLD.md`
3. `docs/LLD.md`
4. backend `server.js`, `app.js`, middleware, models, routes
5. frontend `main.jsx`, `api.js`
6. `docs/INTERVIEW.md`

## Resume points
- MERN collaboration platform with real-time Socket.IO events.
- JWT authentication and project-level authorization.
- MongoDB indexes, pagination and lean queries.
- Room-based live updates with a documented Redis scaling path.
- Dockerized frontend, API and MongoDB.
