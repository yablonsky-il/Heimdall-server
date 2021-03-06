import cheerio from 'cheerio';
import request from 'request-promise';
import cron from 'cron';

import { db } from '../../services/connect-to-db';
import { parseCurrencies } from '../../helpers/parse';
import { checkDay } from '../../helpers/util';
import { throwError } from '../../helpers/info';
import { PARSE_URL } from '../../constants';

const url = `${PARSE_URL}/currencies`;

const requestCurrencies = () => request(url)
  .then(document => parseCurrencies(cheerio.load(document)))
  .then((data) => {
    db.collection('currency')
      .insertOne(data)
      .then(success => console.log(success, 'success!'))
      .catch(err => throwError(err));
  })
  .catch(err => throwError(err));

/* Make request at 23:00 every evening (besides Saturday and Sunday) */
export const job = new cron.CronJob('0 23 * * *', () =>
  checkDay() ? requestCurrencies() : false);
