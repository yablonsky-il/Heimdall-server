import express from 'express';
import * as R from 'ramda';

import { db } from '../../services/connect-to-db';

export const router = express.Router();
const indicator = 'inflation';

/* get all documents from collection */
router.get(`/${indicator}`, (req, res) => {
  db.collection('inflation')
    .find()
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/*
* get document by :date
* example date: 10-06-2019
*/
router.get(`/${indicator}/date/:date`, (req, res) => {
  const { date } = req.params;
  const [day, month, year] = date.split('-');

  db.collection('inflation')
    .find({ date: { day, month, year } })
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/*
* get data from all documents by :param from objs of array
* param:   id   | country       | inflation
* example: id=0 | country=Конго | inflation=6.41
*/
router.get(`/${indicator}/:param`, (req, res) => {
  const { param } = req.params;
  const [key, value] = param.split('=');

  if (R.isNil(value)) return res.status(200).json(data);

  db.collection('inflation')
    .distinct('inflations')
    .then(data => data.filter(obj => obj[key] === value || obj[key] === Number(value)))
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});
