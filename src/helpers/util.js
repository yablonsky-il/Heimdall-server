import * as R from 'ramda';
import { WEEK_DAYS } from '../constants';

export const checkDay = () => {
  const day = new Date().getDay();

  if (day !== WEEK_DAYS.Saturday && day !== WEEK_DAYS.Sunday) {
    return true;
  }

  return false;
};

const checkDateValue = value => value.length > 1 ? value : `0${value}`;

export const getDate = () => {
  const date = new Date();

  const day = checkDateValue(date.getDate().toString());
  const month = checkDateValue(R.inc(date.getMonth()).toString());
  const year = date.getFullYear().toString();

  return { day, month, year };
}
