/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { db } from '../../connect-to-db';
import { parseData } from '../../helpers/parse/parse-data';
import { getDate } from '../../helpers/util';

export const requestPersonalIncomeTaxRate = () => {
  request('https://ru.tradingeconomics.com/country-list/personal-income-tax-rate')
    .then(document => parseData(cheerio.load(document), 'rate'))
    .then((data) => {
      db.collection('personal_income_tax_rate')
        .insertOne({ date: getDate(), personalIncomeTaxRate: data, unit: '%' })
        .then(success => console.log(success, 'success!'))
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
}

/* Make request at 23:00 on day-of-month 25 in April */
export const job = new CronJob('0 23 25 4 *', () => requestPersonalIncomeTaxRate());
