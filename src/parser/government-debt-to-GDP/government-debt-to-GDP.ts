import * as cheerio from 'cheerio';
import * as request from 'request-promise';
import * as cron from 'cron';

import { db } from '../../services/connect-to-db';
import { parseAnyIndicator } from '../../helpers/parse';
import { getDate } from '../../helpers/util';
import { throwError } from '../../helpers/errors';
import { PARSE_URL } from '../../constants';

const url = `${PARSE_URL}/country-list/government-debt-to-gdp`;

const requestGovernmentDebtToGDP = () => request(url)
  .then(document => parseAnyIndicator(cheerio.load(document)))
  .then((data) => {
    db.collection('government_debt_to_GDP')
      .insertOne({ date: getDate(), governmentDebtToGDP: data, unit: '%' })
      .then(success => console.log(success, 'success!'))
      .catch(err => throwError(err));
  })
  .catch(err => throwError(err));

/* Make request at 23:00 on day-of-month 25 in April */
export const job = new cron.CronJob('0 23 25 4 *', () => requestGovernmentDebtToGDP());
