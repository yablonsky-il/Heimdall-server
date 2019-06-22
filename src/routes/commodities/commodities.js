import express from 'express';

import { db } from '../../connect-to-db';

export const router = express.Router();
const mainParam = 'commodities';

/* get all documents from collection */
router.get(`/${mainParam}`, (req, res) => {
  db.collection('commodities')
    .find()
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/* get data by :commoditie */
router.get(`/${mainParam}/sphere/:sphere`, (req, res) => {
  const { sphere } = req.params;
  const query = `commodities.${sphere}`;

  db.collection('commodities')
    .distinct(query)
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

  db.collection('commodities')
    .find({ date: { day, month, year } })
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/*
* get data by :country key from all documents -> by :param from objs of array
* param:   id   | commoditie          | value
* example: id=0 | commodities=Серебро | value=15.0288
*/
router.get(`/${mainParam}/sphere/:sphere/:param`, (req, res) => {
  const { sphere, param } = req.params;
  const query = `commodities.${sphere}`;
  const [key, value] = param.split('=');

  db.collection('commodities')
    .distinct(query)
    .then(data => data.filter(obj => obj[key] === value || obj[key] === Number(value)))
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});
