import { Request, Response } from 'express';
import * as R from 'ramda';

import {
  getAllCorporateTaxRate as getAllCorporateTaxRateModel,
  getCorporateTaxRateByDate as getCorporateTaxRateByDateModel,
  getCorporateTaxRateByParam as getCorporateTaxRateByParamModel,
} from '../../models/corporate-tax-rate/corporate-tax-rate';

/* get all documents from collection */
export const getAllCorporateTaxRate = (req: Request, res: Response): Promise<any> =>
  getAllCorporateTaxRateModel()
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => res.status(500).send(err));

export const getCorporateTaxRateByDate = (req: Request, res: Response): void => {
  const { date } = req.params;
  const query = { 'date.year': R.last(date.split('-')) };

  getCorporateTaxRateByDateModel(query)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
};

/*
* get data from all documents by :param from objs of array
* param:   id   | country            | rate
* example: id=0 | country=Нидерланды | rate=25.00
*/
export const getCorporateTaxRateByParam = (req: Request, res: Response): void | Response => {
  const { param } = req.params;
  const [key, value] = param.split('=');

  if (R.isNil(value)) return res.status(200).json([]);

  getCorporateTaxRateByParamModel('corporateTaxRate', key, value)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
};
