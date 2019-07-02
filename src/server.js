import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import socket from 'socket.io';
import cookieParser from 'cookie-parser';

import { WsClientConnection } from './services/ws';
import { connectToDB } from './services/connect-to-db';
import { router } from './routes/index';
import { jobs } from './parser/index';

const app = express();
const port = process.env.PORT || 3005;
const server = http.createServer(app);
const io = socket(server);

io.on('connection', WsClientConnection);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(`${__dirname}/public`));
app.use(router);

app.get('*', (req, res) => res.status(404).send('Page is not found'));

connectToDB(() => {
  server.listen(port, () => console.log(`Server is listening on ${port} port`));
});

jobs.forEach(job => job.start());
