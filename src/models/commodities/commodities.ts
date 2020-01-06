import { db } from '../../services/connect-to-db';
import { throwSuccess, throwError } from '../../helpers/errors';

export const insertCommodities = (data): Promise<any> =>
  db.collection('commodities')
    .insertOne(data)
    .then(throwSuccess)
    .catch(throwError);

export const getAllCommodities = (): Promise<any> =>
  db.collection('commodities')
    .find()
    .toArray()
    .then((data: any) => data)
    .catch((err: any) => err);

export const getCommoditiesBySpehere = (query: string): Promise<any> =>
  db.collection('commodities')
    .distinct(query)
    .then((data: any) => data)
    .catch((err: any) => err);

export const getCommoditiesByDate = (day: string, month: string, year: string): Promise<any> =>
  db.collection('commodities')
    .find({ date: { day, month, year } })
    .toArray()
    .then((data: any) => data)
    .catch((err: any) => err);

export const getCommoditiesBySpehereByParam = (query: string, value: string, key: string): Promise<any> =>
  db.collection('commodities')
    .distinct(query)
    .then((data: any) => data.filter((item: any) => item[key] === value || item[key] === Number(value)))
    .then((data: any) => data)
    .catch((err: any) => err);
