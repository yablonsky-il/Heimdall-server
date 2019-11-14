/* eslint-disable no-console */
import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as socket from 'socket.io';
import * as helmet from 'helmet';
import * as compression from 'compression';

import { WsClientConnection } from './services/ws';
import { connectToDB } from './services/connect-to-db';
import { router } from './routes/index';
import { jobs } from './parser/index';

const app = express();
const port = process.env.PORT || 3005;
const server = http.createServer(app);
const io = socket(server);

io.on('connection', WsClientConnection);

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(`${__dirname}/public`));
app.use(router);

app.get('*', (req, res) => res.status(404).send('Page is not found'));

connectToDB(() => {
  server.listen(port, (): void => console.log(`Server is listening on ${port} port`));
});

jobs.forEach(job => job.start());
