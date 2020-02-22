import http from 'http';
import express from 'express';
import socket from 'socket.io';

import { WsClientConnection } from './services/ws';
import { connectToDB } from './services/connect-to-db';
import { jobs } from './parser/index';
import { router as middlewares } from './middlewares';

const app = express();
const port = process.env.PORT || 3005;
const server = http.createServer(app);
const socketIo = socket(server);

socketIo.on('connection', WsClientConnection);

app.use(middlewares);

app.get('*', (req, res) => res.status(404).send('Page is not found'));

connectToDB(() => {
  // eslint-disable-next-line no-console
  server.listen(port, (): void => console.log(`Server is listening on ${port} port`));
});

jobs.forEach(job => job.start());
