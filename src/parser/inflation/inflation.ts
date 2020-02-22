import cheerio from 'cheerio';
import request from 'request-promise';
import cron from 'cron';

import { db } from '../../services/connect-to-db';
import { parseAnyIndicator } from '../../helpers/parse';
import { getDate } from '../../helpers/util';
import { throwError } from '../../helpers/info';
import { PARSE_URL } from '../../constants';

const url = `${PARSE_URL}/country-list/inflation-rate`;

const requestInflations = () => request(url)
  .then(document => parseAnyIndicator(cheerio.load(document)))
  .then((data) => {
    db.collection('inflation')
      .insertOne({ date: getDate(), inflations: data, unit: '%' })
      .then(success => console.log(success, 'success!'))
      .catch(err => throwError(err));
  })
  .catch(err => throwError(err));

/* Make request at 23:00 on 5 day every month */
export const job = new cron.CronJob('0 23 5 * *', requestInflations);
