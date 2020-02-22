import { db } from '../../services/connect-to-db';
import { throwSuccess, throwError } from '../../helpers/info';

export const insertCommodities = (data): Promise<any> =>
  db.collection('commodities')
    .insertOne(data)
    .then(throwSuccess)
    .catch(throwError);

export const getAllCommodities = (): Promise<any> =>
  db.collection('commodities')
    .find()
    .toArray()
    .then((data) => data)
    .catch(throwError);

export const getCommoditiesBySpehere = (query: string): Promise<any> =>
  db.collection('commodities')
    .distinct(query)
    .then((data) => data)
    .catch(throwError);

export const getCommoditiesByDate = (day: string, month: string, year: string): Promise<any> =>
  db.collection('commodities')
    .find({ date: { day, month, year } })
    .toArray()
    .then((data) => data)
    .catch(throwError);

export const getCommoditiesBySpehereByParam = (query: string, value: string, key: string): Promise<any> =>
  db.collection('commodities')
    .distinct(query)
    .then((data) => data.filter((item: any) => item[key] === value || item[key] === Number(value)))
    .then((data) => data)
    .catch(throwError);
