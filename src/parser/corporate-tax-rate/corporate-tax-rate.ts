import cheerio from 'cheerio';
import request, { RequestPromise } from 'request-promise';
import cron from 'cron';

import { parseAnyIndicator } from '../../helpers/parse';
import { insertCorporateTaxRate } from '../../models/corporate-tax-rate/corporate-tax-rate';
import { throwError } from '../../helpers/info';
import { PARSE_URL } from '../../constants';

const url = `${PARSE_URL}/country-list/corporate-tax-rate`;

const requestCorporateTaxRate = (): Promise<RequestPromise> => request(url)
  .then(document => parseAnyIndicator(cheerio.load(document)))
  .then(insertCorporateTaxRate)
  .catch(throwError);

/* Make request at 23:00 on day-of-month 25 in April */
export const job = new cron.CronJob('0 23 25 4 *', requestCorporateTaxRate);
