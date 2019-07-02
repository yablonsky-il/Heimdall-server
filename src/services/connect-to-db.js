/* eslint-disable no-console */
import { MongoClient } from 'mongodb';

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME,
} = process.env;

// eslint-disable-next-line import/no-mutable-exports
export let db;

export const connectToDB = initServer => MongoClient.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true },
)
  .then(client => {
    console.log('Connected to MongoDB!');
    db = client.db(DB_NAME);
    initServer();
  })
  .catch(err => {
    console.log(err);
  });
