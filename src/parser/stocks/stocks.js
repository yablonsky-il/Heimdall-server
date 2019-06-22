/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { parseStocks } from '../../helpers/parse/parse-stocks';
import { checkDay } from '../../helpers/util';
import { db } from '../../connect-to-db';

export const requestStocks = () => {
  request('https://ru.tradingeconomics.com/stocks')
    .then(document => parseStocks(cheerio.load(document)))
    .then((data) => {
      db.collection('stocks')
        .insertOne(data)
        .then(success => console.log(success, 'success!'))
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => console.log(err))
}

/* Make request at 23:00 every evening (besides Saturday and Sunday) */
export const job = new CronJob('0 23 * * *', () =>
  checkDay() ? requestStocks() : false
);
