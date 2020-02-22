import express from 'express';

import { db } from '../../services/connect-to-db';
import { API_PARAM } from '../../constants';

export const router = express.Router();

router.get(`/${API_PARAM}/messenger/get-all-users`, (req, res) => {
  db.collection('users')
    .find()
    .toArray()
    .then(data => data.map(({ name, surname }) => ({ name, surname })))
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});
