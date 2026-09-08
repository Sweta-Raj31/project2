# CollabBoard Learning Guide

## 1. First understand the problem
Imagine a team using a physical board. Everyone writes tasks on sticky notes. In a normal web app, one person changes a note and everyone else must refresh to see it. CollabBoard fixes that by sending the change to connected browsers immediately.

## 2. MERN in simple words
- MongoDB = company record room/database.
- Express = receptionist that receives HTTP requests.
- Node.js = runtime that executes backend JavaScript.
- React = screen the user interacts with.

## 3. REST vs real-time
REST is request/response: browser asks `GET /tasks`, server answers.
Socket.IO is a live phone line: once connected, the server can push an event such as `task:updated` without waiting for another request.

## 4. Middleware
Middleware is a checkpoint between request and route. Authentication middleware checks the JWT before protected code runs. Helmet adds security headers; CORS controls browser origins; rate limiting slows abusive traffic.

## 5. Authentication vs authorization
Authentication asks: who are you? JWT is a signed ID badge. Authorization asks: are you allowed to access this project? CollabBoard checks project membership before task operations.

## 6. MongoDB/Mongoose
MongoDB stores JSON-like documents. Mongoose gives schemas, validation and query helpers. A Project stores its owner and members; a Task points to its Project and optional assignee; a Comment points to a Task.

## 7. Indexes
An index is like the index in a book. Instead of scanning every task, MongoDB can use `{project,status,createdAt}` to find the relevant tasks faster. Indexes consume storage and make writes slightly more expensive, so create them for real query patterns.

## 8. Pagination
Returning 10,000 tasks is wasteful. Pagination returns one page, for example 20 records at a time. The API accepts `page` and `limit`.

## 9. lean()
Mongoose normally creates rich document objects. `lean()` returns plain JavaScript objects and is useful for read-heavy endpoints where document methods are not needed.

## 10. Real-time event flow
1. User clicks Move.
2. React sends `PATCH /tasks/:id`.
3. Express receives it.
4. JWT middleware identifies the user.
5. Authorization checks project membership.
6. MongoDB updates the task.
7. Server emits `task:updated` to `project:<id>`.
8. Every browser in that project room receives the event.
9. React replaces the changed task in state.

## 11. Socket rooms
A room is a named group of sockets. Each project has a room. This prevents a task update from being broadcast to unrelated projects.

## 12. Redis scaling concept
With one Node server, its memory knows connected sockets. With three Node servers, users can connect to different servers. Redis Pub/Sub or the Socket.IO Redis adapter can distribute events between instances. This repo documents that scaling path; Redis is not required for the local single-server version.

## 13. Docker
An image is a packaged template. A container is a running instance. Docker Compose starts MongoDB, backend and frontend together. The Mongo volume keeps database data when the Mongo container restarts.

## 14. HLD vs LLD
HLD is the city map: React, API, database, Socket.IO and future Redis.
LLD is the building plan: route names, models, middleware, indexes and event names.

## 15. Security basics
Never store plain passwords; bcrypt hashes them. Keep JWT secrets in environment variables. Validate input, use authorization checks, limit request size, use Helmet, configure CORS deliberately, rate-limit public APIs, and never trust a project ID just because it came from the browser.

## 16. Where to start reading code
Start at `backend/src/server.js`, then `app.js`, then `middleware/auth.js`, then models, then routes. After that read `frontend/src/api.js` and `frontend/src/main.jsx`.

## 17. Interview sentence
“I built a MERN real-time collaboration platform where REST APIs handle durable CRUD operations and Socket.IO pushes successful task changes to project rooms. MongoDB stores users, projects, tasks, comments and notifications; indexes and pagination reduce query cost; JWT and membership checks protect resources; Docker Compose runs the local stack.”
