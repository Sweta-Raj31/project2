# Interview Guide

1. **Why MERN?** One language across frontend and backend reduces context switching; MongoDB fits document-like data.
2. **Why Node.js?** Event-driven I/O is useful for APIs and real-time connections.
3. **Why Express?** It provides routing and middleware around Node's HTTP server.
4. **What is middleware?** A function that runs during the request pipeline before the final route handler.
5. **Authentication vs authorization?** Authentication identifies the user; authorization decides what that user can access.
6. **Why JWT?** A signed token lets a stateless API verify identity on each request.
7. **Why bcrypt?** Passwords should not be stored as plaintext; bcrypt is a slow password hashing function.
8. **Why Socket.IO?** It provides bidirectional real-time communication and rooms.
9. **Why REST and Socket.IO together?** REST persists/query data; sockets notify connected clients quickly.
10. **Why rooms?** A project room limits an event to users interested in that project.
11. **Why indexes?** They reduce work for recurring query patterns, at the cost of storage and write overhead.
12. **Why pagination?** It bounds response size and database work per request.
13. **What is object-level authorization?** Checking that this particular user is allowed to access this particular project/task.
14. **What happens if Socket.IO disconnects?** Durable data remains in MongoDB; the client can reconnect and reload state with REST.
15. **How would you scale sockets?** Run multiple API instances and use the Socket.IO Redis adapter so events cross server boundaries.
16. **Why MongoDB?** Flexible documents and straightforward references suit this project; indexes support its read patterns.
17. **What is Docker?** A way to package/run software with a predictable environment. Compose orchestrates multiple containers.
18. **How would you add notifications?** Write notification records and move email/push delivery to a queue worker.
19. **How would you improve search?** Start with indexed fields; for complex full-text search use MongoDB search capabilities or a dedicated search service.
20. **Explain the project in 30 seconds.** “CollabBoard is a MERN team collaboration system. Users authenticate with JWT, access projects through membership authorization, create and update tasks through REST APIs, and receive successful changes through Socket.IO project rooms. MongoDB is indexed and paginated for efficient reads, while Docker Compose provides the local environment.”
