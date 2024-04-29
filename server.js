import express from 'express';
import next from 'next'
import http from 'http'
import {Server} from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000', // Replace with your production URL
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for new orders
    socket.on('newOrder', (order) => {
      console.log('New order received:', order);
      io.emit('orderUpdate', order);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});