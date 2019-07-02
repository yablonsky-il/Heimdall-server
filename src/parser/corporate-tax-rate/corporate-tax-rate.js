/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { db } from '../../services/connect-to-db';
import { parseAnyIndicator } from '../../helpers/parse/parse-any-indicator';
import { getDate, throwError } from '../../helpers/util';

const url = 'https://ru.tradingeconomics.com/country-list/corporate-tax-rate';

const requestCorporateTaxRate = () => request(url)
  .then(document => parseAnyIndicator(cheerio.load(document)))
  .then((data) => {
    db.collection('corporate_tax_rate')
      .insertOne({ date: getDate(), corporateTaxRate: data, unit: '%' })
      .then(success => console.log(success, 'success!'))
      .catch(err => throwError(err));
  })
  .catch(err => throwError(err));

/* Make request at 23:00 on day-of-month 25 in April */
export const job = new CronJob('0 23 25 4 *', () => requestCorporateTaxRate());
