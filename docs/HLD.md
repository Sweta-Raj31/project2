# HLD — CollabBoard

## Actors
User -> React web app -> REST API and Socket.IO -> MongoDB.

## Components
1. React/Vite client: UI and local state.
2. Express API: authentication, authorization and business operations.
3. MongoDB: durable source of truth.
4. Socket.IO: live event delivery.
5. Redis (future): cross-instance event propagation.

## Core flows
### Login
React -> POST /auth/login -> bcrypt verification -> JWT -> browser stores token.

### Read tasks
React -> GET /tasks?project=id -> JWT -> membership check -> indexed MongoDB query -> JSON.

### Update task
React -> PATCH /tasks/id -> auth -> membership -> MongoDB -> Socket.IO project room -> connected clients.

## Scaling path
Single instance -> multiple API instances behind load balancer -> Redis adapter for Socket.IO -> MongoDB replica set -> cache frequently read data -> queue background notifications/audit jobs.

## NFRs
Security: JWT, bcrypt, Helmet, CORS, rate limits, object-level authorization.
Performance: indexes, pagination, projections/lean reads.
Availability: stateless API instances and persistent MongoDB volume in local development.
