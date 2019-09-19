import { parseTable } from './parse-helpers';
import { getDate } from '../util';

const keys = [
  'energy',
  'agriculture',
  'livestock',
  'industry',
  'index',
];

export const parseCommodities = ($) => {
  const result = $('.panel').children('.table-responsive');
  const data = {};

  for (let i = 1; i < result.length - 1; i += 1) {
    data[keys[i - 1]] = parseTable(
      result.eq(i).find('tbody').children(),
      'commoditie',
    );
  }

  return {
    date: getDate(),
    commodities: data,
  };
};
