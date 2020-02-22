import crypto from 'crypto';
import * as R from 'ramda';

import { GetDate } from '../interfaces';

import { WEEK_DAYS } from '../constants';

export const checkDay = (): boolean => {
  const day: number = new Date().getDay();

  if (day !== WEEK_DAYS.Saturday && day !== WEEK_DAYS.Sunday) {
    return true;
  }

  return false;
};

const checkDateValue = (value: string): string =>
  value.length > 1
    ? value
    : `0${value}`;

export const getDate = (): GetDate => {
  const date: Date = new Date();

  const day: string = checkDateValue(date.getDate().toString());
  const month: string = checkDateValue(R.inc(date.getMonth()).toString());
  const year: string = date.getFullYear().toString();

  return { day, month, year };
};

export const getHash = (password: string): string => {
  const hmac = crypto.createHash('sha256');
  hmac.update(password);

  return hmac.digest('hex');
};
