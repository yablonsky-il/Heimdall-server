/* eslint-disable consistent-return */
import express from 'express';
import * as R from 'ramda';

import { db } from '../../services/connect-to-db';
import { API_PARAM } from '../../constants';

export const router = express.Router();
const indicator = 'interest-rate';

/* get all documents from collection */
router.get(`/${API_PARAM}/${indicator}`, (req, res) => {
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
router.get(`/${API_PARAM}/${indicator}/date/:date`, (req, res) => {
  const { date } = req.params;
  const [, month, year] = date.split('-');

  db.collection('interest_rate')
    .find({
      'date.month': month,
      'date.year': year,
    })
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/*
* get data from all documents by :param from objs of array
* param:   id   | country           | rate
* example: id=1 | country=Аргентина | rate=69.24
*/
router.get(`/${API_PARAM}/${indicator}/:param`, (req, res) => {
  const { param } = req.params;
  const [key, value] = param.split('=');

  if (R.isNil(value)) return res.status(200).json([]);

  db.collection('interest_rate')
    .distinct('interestRate')
    .then(data => data.filter(obj => obj[key] === value || obj[key] === Number(value)))
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});
