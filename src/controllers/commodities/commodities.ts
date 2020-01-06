/* eslint-disable consistent-return */
import * as R from 'ramda';

import {
  getAllCommodities as getAllCommoditiesModel,
  getCommoditiesBySpehere as getCommoditiesBySpehereModel,
  getCommoditiesByDate as getCommoditiesByDateModel,
  getCommoditiesBySpehereByParam as getCommoditiesBySpehereByParamModel,
} from '../../models/commodities/commodities';

export const getAllCommodities = (req, res): Promise<any> =>
  getAllCommoditiesModel()
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => res.status(500).send(err));

export const getCommoditiesBySpehere = (req, res): void => {
  const { sphere } = req.params;
  const query = `commodities.${sphere}`;

  getCommoditiesBySpehereModel(query)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => res.status(500).send(err));
};

export const getCommoditiesByDate = (req, res): void => {
  const { date } = req.params;
  const [day, month, year] = date.split('-');

  getCommoditiesByDateModel(day, month, year)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => res.status(500).send(err));
};

export const getCommoditiesBySpehereByParam = (req, res): void => {
  const { sphere, param } = req.params;
  const query = `commodities.${sphere}`;
  const [key, value] = param.split('=');

  if (R.isNil(value)) return res.status(200).json([]);

  getCommoditiesBySpehereByParamModel(query, value, key)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => res.status(500).send(err));
};
