import { MongoClient } from 'mongodb';

import { Db } from '../interfaces';
import { throwError } from '../helpers/info';

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME,
} = process.env;

export let db: Db;

export const connectToDB = (initServer: Function): Promise<void> => MongoClient.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true },
)
  .then((client) => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB!');
    db = client.db(DB_NAME);
    initServer();
  })
  .catch(throwError);
