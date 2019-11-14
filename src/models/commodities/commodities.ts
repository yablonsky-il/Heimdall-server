import { db } from '../../services/connect-to-db';
import { throwSuccess, throwError } from '../../helpers/errors';

export const insertCommodities = data => db.collection('commodities')
  .insertOne(data)
  .then(throwSuccess)
  .catch(throwError);
