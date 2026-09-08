# LLD — CollabBoard

## Models
User: name, email, password hash, role.
Project: name, description, owner, members.
Task: project, title, description, status, priority, assignee, createdBy.
Comment: project, task, author, text.
Notification: user, message, read, project.

## API contracts
POST `/api/v1/auth/login` -> `{email,password}` -> `{token,user}`.
POST `/api/v1/projects` -> `{name,description}`.
GET `/api/v1/projects` -> project list.
GET `/api/v1/tasks?project=<id>&page=1&limit=20` -> paginated tasks.
POST `/api/v1/tasks` -> task fields.
PATCH `/api/v1/tasks/:id` -> changed task fields.
GET/POST `/api/v1/comments` -> comments.
GET/PATCH `/api/v1/notifications` -> notifications.

## Middleware order
CORS/security headers -> JSON parser -> rate limiter -> router -> auth middleware -> route authorization -> database operation -> response/error middleware.

## Important authorization rule
A user may only read/write a task when they belong to its project. This is object-level authorization and is more important than merely checking that a JWT exists.

## Event names
`project:join`, `project:leave`, `task:created`, `task:updated`, `comment:created`.

## Performance
Task index: `{project:1,status:1,createdAt:-1}`. Comment index: `{task:1,createdAt:-1}`. Notification index: `{user:1,read:1,createdAt:-1}`. Paginate task results and use lean reads.

## Failure cases
Expired JWT -> 401. Wrong project membership -> 403. Missing task -> 404. Duplicate email -> 409. Database error -> generic 500 response. Socket disconnect -> client can reconnect and reload durable state through REST.
