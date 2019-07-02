import express from 'express';
import * as R from 'ramda';

import { db } from '../../services/connect-to-db';

export const router = express.Router();
const mainParam = 'stocks';

/* get all documents from collection */
router.get(`/${mainParam}`, (req, res) => {
  db.collection('stocks')
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

  db.collection('stocks')
    .find({ date: { day, month, year } })
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/* get data from all documents by :country */
router.get(`/${mainParam}/country/:country`, (req, res) => {
  const { country } = req.params;
  const query = `stocks.${country}`;

  db.collection('stocks')
    .distinct(query)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/*
* get data by :country key from all documents -> by :param from objs of array
* param:   id   | stock        | value
* example: id=0 | stock=CAC 40 | value=5,365
*/
router.get(`/${mainParam}/country/:country/:param`, (req, res) => {
  const { country, param } = req.params;
  const query = `stocks.${country}`;
  const [key, value] = param.split('=');

  if (R.isNil(value)) return res.status(200).json(data);

  db.collection('stocks')
    .distinct(query)
    .then(data => data.filter(obj => obj[key] === value || obj[key] === Number(value)))
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});
