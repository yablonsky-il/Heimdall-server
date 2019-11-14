/* eslint-disable no-console */
import cheerio from 'cheerio';
import request from 'request-promise';
import { CronJob } from 'cron';

import { db } from '../../services/connect-to-db';
import { parseCommodities } from '../../helpers/parse';
import { checkDay, throwError } from '../../helpers/util';
import { PARSE_URL } from '../../constants';

const url = `${PARSE_URL}/commodities`;

const requestCommodities = () => request(url)
  .then(document => parseCommodities(cheerio.load(document)))
  .then((data) => {
    db.collection('commodities')
      .insertOne(data)
      .then(success => console.log(success, 'success!'))
      .catch(err => throwError(err));
  })
  .catch(err => throwError(err));

/* Make request at 23:00 every evening (besides Saturday and Sunday) */
export const job = new CronJob('0 23 * * *', () =>
  checkDay() ? requestCommodities() : false);
