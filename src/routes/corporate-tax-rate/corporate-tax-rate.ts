import express from 'express';

import {
  getAllCorporateTaxRate,
  getCorporateTaxRateByDate,
  getCorporateTaxRateByParam,
} from '../../controllers/corporate-tax-rate/corporate-tax-rate';
import { API_PARAM } from '../../constants';

export const router = express.Router();
const indicator = 'corporate-tax-rate';

/* get all documents from collection */
router.get(`/${API_PARAM}/${indicator}`, getAllCorporateTaxRate);

/*
* get document by :date
* example date: 10-06-2019
*/
router.get(`/${API_PARAM}/${indicator}/date/:date`, getCorporateTaxRateByDate);

/*
* get data from all documents by :param from objs of array
* param:   id   | country            | rate
* example: id=0 | country=Нидерланды | rate=25.00
*/
router.get(`/${API_PARAM}/${indicator}/:param`, getCorporateTaxRateByParam);
