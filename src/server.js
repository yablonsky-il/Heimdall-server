/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';

import { connectToDB } from './connect-to-db';
// import { allRequests } from './parser/all-requests';
import { router } from './routes/index';
import { jobs } from './parser/index';

const app = express();
const port = process.env.PORT || 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(`${__dirname}/public`));
app.use(router);

// app.get('/all', (req, res) => {
//   allRequests.map((request => request()));
//   res.status(200).send('OK');
// });

app.get('*', (req, res) => res.status(404).send('Page is not found'));

connectToDB(() => {
  app.listen(port, () => console.log(`Server is listening on ${port} port`));
});

jobs.forEach(job => job.start());
