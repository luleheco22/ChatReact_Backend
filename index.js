import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('sendMessage', (message) => {
    io.emit('messageReceived', message);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
