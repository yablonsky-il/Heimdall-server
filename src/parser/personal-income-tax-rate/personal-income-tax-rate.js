/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { db } from '../../services/connect-to-db';
import { parseAnyIndicator } from '../../helpers/parse/parse-any-indicator';
import { getDate, throwError } from '../../helpers/util';
import { PARSE_URL } from '../../constants';

const url = `${PARSE_URL}/country-list/personal-income-tax-rate`;

const requestPersonalIncomeTaxRate = () => request(url)
  .then(document => parseAnyIndicator(cheerio.load(document)))
  .then((data) => {
    db.collection('personal_income_tax_rate')
      .insertOne({ date: getDate(), personalIncomeTaxRate: data, unit: '%' })
      .then(success => console.log(success, 'success!'))
      .catch(err => throwError(err));
  })
  .catch(err => throwError(err));

/* Make request at 23:00 on day-of-month 25 in April */
export const job = new CronJob('0 23 25 4 *', () => requestPersonalIncomeTaxRate());
