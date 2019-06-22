import express from 'express';

import { db } from '../../connect-to-db';

export const router = express.Router();
const mainParam = 'government-debt-to-GDP';

/* get all documents from collection */
router.get(`/${mainParam}`, (req, res) => {
  db.collection('government_debt_to_GDP')
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

  db.collection('government_debt_to_GDP')
    .find({ date: { day, month, year } })
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/*
* get data from all documents by :param from objs of array
* param:   id   | country      | value
* example: id=0 | country=Португалия | rank=121.50
*/
router.get(`/${mainParam}/:param`, (req, res) => {
  const { param } = req.params;
  const [key, value] = param.split('=');

  db.collection('government_debt_to_GDP')
    .distinct('governmentDebtToGDP')
    .then(data => data.filter(obj => obj[key] === value || obj[key] === Number(value)))
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});
