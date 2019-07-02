/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { db } from '../../services/connect-to-db';
import { parseCurrencies } from '../../helpers/parse/parse-currencies';
import { checkDay, throwError } from '../../helpers/util';

const url = 'https://ru.tradingeconomics.com/currencies';

const requestCurrencies = () => request(url)
  .then(document => parseCurrencies(cheerio.load(document)))
  .then((data) => {
    db.collection('currency')
      .insertOne(data)
      .then(success => console.log(success, 'success!'))
      .catch(err => throwError(err))
  })
  .catch(err => throwError(err))

/* Make request at 23:00 every evening (besides Saturday and Sunday) */
export const job = new CronJob('0 23 * * *', () =>
  checkDay() ? requestCurrencies() : false
);
