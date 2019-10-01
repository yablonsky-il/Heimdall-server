import { parseTable } from './parse-helpers';
import { getDate } from '../util';

const NEEDED_AMOUNT_CURRENCIES = 6;

const keys = [
  'topCurrencies',
  'crypto',
  'EURCross',
  'GBPCross',
  'AUDCross',
  'JPYCross',
];

export const parseCurrencies = ($) => {
  const result = $('.panel').children('.table-responsive');
  const data = {};

  for (let i = 0; i < NEEDED_AMOUNT_CURRENCIES; i += 1) {
    data[keys[i]] = parseTable(
      result.eq(i).find('tbody').children(),
      'currency',
    );
  }

  return {
    date: getDate(),
    currencies: data,
  };
};
