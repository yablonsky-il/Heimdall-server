import { Request, Response } from 'express';
import * as R from 'ramda';

import {
  getAllCommodities as getAllCommoditiesModel,
  getCommoditiesBySpehere as getCommoditiesBySpehereModel,
  getCommoditiesByDate as getCommoditiesByDateModel,
  getCommoditiesBySpehereByParam as getCommoditiesBySpehereByParamModel,
} from '../../models/commodities/commodities';

export const getAllCommodities = (req: Request, res: Response): Promise<any> =>
  getAllCommoditiesModel()
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => res.status(500).send(err));

export const getCommoditiesByDate = (req: Request, res: Response): void => {
  const { date } = req.params;
  const [day, month, year] = date.split('-');

  getCommoditiesByDateModel(day, month, year)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => res.status(500).send(err));
};

export const getCommoditiesBySpehere = (req: Request, res: Response): void => {
  const { sphere } = req.params;
  const query = `commodities.${sphere}`;

  getCommoditiesBySpehereModel(query)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => res.status(500).send(err));
};

export const getCommoditiesBySpehereByParam = (req: Request, res: Response): void | Response => {
  const { sphere, param } = req.params;
  const query = `commodities.${sphere}`;
  const [key, value] = param.split('=');

  if (R.isNil(value)) return res.status(200).json([]);

  getCommoditiesBySpehereByParamModel(query, value, key)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => res.status(500).send(err));
};
