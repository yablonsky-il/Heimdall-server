/* eslint-disable no-console */
import { MongoClient } from 'mongodb';

// eslint-disable-next-line import/no-mutable-exports
export let db;

export const connectToDB = initServer => MongoClient.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { useNewUrlParser: true },
)
  .then(client => {
    console.log('Connected to MongoDB!');
    db = client.db(process.env.DB_NAME);
    initServer();
  })
  .catch(err => {
    console.log(err);
  });
