import { db } from '../../services/connect-to-db';
import { throwSuccess, throwError } from '../../helpers/info';
import { getDate } from '../../helpers/util';

export const insertCorporateTaxRate = (data): Promise<any> =>
  db.collection('corporate_tax_rate')
    .insertOne({ date: getDate(), corporateTaxRate: data, unit: '%' })
    .then(throwSuccess)
    .catch(throwError);

export const getAllCorporateTaxRate = (): Promise<any> =>
  db.collection('corporate_tax_rate')
    .find()
    .toArray()
    .then(data => data)
    .catch(throwError);

export const getCorporateTaxRateByDate = (query): Promise<any> =>
  db.collection('corporate_tax_rate')
    .find(query)
    .toArray()
    .then(data => data)
    .catch(throwError);

export const getCorporateTaxRateByParam = (query: string, key: string, value: string): Promise<any> =>
  db.collection('corporate_tax_rate')
    .distinct(query)
    .then(data => data.filter(obj => obj[key] === value || obj[key] === Number(value)))
    .then(data => data)
    .catch(throwError);
