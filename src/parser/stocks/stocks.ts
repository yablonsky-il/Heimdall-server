/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { db } from '../../services/connect-to-db';
import { parseStocks } from '../../helpers/parse';
import { checkDay, throwError } from '../../helpers/util';
import { PARSE_URL } from '../../constants';

const url = `${PARSE_URL}/stocks`;

const requestStocks = () => request(url)
  .then(document => parseStocks(cheerio.load(document)))
  .then((data) => {
    db.collection('stocks')
      .insertOne(data)
      .then(success => console.log(success, 'success!'))
      .catch(err => throwError(err));
  })
  .catch(err => throwError(err));

/* Make request at 23:00 every evening (besides Saturday and Sunday) */
export const job = new CronJob('0 23 * * *', () =>
  checkDay() ? requestStocks() : false);
