import express from 'express';
import * as R from 'ramda';

import { db } from '../../services/connect-to-db';

export const router = express.Router();
const indicator = 'commodities';

/**
 * get all documents from collection
 * @return {array} -> [{},{},...]
 * @example -> [{ id: string, date: object, commodities: array }, ...]
 */
router.get(`/${indicator}`, (req, res) => {
  db.collection('commodities')
    .find()
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/**
 * get array data by :sphere from all documents
 * @param {:sphere} -> energy \\ agriculture \\ livestock \\ industry
 * @return {array} -> [{},{},...]
 * @example -> [{ id: number, commoditie: string, value: string }, ...]
 */
router.get(`/${indicator}/sphere/:sphere`, (req, res) => {
  const { sphere } = req.params;
  const query = `commodities.${sphere}`;

  db.collection('commodities')
    .distinct(query)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/**
 * get document by :date
 * @param {:date} -> '14-06-2019'
 * @return {object}
 * @example -> { id: string, date: object, commodities: array }
 */
router.get(`/${indicator}/date/:date`, (req, res) => {
  const { date } = req.params;
  const [day, month, year] = date.split('-');

  db.collection('commodities')
    .find({ date: { day, month, year } })
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

/**
 * get array data by :param (key) by :sphere from all documents
 * @param {:param} -> id || commoditie || value
 * @return {array} -> [{},{},...]
 * @example -> [{ id: number, commoditie: string, value: string }, ...]
 */
router.get(`/${indicator}/sphere/:sphere/:param`, (req, res) => {
  const { sphere, param } = req.params;
  const query = `commodities.${sphere}`;
  const [key, value] = param.split('=');

  if (R.isNil(value)) return res.status(200).json(data);

  db.collection('commodities')
    .distinct(query)
    .then(data => data.filter(obj => obj[key] === value || obj[key] === Number(value)))
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});
