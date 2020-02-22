import cheerio from 'cheerio';
import request, { RequestPromise } from 'request-promise';
import cron from 'cron';

import { parseCommodities } from '../../helpers/parse';
import { checkDay } from '../../helpers/util';
import { throwError } from '../../helpers/info';
import { PARSE_URL } from '../../constants';
import { insertCommodities } from '../../models/commodities/commodities';

const url = `${PARSE_URL}/commodities`;

const requestCommodities = (): Promise<RequestPromise> => request(url)
  .then(document => parseCommodities(cheerio.load(document)))
  .then(insertCommodities)
  .catch(throwError);

/* Make request at 23:00 every evening (besides Saturday and Sunday) */
export const job = new cron.CronJob('0 23 * * *', () =>
  checkDay() ? requestCommodities() : false);
