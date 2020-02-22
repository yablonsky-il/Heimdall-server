import express from 'express';
import * as R from 'ramda';

import { db } from '../../services/connect-to-db';
import { API_PARAM } from '../../constants';

export const router = express.Router();
const indicator = 'currency';

/* get all documents from collection */
router.get(`/${API_PARAM}/${indicator}`, (req, res) => {
  db.collection('currency')
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
  const [day, month, year] = date.split('-');

  db.collection('currency')
    .find({ date: { day, month, year } })
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/* get data from all documents by :country key */
router.get(`/${API_PARAM}/${indicator}/:currency_type`, (req, res) => {
  const { currency_type: currencyType } = req.params;
  const query = `currencies.${currencyType}`;

  db.collection('currency')
    .distinct(query)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/*
* get data by :country key from all documents -> by :param from objs of array
* param:   id   | currency        | value
* example: id=0 | currency=EURUSD | value=1.12297
*/
router.get(`/${API_PARAM}/${indicator}/:currency_type/:param`, (req, res) => {
  const { currency_type: currencyType, param } = req.params;
  const query = `currencies.${currencyType}`;
  const [key, value] = param.split('=');

  if (R.isNil(value)) return res.status(200).json([]);

  db.collection('currency')
    .distinct(query)
    .then(data => data.filter(obj => obj[key] === value || obj[key] === Number(value)))
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});
