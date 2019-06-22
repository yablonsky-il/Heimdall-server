import express from 'express';

import { db } from '../../connect-to-db';

export const router = express.Router();
const mainParam = 'interest-rate';

/* get all documents from collection */
router.get(`/${mainParam}`, (req, res) => {
  db.collection('interest_rate')
    .find()
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/*
* get document by :date
* example date: 10-06-2019
*/
router.get(`/${mainParam}/date/:date`, (req, res) => {
  const { date } = req.params;
  const [day, month, year] = date.split('-');

  db.collection('interest_rate')
    .find({ date: { day, month, year } })
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/*
* get data from all documents by :param from objs of array
* param:   id   | country           | rate
* example: id=1 | country=Аргентина | rate=69.24
*/
router.get(`/${mainParam}/:param`, (req, res) => {
  const { param } = req.params;
  const [key, value] = param.split('=');

  db.collection('interest_rate')
    .distinct('interestRate')
    .then(data => data.filter(obj => obj[key] === value || obj[key] === Number(value)))
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});
