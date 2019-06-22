/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { parseCommodities } from '../../helpers/parse/parse-commodities';
import { checkDay } from '../../helpers/util';
import { db } from '../../connect-to-db';

export const requestCommodities = () => {
  request('https://ru.tradingeconomics.com/commodities')
    .then(document => parseCommodities(cheerio.load(document)))
    .then((data) => {
      db.collection('commodities')
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
  checkDay() ? requestCommodities() : false
);
