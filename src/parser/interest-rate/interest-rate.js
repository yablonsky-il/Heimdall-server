/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { db } from '../../services/connect-to-db';
import { parseAnyIndicator } from '../../helpers/parse/parse-any-indicator';
import { getDate, throwError } from '../../helpers/util';

const url = 'https://ru.tradingeconomics.com/country-list/interest-rate';

const requestInterestRate = () => request(url)
  .then(document => parseAnyIndicator(cheerio.load(document)))
  .then((data) => {
    db.collection('interest_rate')
      .insertOne({ date: getDate(), interestRate: data, unit: '%' })
      .then(success => console.log(success, 'success!'))
      .catch(err => throwError(err));
  })
  .catch(err => throwError(err));

/* Make request at 23:00 on 5 day every month */
export const job = new CronJob('0 23 5 * *', () => requestInterestRate());
