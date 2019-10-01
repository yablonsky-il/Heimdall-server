import { parseTable } from './parse-helpers';
import { getDate } from '../util';

const keys = [
  'Europe',
  'USA',
  'Asia',
  'Australia',
  'Africa',
];

export const parseStocks = ($) => {
  const result = $('.panel').children('.table-responsive');
  const data = {};

  for (let i = 1; i < result.length; i += 1) {
    data[keys[i - 1]] = parseTable(
      result.eq(i).find('tbody').children(),
      'stock',
    );
  }

  return {
    date: getDate(),
    stocks: data,
  };
};
