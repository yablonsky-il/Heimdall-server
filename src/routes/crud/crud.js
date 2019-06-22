import express from 'express';

import { objData } from './test-data';
import { db } from '../../connect-to-db';

export const router = express.Router();

router.get('/create', (req, res) => {
  db.collection('products').insertMany(objData, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(result);
  });
});

router.get('/read', (req, res) => {
  db.collection('products').find().toArray((err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
});

router.get('/update', (req, res) => {
  db.collection('products').updateMany({ key: 1 }, { customer: 'Zakk Wilde' }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
});

router.get('/delete', (req, res) => {
  db.collection('products').deleteMany({}, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(result);
  });
});
