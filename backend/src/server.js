import 'dotenv/config';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173' } });
io.on('connection', socket => {
  socket.on('project:join', projectId => socket.join(`project:${projectId}`));
  socket.on('project:leave', projectId => socket.leave(`project:${projectId}`));
});

const port = process.env.PORT || 5000;
await mongoose.connect(process.env.MONGO_URI);
server.listen(port, () => console.log(`API running on ${port}`));
export { io };
