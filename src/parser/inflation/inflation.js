/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { db } from '../../connect-to-db';
import { parseData } from '../../helpers/parse/parse-data';
import { getDate } from '../../helpers/util';

export const requestInflations = () => {
  request('https://ru.tradingeconomics.com/country-list/inflation-rate')
    .then(document => parseData(cheerio.load(document), 'inflation'))
    .then((data) => {
      db.collection('inflation')
        .insertOne({ date: getDate(), inflations: data, unit: '%' })
        .then(success => console.log(success, 'success!'))
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
}

/* Make request at 23:00 on 5 day every month */
export const job = new CronJob('0 23 5 * *', () => requestInflations());
